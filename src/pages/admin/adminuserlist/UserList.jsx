import React, { useEffect, useState } from 'react'
import "./userlist.scss"
import AdminNavBar from '../../../components/admin/adminNavbar/AdminNavBar'
import AdminLeftBar from '../../../components/admin/adminLeftBar/AdminLeftBar'
import { DataGrid } from '@mui/x-data-grid';
// import { userRows } from "../../../data/fakeUserList"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../../redux/apiCalls';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Bounce, toast } from 'react-toastify';

function UserList() {

    const dispatch = useDispatch();
    const location = useLocation();
    const [notification, setNotification] = useState(location.state)

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch])

    const users = useSelector(state => state.users.users) || []


    // Delete user
    const handDelete = (id) => {
        deleteUser(id, dispatch)
        setNotification("Deleted");
    }

    // Toast
    const createdSuccessfully = () => toast.success(`Created Product Successfully!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    const updatedSuccessfully = () => toast.success(`Updated Product Successfully!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    const deletedSuccessfully = () => toast.success(`Deleted Product Successfully!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
    // End toast

    useEffect(() => {
        if (notification === "Created") {
            createdSuccessfully()
            setNotification("")
        }
        if (notification === "Updated") {
            updatedSuccessfully()
            setNotification("")
        }
        if (notification === "Deleted") {
            deletedSuccessfully()
            setNotification("")
        }
    }, [notification])



    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'user', headerName: 'Username', width: 200, renderCell: (params) => {
                return <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                    <img
                        style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                        src={params.row.img || "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"}
                        alt="" />
                    <p>{params.row.username}</p>
                </div>
            }
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'string',
            width: 200,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => {
                return (
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                        <NavLink to={"/user/" + params.row._id}>
                            <button
                                style={{
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "5px 10px",
                                    background: "#3bb077",
                                    color: "#fff",
                                    cursor: "pointer"
                                }}>
                                Edit
                            </button>
                        </NavLink>
                        <DeleteOutlineIcon
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => handDelete(params.row._id)} />
                    </div>
                )
            }
        },
    ];

    return (
        <div className='user-list-container'>
            <AdminNavBar />
            <div className='user-list-bottom'>
                <AdminLeftBar />
                <div className='bottom-right'>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="user-title-container">
                        <h1>Quản Lí Người Dùng</h1>
                        <NavLink to="/newUser">
                            <button style={{
                                width: "100px",
                                color: "#fff",
                                borderRadius: "5px",
                                backgroundColor: "teal",
                                cursor: "pointer",
                                padding: "10px",
                                fontSize: "16px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                border: "none"
                            }} className="user-add-btn"><AddCircleOutlineIcon /><span>Thêm</span></button>
                        </NavLink>
                    </div>
                    <div style={{ height: '70vh', width: '100%' }}>
                        <DataGrid
                            disableRowSelectionOnClick
                            rows={users}
                            columns={columns}
                            getRowId={(row) => row._id}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserList