import React from "react";
import styles from "./css/DetailsCard.module.css";

const DetailsCard = (props) => {
    return (
        <div className={styles.container}>
            <p style={{ fontWeight: "bold" }}>{props.title}</p>
            <div style={{ display: "flex" }}>
                <p style={{ fontSize: 12, color: "grey" }}>
                    Name: {props.firstName} {props.lastName}
                </p>
                <p style={{ fontSize: 12, color: "grey", marginLeft: 15 }}>
                    Student Id: {props.studentId}
                </p>
            </div>
        </div>
    );
};

export default DetailsCard;
