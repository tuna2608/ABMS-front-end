import React from 'react';

const Sidebar = () => {
    return (
        <div style={styles.sidebar}>
            <h2 style={styles.sidebarTitle}>Admin Menu</h2>
            <ul style={styles.menuList}>
                <li style={styles.menuItem}>Dashboard Overview</li>
                <li style={styles.menuItem}>Create Account</li>
                <li style={styles.menuItem}>View User List</li>
                <li style={styles.menuItem}>Verify New Resident</li>
            </ul>
        </div>
    );
};

const styles = {
    sidebar: {
        backgroundColor: '#3da9fc',
        color: '#fffffe',
        padding: '20px',
        width: '200px',
        height: '100vh',
    },
    sidebarTitle: {
        margin: '0 0 20px 0',
    },
    menuList: {
        listStyleType: 'none',
        padding: '0',
    },
    menuItem: {
        margin: '10px 0',
        cursor: 'pointer',
    },
};

export default Sidebar;