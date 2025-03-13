import React from 'react';

const UserList = () => {
    return (
        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>User List</h2>
            <div style={styles.searchContainer}>
                <input 
                    type="text" 
                    placeholder="Search by username" 
                    style={styles.input} 
                />
                <button style={styles.button}>Search</button>
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
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        padding: '10px',
        marginRight: '10px',
        border: '1px solid #5f6c7b',
        borderRadius: '5px',
        flex: '1',
    },
    button: {
        backgroundColor: '#3da9fc',
        color: '#fffffe',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        margin: '5px',
        borderRadius: '5px',
    },
};

export default UserList;