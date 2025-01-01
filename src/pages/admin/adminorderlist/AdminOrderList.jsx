import React, { useEffect, useState } from 'react'
import "./orderlist.scss"
import AdminNavBar from '../../../components/admin/adminNavbar/AdminNavBar'
import AdminLeftBar from '../../../components/admin/adminLeftBar/AdminLeftBar'
import { DataGrid } from '@mui/x-data-grid';
// import { userRows } from "../../../data/fakeUserList"
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllOrders, getUsers, updateOrderStatus } from '../../../redux/apiCalls';
import { Bounce, toast } from 'react-toastify';
import { formatCurrency } from '../../../utilities/formatCurrency';

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function AdminOrderList() {
    const dispatch = useDispatch();
    useEffect(() => {
        getAllOrders(dispatch);
    }, [dispatch])
    const ordersState = useSelector((state) => state.order.order);
    const [orders, setOrders] = useState(ordersState);
    console.log(orders);
    const [isPopup, setIsPopup] = useState(false);
    const [detailProducts, setDetailProducts] = useState([]);
    const handleDisplayProducts = (order) => {
        const products = order.products;
        console.log(products);
        setDetailProducts(products);
        setIsPopup(!isPopup);
    };
    const handleClose = () => {
        setIsPopup(false);
    };

    const handleUpdateOrderStatus = (orderId, type) => {
        switch (type) {
            case "Accept":
                type = "Delivering";
                break;
            case "Cancel":
                type = "Declined";
                break;
            case "Delivering":
                type = "Delivered";
                break;
            default:
                return "Pending"
        }
        updateOrderStatus(dispatch, orderId, type);
        setOrders((prevOrders) =>
            (prevOrders || []).map((order) =>
                order._id === orderId ? { ...order, status: type } : order
            )
        );
    };

    const CustomizedButton = ({ orderId, type }) => {
        return (
            <button
                onClick={() => handleUpdateOrderStatus(orderId, type)}
                style={{ cursor: "pointer", marginRight: "3px" }}
                className={"status " + type}
            >
                {type}
            </button>
        );
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 60 },
        {
            field: "products",
            headerName: "Sản phẩm",
            width: 120,
            renderCell: (params) => {
                return (
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <button
                            onClick={() => handleDisplayProducts(params.row)}
                            style={{
                                border: "none",
                                borderRadius: "10px",
                                padding: "5px 10px",
                                background: "#3bb077",
                                color: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            Xem chi tiết
                        </button>
                    </div>
                );
            },
        },
        {
            field: "amount",
            headerName: "Giá",
            width: 120,
            renderCell: (params) => {
                return <p>{formatCurrency(params.row.amount)}</p>;
            },
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            width: 160,
        },
        {
            field: "phone",
            headerName: "Số điện thoại",
            width: 160,
        },
        {
            field: "createdAt",
            headerName: "Ngày đặt hàng",
            width: 160,
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 160,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.status === "Pending" ? (
                            <>
                                <CustomizedButton orderId={params.row._id} type={"Accept"} />
                                <CustomizedButton orderId={params.row._id} type={"Cancel"} />
                            </>
                        ) : (
                            <CustomizedButton orderId={params.row._id} type={params.row.status} />
                        )}
                    </div>
                )
            }
        },
    ];

    return (
        <div className='order-list-container'>
            <AdminNavBar />
            <div className='order-list-bottom'>
                <AdminLeftBar />
                <div className='bottom-right'>
                    <div className="orders-container">
                        <h1 className="orders-title">Theo Dõi Đơn Hàng</h1>
                        <div style={{ height: "100vh", width: "100%" }}>
                            <DataGrid
                                disableRowSelectionOnClick
                                rows={orders}
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
                        {isPopup && (
                            <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={isPopup}
                            >
                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                    Sản Phẩm
                                </DialogTitle>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={{
                                        position: "absolute",
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <DialogContent dividers>
                                    {detailProducts?.map((p) => (
                                        <div key={p.productId._id} className="detail-product-card">
                                            <img
                                                className="detail-product-card-img"
                                                src={p.productId.img}
                                                alt={p.productId.img}
                                            />
                                            <p className="detail-product-card-title">
                                                {p.productId.title}
                                            </p>
                                            <p className="detail-product-card-price">
                                                {formatCurrency(p.productId.price)}
                                            </p>
                                        </div>
                                    ))}
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="danger" autoFocus onClick={handleClose}>
                                        Đóng
                                    </Button>
                                </DialogActions>
                            </BootstrapDialog>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminOrderList