import React, { useState } from 'react'
import "./detailuser.scss"
import AdminNavBar from '../../../components/admin/adminNavbar/AdminNavBar'
import AdminLeftBar from '../../../components/admin/adminLeftBar/AdminLeftBar'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import PublishIcon from '@mui/icons-material/Publish';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../utilities/firebase";

import { updateUser } from '../../../redux/apiCalls';

function DetailUser() {

    const location = useLocation();
    const userID = location.pathname.split("/")[2];

    const user = useSelector((state) => state.users.users.find((user) => user._id === userID));

    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        // To make name of image file unique
        const fileName = new Date().getTime() + file.name
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName);

        // Firebase copy
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const upDatedUser = { ...inputs, img: downloadURL };
                    updateUser(user._id, upDatedUser, dispatch)
                    navigate("/userList", { state: "Updated" })
                });
            }
        );
    }

    return (
        <div className='detail-user-container'>
            <AdminNavBar />
            <div className='detail-user-bottom'>
                <AdminLeftBar />
                <div className='bottom-right'>
                    <div className="user-title-container">
                        <h1 className='user-title'>Edit User</h1>
                        <NavLink to="/newUser">
                            <button className="user-add-btn">Create</button>
                        </NavLink>
                    </div>
                    <div className="user-container">
                        <div className="user-show">
                            <div className="user-show-top">
                                <img src={user.img || "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"} alt="" className="user-show-img" />
                                <div className="user-show-title">
                                    <span className="user-show-username">{user.username}</span>
                                    <span className="user-show-usertitle">{user.title || "Undefined job"}</span>
                                </div>
                            </div>
                            <div className="user-show-bottom">
                                <span className="account-details-title">Account Details</span>
                                <div className="account-details">
                                    <span className="detail"><PersonOutlineIcon />{user.username}</span>
                                    <span className="detail"><DateRangeIcon />{user.dOB || "mm/dd/yyyy"}</span>
                                </div>
                                <span className="account-details-title">Contact details</span>
                                <div className="account-details">
                                    <span className="detail"><PhoneIcon />{user.phone || "Undefined Phone number"}</span>
                                    <span className="detail"><EmailIcon />{user.email}</span>
                                    <span className="detail"><BusinessIcon />{user.address || "Undefined Address"}</span>
                                </div>
                            </div>

                        </div>
                        <div className="user-update">
                            <div className="user-update-title">Edit</div>
                            <form className="user-update-form">
                                <div className="user-update-left">
                                    <div className="user-update-item">
                                        <label>Username</label>
                                        <input
                                            name="username"
                                            type="text"
                                            placeholder={user.username}
                                            className='user-update-input'
                                            onChange={handleInputChange}
                                        />
                                        <div className="user-update-item">
                                            <label>Birthday</label>
                                            <input
                                                name="dOB"
                                                type="date"
                                                placeholder={user.birthday}
                                                className='user-update-input'
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="user-update-item">
                                        <label>Phone number</label>
                                        <input
                                            name="phone"
                                            type="text"
                                            placeholder={user.phone}
                                            className='user-update-input'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="user-update-item">
                                        <label>Job Title</label>
                                        <input
                                            name="title"
                                            type="text"
                                            placeholder={user.title}
                                            className='user-update-input'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="user-update-item">
                                        <label>Email</label>
                                        <input
                                            name="email"
                                            type="text"
                                            placeholder={user.email}
                                            className='user-update-input'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="user-update-item">
                                        <label>Address</label>
                                        <input
                                            name="address"
                                            type="text"
                                            placeholder={user.address}
                                            className='user-update-input'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="user-update-right">
                                    <div className="user-update-upload">
                                        <img src={user.img || "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"} className="user-update-img" alt="" />
                                        <label htmlFor="file">
                                            <PublishIcon style={{ cursor: "pointer" }} />
                                        </label>
                                        <input
                                            onChange={e => setFile(e.target.files[0])}
                                            type="file"
                                            id="file"
                                            style={{ display: "none" }} />
                                    </div>
                                    <button onClick={handleUpdateUser} className="user-update-btn">Update</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailUser