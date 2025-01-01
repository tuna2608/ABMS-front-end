import "./adminNavBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import CastIcon from "@mui/icons-material/Cast";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import KeyIcon from '@mui/icons-material/Key';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutDispatch } from "../../../redux/apiCalls";
const AdminNavBar = () => {
  const user = useSelector(state => state.user.currentUser);
  const [isPopuped, setIsPopuped] = useState(false);
  const dispatch = useDispatch()
  const popup = () => {
    setIsPopuped(!isPopuped);
  }
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutDispatch(dispatch)
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Mosaic</span>
        </Link>
        <HomeOutlinedIcon />
        <CastIcon />
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Tìm kiếm..." />
        </div>
      </div>
      <div className="right">
        <div className="info" onClick={popup}>
          <NotificationsOutlinedIcon />
          <img src="/images/admin/avatar.jpg" alt="admin_img" />
        </div>
        {isPopuped && <div className="popupBox">
          <button className="edit-btn"> <ModeEditOutlineIcon /> Edit Profile</button>
          <button className="pass-btn"> <KeyIcon /> Change Password</button>
          <button style={{ paddingRight: "10px" }} className="logout-btn" onClick={handleLogout}>
            <LogoutIcon /> Log Out
          </button>
        </div>}
      </div>
    </div>
  )
}

export default AdminNavBar