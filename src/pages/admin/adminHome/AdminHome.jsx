import React, { useEffect, useState, useMemo } from "react";
import AdminNavBar from "../../../components/admin/adminNavbar/AdminNavBar";
import AdminLeftBar from "../../../components/admin/adminLeftBar/AdminLeftBar";
import "./adminHome.scss";
import NewMembers from "../../../components/admin/newMembers/NewMembers";
import LatestTransactions from "../../../components/admin/latestTransactions/LatestTransactions";
import FeaturedItem from "../../../components/admin/featuredItems/FeaturedItem";
import Chart from "../../../components/admin/chart/Chart";
import { userRequest } from "../../../utilities/requestMethod";

function AdminHome() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (error) { }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="admin-home-container">
      <AdminNavBar />
      <div className="bottom">
        <AdminLeftBar />
        <div className="bottom-right">
          <FeaturedItem />
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="New User"
          />
          <div className="data">
            <NewMembers />
            <LatestTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
