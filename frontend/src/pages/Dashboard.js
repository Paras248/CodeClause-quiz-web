import React from "react";
import ShowTestDetails from "../components/Dashboard/ShowTestDetails";
import DashboardHeader from "../components/UI/DashboardHeader";

const Dashboard = () => {
    return (
        <>
            <DashboardHeader
                buttonText="Create Quiz"
                buttonRedirectTo="/teacherDashboard/test/create"
            />
            <div>
                <ShowTestDetails />
            </div>
        </>
    );
};

export default Dashboard;
