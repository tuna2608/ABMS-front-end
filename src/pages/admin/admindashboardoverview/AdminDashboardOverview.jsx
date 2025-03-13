import React from 'react';

const DashboardOverview = () => {
    return (
        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Dashboard Overview</h2>
            <div style={styles.buttonContainer}>
                <button style={styles.button}>Create Account</button>
                <button style={styles.button}>View User List</button>
                <button style={styles.button}>Verify New Resident</button>
            </div>
        </section>
    );
};

const styles = {
    section: {
        marginBottom: '20px',
    },
    sectionTitle: {
        color: '#094067',
        marginBottom: '10px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    button: {
        backgroundColor: '#3da9fc',
        color: '#fffffe',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        margin: '5px',
        borderRadius: '5px',
        flex: '1',
        marginRight: '10px',
    },
};

export default DashboardOverview;