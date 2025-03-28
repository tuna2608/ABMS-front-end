import React, { useState, useEffect, useMemo } from 'react';
import { Card, Form, Input, Select, Button, Table, Space, Modal, Row, Col, message } from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  UserOutlined,
  CheckOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getResidentList, verifyAndAddUser } from '../../redux/apiCalls';
import moment from 'moment';

const AccountManagement = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('accountList');
  const [accountData, setAccountData] = useState([]);
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAccountId, setLoadingAccountId] = useState(null);
  
  // Lấy dữ liệu từ Redux store
  const users = useSelector((state) => state.users.users);
  const isFetching = useSelector((state) => state.users.isFetching);

  // Load dữ liệu khi component được mount
  useEffect(() => {
    console.log("Component mounted, fetching resident list");
    getResidentList(dispatch);
  }, [dispatch]);

  // Xử lý dữ liệu người dùng
  const processUserData = useMemo(() => {
    console.log("Processing user data:", users);
    if (!users || !Array.isArray(users) || users.length === 0) return [];

    const processedKeys = new Set();
    
    // Lọc và xử lý các tài khoản chưa được xác minh
    return users
      .filter(user => user.verified === false)
      .reduce((acc, user, index) => {
        // Tạo key duy nhất cho mỗi người dùng
        const baseKey = user.verificationFormId || 
                        user.userId || 
                        `${user.email}_${user.phoneNumber}`;
        
        const uniqueKey = `${baseKey}_${index}`;

        // Tránh trùng lặp
        if (processedKeys.has(uniqueKey)) return acc;
        processedKeys.add(uniqueKey);

        // Định dạng dữ liệu người dùng
        const processedUser = {
          key: uniqueKey,
          accountId: user.verificationFormId || user.userId || `${index + 1}`,
          username: user.userName || user.username,
          email: user.email,
          fullName: user.verificationFormName || user.fullName,
          phone: user.phoneNumber || user.phone,
          apartmentName: user.apartmentName,
          contractStartDate: user.contractStartDate ? moment(user.contractStartDate) : null,
          contractEndDate: user.contractEndDate ? moment(user.contractEndDate) : null,
          verificationType: user.verificationFormType || 2,
          role: user.userRole || 'Rentor'
        };

        // Log chi tiết để debug
        console.log(`Processed user ${uniqueKey}:`, processedUser);

        acc.push(processedUser);
        return acc;
      }, []);
  }, [users]);

  // Cập nhật state khi dữ liệu thay đổi
  useEffect(() => {
    console.log("User data changed, updating pending accounts:", processUserData);
    if (processUserData.length > 0) {
      setPendingAccounts(processUserData);
    } else {
      setPendingAccounts([]);
    }
  }, [processUserData]);

  // Định nghĩa cột cho bảng
  const reviewColumns = [
    {
      title: 'Mã Tài Khoản',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: 'Tên Người Dùng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Tên Căn Hộ',
      dataIndex: 'apartmentName',
      key: 'apartmentName',
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<CheckOutlined />} 
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' }}
            onClick={() => handleApproveAccount(record.key)}
            loading={loading && record.key === loadingAccountId}
          >
            Duyệt
          </Button>
          <Button 
            icon={<CloseCircleOutlined />} 
            danger
            onClick={() => handleDeclineAccount(record.key)}
          >
            Từ Chối
          </Button>
        </Space>
      )
    }
  ];

  // Hàm xử lý duyệt tài khoản
  const handleApproveAccount = async (key) => {
    try {
      setLoading(true);
      setLoadingAccountId(key);
      
      // Tìm thông tin tài khoản cần duyệt
      const accountToApprove = pendingAccounts.find(account => account.key === key);
      
      if (!accountToApprove) {
        message.error('Không tìm thấy thông tin tài khoản');
        return;
      }

      // Log thông tin để debug
      console.log("Account to approve:", accountToApprove);
      
      // Chuẩn bị dữ liệu để gửi API
      const verifyUserData = {
        verificationFormId: accountToApprove.accountId, 
        username: accountToApprove.username, 
        apartmentName: accountToApprove.apartmentName || '', 
        verificationFormName: accountToApprove.fullName, 
        verificationFormType: accountToApprove.verificationType || 2, 
        email: accountToApprove.email,
        phoneNumber: accountToApprove.phone,
        userRole: accountToApprove.role || 'Rentor', 
        contractStartDate: accountToApprove.contractStartDate?.toISOString() || null,
        contractEndDate: accountToApprove.contractEndDate?.toISOString() || null
      };
      
      // Gọi API để duyệt tài khoản
      const response = await verifyAndAddUser(dispatch, verifyUserData);
      
      console.log("API Response:", response);
      
      // Xử lý kết quả từ API
      if (response.success || 
          (response.status >= 200 && response.status < 300) ||
          (response.data && response.data.status >= 200 && response.data.status < 300)) {
        
        // Cập nhật UI ngay lập tức
        setPendingAccounts(prevData => prevData.filter(account => account.key !== key));
        
        message.success('Tài khoản đã được duyệt thành công');
        
        // Tải lại danh sách sau khi duyệt thành công
        await getResidentList(dispatch);
      } else {
        // Xử lý lỗi
        const errorMsg = response.message || 
                         (response.data && response.data.message) || 
                         'Có lỗi xảy ra khi duyệt tài khoản';
        
        message.error(errorMsg);
      }
    } catch (error) {
      console.error("Error in handleApproveAccount:", error);
      message.error('Có lỗi xảy ra khi duyệt tài khoản');
    } finally {
      setLoading(false);
      setLoadingAccountId(null);
    }
  };

  // Hàm xử lý từ chối tài khoản
  const handleDeclineAccount = (key) => {
    Modal.confirm({
      title: 'Xác nhận từ chối tài khoản',
      content: 'Bạn có chắc chắn muốn từ chối tài khoản này không?',
      okText: 'Từ chối',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setPendingAccounts(prevData => prevData.filter(account => account.key !== key));
        message.success('Đã từ chối tài khoản thành công');
      },
    });
  };

  return (
    <Card 
      tabList={[
        {
          key: 'accountReview',
          tab: (
            <span>
              <CheckOutlined />
              Duyệt Tài Khoản
            </span>
          )
        }
      ]}
      activeTabKey={activeTab}
      onTabChange={(key) => setActiveTab(key)}
    >
      {pendingAccounts.length === 0 && !isFetching ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Không có tài khoản nào cần duyệt
        </div>
      ) : (
        <Table 
          columns={reviewColumns} 
          dataSource={pendingAccounts}
          loading={isFetching}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: 'Không có tài khoản nào cần duyệt' }}
        />
      )}
    </Card>
  );
};

export default AccountManagement;