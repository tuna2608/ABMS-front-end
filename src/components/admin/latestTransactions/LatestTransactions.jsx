import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./latestTransactions.scss";
// import { userRequest } from "../../../utilities/requestMethod";
import { format } from "timeago.js";
import { getAllOrders, updateOrderStatus } from "../../../redux/apiCalls";
import { formatCurrency } from "../../../utilities/formatCurrency";
function LatestTransactions() {
  const dispatch = useDispatch();
  getAllOrders(dispatch);
  const ordersState = useSelector(state => state.order.order)
  const [orders, setOrders] = useState(ordersState);
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
      prevOrders?.map((order) =>
        order._id === orderId ? { ...order, status: type } : order
      )
    );
  };
  const Button = ({ orderId, type }) => {
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


  return (
    <div className="latest-transactions-container">
      <h3>Đơn Hàng Gần Đây</h3>
      <table>
        <tr className="rows">
          <th>Mã Khách Hàng</th>
          <th>Ngày Đặt Hàng</th>
          <th>Giá</th>
          <th>Trạng Thái</th>
        </tr>
        {(orders || []).map((order) => (
          <tr key={order._id}>
            <td className="first-td">
              <h5 style={{ paddingTop: "6px" }}>#{order.userId}</h5>
            </td>
            <td>{format(order.createdAt)}</td>
            <td>{formatCurrency(order.amount)}</td>
            <td>
              {order.status === "Pending" ? (
                <>
                  <Button orderId={order._id} type={"Accept"} />
                  <Button orderId={order._id} type={"Cancel"} />
                </>
              ) : (
                <Button orderId={order._id} type={order.status} />
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default LatestTransactions;
