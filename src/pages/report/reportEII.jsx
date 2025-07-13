import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { reportExportImportInventory } from "@/api/reportApi/Report";
import styles from "./ReportEII.module.css";
import TableReport from "@/components/tableReport/TableReport";
import Layout from "@/components/layout/Layout";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportEII = () => {
  const [labels, setLabels] = useState([]);
  const [dataExports, setDataExports] = useState([]);
  const [dataInventorys, setDataInventorys] = useState([]);
  const [list, setList] = useState([]);
  const [type, setType] = useState("chart");
  const [time, setTime] = useState({
    timeStart: "",
    timeEnd: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await reportExportImportInventory(
        time.timeStart,
        time.timeEnd
      );

      if (!res || res.length === 0) {
        setLabels([]);
        setDataExports([]);
        setDataInventorys([]);
        setList([]);
        setError("Không có dữ liệu phù hợp với khoảng thời gian đã chọn.");
        return;
      }

      setLabels(res.map(item => item.productName || "Sản phẩm không tên"));
      setDataExports(res.map(item => item.exportQuantity ?? 0));
      setDataInventorys(res.map(item => item.inventoryQuantity ?? 0));
      setList(res);
    } catch (err) {
      setError("Lỗi khi lấy dữ liệu từ máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (time.timeStart && time.timeEnd) {
      fetchData();
    }
  }, [time.timeStart, time.timeEnd]);

  const handleChangeTime = (e) => {
    const { name, value } = e.target;
    setTime((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Xuất kho",
        data: dataExports,
        backgroundColor: "#30a032",
        borderColor: "#30a032",
        borderWidth: 1,
      },
      {
        label: "Tồn kho",
        data: dataInventorys,
        backgroundColor: "#fdbe10",
        borderColor: "#fed871",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "black",
          font: { size: 11 },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "black",
          font: { size: 11 },
          maxRotation: 45,
        },
        categoryPercentage: 1,
        barPercentage: 1,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: "black",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <Layout>
      <div className={styles["reportEII-container"]}>
        <div className={styles["REII-frame"]}>
          <h2 className={styles["reportEII-h2"]}>BIỂU ĐỒ BÁO CÁO XUẤT NHẬP TỒN</h2>
          <div className={styles["date-ReportEII"]}>
            <span className={styles["date-ReportEII1"]}>Từ ngày</span>
            <input
              type="date"
              className={styles["date-ReportEII3"]}
              name="timeStart"
              value={time.timeStart}
              onChange={handleChangeTime}
            />
            <span className={styles["date-ReportEII2"]}>Đến ngày</span>
            <input
              type="date"
              className={styles["date-ReportEII3"]}
              name="timeEnd"
              value={time.timeEnd}
              onChange={handleChangeTime}
            />
            <span className={styles["reportEII-type"]}>Loại báo cáo</span>
            <select
              className={styles["reportEII-select"]}
              onChange={handleChangeType}
              value={type}
            >
              <option value="chart">Biểu đồ</option>
              <option value="table">Bảng</option>
            </select>
          </div>

          {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <>
              {type === "chart" ? (
                <div className={styles["REII-barchart"]} style={{ minHeight: 350, height: 350 }}>
                  <Bar data={data} options={options} />
                </div>
              ) : (
                <div className={styles["REII-barchart"]}>
                  <TableReport list={list} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ReportEII;

