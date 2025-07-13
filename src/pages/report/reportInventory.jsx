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
import styles from "./ReportInventory.module.css";
import TableReport from "@/components/tableReport/TableReport";
import Layout from "@/components/layout/Layout";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportInventory = () => {
  const [labels, setLabels] = useState([]);
  const [datas, setDatas] = useState([]);
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

      console.log("✅ API response:", res);

      if (!res || res.length === 0) {
        setLabels([]);
        setDatas([]);
        setList([]);
        setError("Không có dữ liệu phù hợp với khoảng thời gian đã chọn.");
        return;
      }

      const labels = res.map(
        (item) => item.productName || "Sản phẩm không tên"
      );
      const datas = res.map((item) => item.inventoryQuantity ?? 0);

      setLabels(labels);
      setDatas(datas);
      setList(res);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
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
        label: "Số lượng hàng hoá",
        data: datas,
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
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 11 },
          maxRotation: 45,
        },
        categoryPercentage: 1,
        barPercentage: 1,
      },
      y: {
        ticks: {
          color: "black",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <Layout>
      <div className={styles["reportImport-container"]}>
        <div className={styles["RI-frame"]}>
          <h2 className={styles["reportImport-h2"]}>BIỂU ĐỒ BÁO CÁO TỒN KHO</h2>
          <div className={styles["date-ImportReport"]}>
            <span className={styles["date-ImportReport1"]}>Từ ngày</span>
            <input
              type="date"
              className={styles["date-ImportReport3"]}
              name="timeStart"
              value={time.timeStart}
              onChange={handleChangeTime}
            />
            <span className={styles["date-ImportReport2"]}>Đến ngày</span>
            <input
              type="date"
              className={styles["date-ImportReport3"]}
              name="timeEnd"
              value={time.timeEnd}
              onChange={handleChangeTime}
            />
            <span className={styles["reportImport-type"]}>Loại báo cáo</span>
            <select
              className={styles["reportImport-select"]}
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
                <div className={styles["IR-barchart"]}>
                  <Bar data={data} options={options} />
                </div>
              ) : (
                <div className={styles["IR-barchart"]}>
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

export default ReportInventory;