import React from 'react';
import Sidebar from '../adminsidebar/AdminSideBar';
import DashboardOverview from '../admindashboardoverview/AdminDashboardOverview';
import UserList from '../adminuserlist/AdminUserList';
import VerifyResident from '../adminverifyresident/AdminVerifyResident';

const AdminDashboard = () => {
    return (
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.content}>
                <DashboardOverview />
                <UserList />
                <VerifyResident />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        backgroundColor: '#fffffe',
        fontFamily: 'Arial, sans-serif',
        height: '100vh',
    },
    content: {
        padding: '20px',
        flex: '1',
        overflowY: 'auto',
    },
};

export default AdminDashboard;