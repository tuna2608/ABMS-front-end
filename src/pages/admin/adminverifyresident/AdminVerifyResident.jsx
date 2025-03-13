import React from 'react';

const VerifyResident = () => {
    return (
        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Verify New Resident</h2>
            <form style={styles.form}>
                <input type="text" placeholder="Full Name" style={styles.input} required />
                <input type="email" placeholder="Email" style={styles.input} required />
                <input type="text" placeholder="Phone Number" style={styles.input} required />
                <input type="datetime-local" placeholder="Contract Start Date" style={styles.input} required />
                <input type="datetime-local" placeholder="Contract End Date" style={styles.input} required />
                <input type="file" style={styles.fileInput} required />
                <button type="submit" style={styles.button}>Verify User</button>
            </form>
        </section>
    );
};

const styles = {
    section: {
        marginTop: '20px',
    },
    sectionTitle: {
        color: '#094067',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
    },
    input: {
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #5f6c7b',
        borderRadius: '5px',
    },
    button: {
        backgroundColor: '#3da9fc',
        color: '#fffffe',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
};

export default VerifyResident;