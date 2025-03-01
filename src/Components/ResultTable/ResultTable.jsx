import React, { useEffect, useState } from "react";
import { prepareTableData } from "./table_handler";
import styles from "./result_table.module.css";

export default function ResultTable({ points }) {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (points) {
            const formattedData = prepareTableData(points);
            setTableData(formattedData);
        }
    }, [points]);

    return (
        <div className={styles.table}>
            <div className={styles.header}>
                <p>X</p>
                <p>Y</p>
                <p>R</p>
                <p>Status</p>
                <p>Time</p>
                <p>Processing Time</p>
            </div>
            {tableData.map((point, index) => (
                <div
                    key={point.id}
                    className={`${styles.table_row} ${point.inArea ? styles.inarea : ""}`}
                >
                    <p>{point.x}</p>
                    <p>{point.y}</p>
                    <p>{point.r}</p>
                    <p>{point.areaStatus}</p>
                    <p>{point.formattedTime}</p>
                    <p>{point.formattedProcessingTime}</p>
                </div>
            ))}
        </div>
    );
}