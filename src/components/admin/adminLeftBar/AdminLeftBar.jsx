import "./adminLeftBar.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import FlagCircleOutlinedIcon from '@mui/icons-material/FlagCircleOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { NavLink } from "react-router-dom";
const AdminLeftBar = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <span style={{ fontWeight: "700", color: "#ccc", fontSize: "18px" }}>Menu</span>
          </div>
          <NavLink className="links-style" to="/home">
            <div className="item">
              <HomeOutlinedIcon />
              <span>Trang Chủ</span>
            </div>
          </NavLink>
          <div className="item">
            <AutoGraphOutlinedIcon />
            <span>Phân Tich</span>
          </div>
          <div className="item">
            <MonetizationOnOutlinedIcon />
            <span>Bán Hàng</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <div className="user">
            <span style={{ fontWeight: "700", color: "#ccc", fontSize: "18px" }}>Quản Lí</span>
          </div>
          <NavLink className="links-style" to="/userList">
            <div className="item">
              <PeopleAltOutlinedIcon />
              <span>Người Dùng</span>
            </div>
          </NavLink>
          <NavLink className="links-style" to="/adminProductList">
            <div className="item">
              <Inventory2OutlinedIcon />
              <span>Sản Phẩm</span>
            </div>
          </NavLink>
          <NavLink className="links-style" to="/admin-order-list">
            <div className="item">
              <PeopleAltOutlinedIcon />
              <span>Đơn Hàng</span>
            </div>
          </NavLink>
          <div className="item">
            <ReceiptLongOutlinedIcon />
            <span>Giao Dịch</span>
          </div>
          <div className="item">
            <FlagCircleOutlinedIcon />
            <span>Báo Cáo</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <div className="user">
            <span style={{ fontWeight: "700", color: "#ccc", fontSize: "18px" }}>Notifications</span>
          </div>        <div className="item">
            <MailOutlineOutlinedIcon />
            <span>Mail</span>
          </div>
          <div className="item">
            <AddCommentOutlinedIcon />
            <span>Phản Hồi</span>
          </div>
          <div className="item">
            <MessageOutlinedIcon />
            <span>Tin Nhắn</span>
          </div>
        </div>
        <hr />
      </div>
    </div >
  )
}

export default AdminLeftBar