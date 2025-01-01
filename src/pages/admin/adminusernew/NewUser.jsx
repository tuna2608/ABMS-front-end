import React, { useState } from 'react'
import "./newUser.scss"
import AdminNavBar from '../../../components/admin/adminNavbar/AdminNavBar'
import AdminLeftBar from '../../../components/admin/adminLeftBar/AdminLeftBar'
import { useDispatch } from 'react-redux'
import { addUser } from '../../../redux/apiCalls'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function NewUser() {

    const [inputs, setInputs] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    // Validation
    const isValidEmail = (value) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const isValidPassword = (value) => {
        // Password validation: at least 6 characters
        return value.length >= 6;
    };
    // End Validation

    const handleCreateUser = (e) => {
        e.preventDefault();
        e.preventDefault();
        // Validation checks
        if (!isValidEmail(inputs.email)) {
            toast.error("Please enter a valid email address.", {
            });
            return;
        }

        if (!isValidPassword(inputs.password)) {
            toast.error("Password must be at least 6 characters long.", {
            });
            return;
        }

        if (inputs.password !== inputs.confirmPassword) {
            toast.error("Password are not matched.", {
            });
            return;
        }
        addUser(dispatch, inputs)
        navigate("/userList", { state: "Created" })
    }

    return (
        <div className='new-user-container'>
            <AdminNavBar />
            <div className='new-user-bottom'>
                <AdminLeftBar />
                <div className='bottom-right'>
                    <h1 className="new-user-title">New User</h1>
                    <form className="new-user-form">
                        <div className="new-user-left">
                            <div className="new-user-item">
                                <label>Username</label>
                                <input type="text" name="username" placeholder='dinhhieu2k2' onChange={handleInputChange} />
                            </div>
                            <div className="new-user-item">
                                <label>Email</label>
                                <input type="text" name="email" placeholder='user@gmail.com' onChange={handleInputChange} />
                            </div>
                            <div className="new-user-item">
                                <label>Phone</label>
                                <input type="text" name="phone" placeholder='+84 702 662 252' onChange={handleInputChange} />
                            </div>
                            <div className="new-user-item">
                                <label>Gender</label>
                                <div className="new-user-gender">
                                    <input type="radio" name='gender' id="male" value="male" onChange={handleInputChange} />
                                    <label for="male">Male</label>
                                    <input type="radio" name='gender' id="female" value="female" onChange={handleInputChange} />
                                    <label for="female">Female</label>
                                    <input type="radio" name='gender' id="other" value="other" onChange={handleInputChange} />
                                    <label for="other">Other</label>
                                </div>
                            </div>
                            <button className="create-btn" onClick={handleCreateUser}>Create</button>
                        </div>
                        <div className="new-user-right">
                            <div className="new-user-item">
                                <label>Birthday</label>
                                <input type="date" name='dOB' onChange={handleInputChange} />
                            </div>
                            <div className="new-user-item">
                                <label>Password</label>
                                <input type="password" name='password' placeholder='********' onChange={handleInputChange} />
                            </div>
                            <div className="new-user-item">
                                <label>Address</label>
                                <input type="text" name='address' placeholder='Dien Bien Phu | Da Nang' onChange={handleInputChange} />
                            </div>
                            <div className="new-user-item">
                                <label>Confirm Password</label>
                                <input type="password" name='confirmPassword' placeholder='********' onChange={handleInputChange} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewUser