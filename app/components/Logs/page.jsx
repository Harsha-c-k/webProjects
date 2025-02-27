'use client'
import NavBar from '../NavBar/page'
import Styles from '../../css/Logs.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
    const [logs, setLogs] = useState([]);  
 
    const username = JSON.parse(localStorage.getItem("userData"))?.username  
    const Email = JSON.parse(localStorage.getItem("userData"))?.email  

    const getLogs = async () => {
        try {
            const response = await axios.get("/api/bookings");
            console.log("Booking History Response:", response.data);
            setLogs(response.data.Logs);  
        } catch (error) {
            console.log("Error fetching Booking History:", error);
        }
    };

    useEffect(() => {
        if (username !== "guest" && Email !== "guest") {
            getLogs();
        }  
    }, []); 

    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.main}>
                    <NavBar />
                    <div className={Styles.tableDiv}>
                    {logs.length > 0 ? (
    <table className={Styles.tables}>
        <thead>
            <tr>
                <th>Booking ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Car Name</th>
                <th>Pickup Area</th>
                <th>Pickup Location</th>
                <th>Pincode</th>
                <th>Duration</th>
                <th>Pickup Date</th>
                <th>Amount</th>
                <th>Booking Date</th>
            </tr>
        </thead>
        <tbody>
            {logs.map((log) => {
                const rentedDays = log.Rented_Days || 0;
                const rentedWeeks = log.Rented_Weeks || 0;
                const rentedMonths = log.Rented_Months || 0;
                
                let duration = "";
                if (rentedDays > 0) {
                    duration = `${rentedDays} Days`;
                } else if (rentedWeeks > 0) {
                    duration = `${rentedWeeks} Weeks`;
                } else if (rentedMonths > 0) {
                    duration = `${rentedMonths} Months`;
                } else {
                    duration = "Duration not available";
                }
                return (
                    <tr key={log.Booking_id}>
                        <td>{log.Booking_id}</td>
                        <td>{log.userName}</td>
                        <td>{log.email}</td>
                        <td>{log.CarName}</td>
                        <td>{log.pickupArea}</td>
                        <td>{log.pickupLocation}</td>
                        <td>{log.pincode}</td>
                        <td>{duration}</td>
                        <td>{log.pickupDate}</td>
                        <td>${log.TotalAmount}</td>
                        <td>
                            {new Date(log["Booked At"]).toLocaleString()}
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
) : (
    <p>No logs found.</p>
)}


 
                    </div>
                </div>
            </div>
        </>
    );
}

export default page;
