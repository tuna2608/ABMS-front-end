import React, { useEffect, useState } from 'react'
import "./adminProductList.scss"
import AdminNavBar from '../../../components/admin/adminNavbar/AdminNavBar'
import AdminLeftBar from '../../../components/admin/adminLeftBar/AdminLeftBar'
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../../redux/apiCalls';
import { Bounce, toast } from 'react-toastify';


function AdminProductList() {

    const location = useLocation();
    const [notification, setNotification] = useState(location.state)

    const dispatch = useDispatch()

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

    const handleDelete = (id) => {
        deleteProduct(id, dispatch)
        setNotification("Deleted")
    }

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch])

    const products = useSelector(state => state.product.products) || []

    const validProducts = products.filter(product => product && product._id);


    const columns = [
        { field: '_id', headerName: 'ID', width: 210 },
        {
            field: 'product', headerName: 'Product', width: 200, renderCell: (params) => {
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
                        src={params.row.img}
                        alt="" />
                    <p>{params.row.title}</p>
                </div>
            }
        },
        {
            field: 'inStock',
            headerName: 'InStock',
            width: 200,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 160,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 160,
            renderCell: (params) => {
                return (
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                        <NavLink to={"/adminProduct/" + params.row._id}>
                            <button
                                style={{
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "5px 10px",
                                    background: "#3bb077",
                                    color: "#fff",
                                    cursor: "pointer"
                                }}>
                                Chỉnh sửa
                            </button>
                        </NavLink>
                        <DeleteOutlineIcon
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => handleDelete(params.row._id)} />
                    </div>
                )
            }
        },
    ];

    return (
        <div className='product-list-container'>
            <AdminNavBar />
            <div className='product-list-bottom'>
                <AdminLeftBar />
                <div className='bottom-right'>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="user-title-container">
                        <h1>Quản Lí Sản Phẩm</h1>
                        <NavLink to="/newProduct">
                            <button style={{
                                width: "80px",
                                color: "#fff",
                                borderRadius: "5px",
                                backgroundColor: "teal",
                                cursor: "pointer",
                                padding: "10px",
                                fontSize: "16px",
                                border: "none"
                            }} className="user-add-btn">Thêm</button>
                        </NavLink>
                    </div>
                    <div style={{ height: '70vh', width: '100%' }}>
                        <DataGrid
                            disableRowSelectionOnClick
                            rows={validProducts}
                            columns={columns}
                            getRowId={row => row._id}
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

export default AdminProductList