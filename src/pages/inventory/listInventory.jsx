import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import {
  getRecordInventories,
  searchRecordInventory,
  updatedStatusRecordInventory,
} from "@/api/recordInventoryApi/recordInventory";
import ConfirmDeleteProduct from "@/components/confirmDeleteProduct/ConfirmDeleteProduct";
import { formatDate } from "@/utils/function/slipFuntion";

import styles from "./ListInventory.module.css";
import Layout from "@/components/layout/Layout";
const ListInventory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchInfo, setSearchInfo] = useState({
    recordInventoryCode: "",
    status: "",
    timeStart: "",
    timeEnd: "",
  });
  const [showDelete, setShowDelete] = useState(false);
  const [infoDelete, setInfoDelete] = useState({
    type: "recordInventory",
    id: "",
  });
  const [recordInventories, setRecordInventories] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const response = await getRecordInventories(page, limit);
      setRecordInventories(response.recordInventories);
      setTotal(response.totalResult);
    };

    getData();
  }, [isRefresh, page, limit]);

  const handleChangeFiedSearch = (e) => {
    const { name, value } = e.target;
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    const res = await searchRecordInventory(
      searchInfo.recordInventoryCode,
      searchInfo.status,
      searchInfo.timeStart,
      searchInfo.timeEnd,
      page,
      limit
    );
    setRecordInventories(res.recordInventories);
    setTotal(res.totalResult);
  };

  const handleChangeStatus = async (recordInventoryId, status) => {
    const data = {
      recordInventoryId,
      status,
      userId: localStorage.getItem("userId"),
    };

    await updatedStatusRecordInventory(data);
    setIsRefresh(!isRefresh);
    toast.success("Cập nhật trạng thái thành công");
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
  };

  const handleClickBin = (id) => {
    setInfoDelete({
      type: "recordInventory",
      id,
    });
    setShowDelete(true);
  };

  const handleClickPen = (recordInventoryId) => {
    router.push(`/inventory/inforInventory/${recordInventoryId}`);
  };

  return (
    <>
      <Layout>
        <div className={styles["container_ListInventory"]}>
          <div className={styles["sub_ListInventory"]}>
            <div className={styles["sub_1_ListInventory"]}>
              <div>
                <span>Mã phiếu</span>
                <input
                  type="text"
                  className={styles["input_ListImportSlip"]}
                  name="recordInventoryCode"
                  value={searchInfo.recordInventoryCode}
                  onChange={(e) => handleChangeFiedSearch(e)}
                />
                <span>Tình trạng</span>
                <select
                  name="status"
                  className={styles["input2_ListInventory"]}
                  onChange={(e) => handleChangeFiedSearch(e)}
                  value={searchInfo.status}
                >
                  <option value="">-Chọn tình trạng-</option>
                  <option value="PENDING">Chờ duyệt</option>
                  <option value="REJECTED">Từ chối</option>
                  <option value="CONFIRMED">Đã duyệt</option>
                </select>
              </div>

              <div>
                <span className={styles["date_ListInventory1"]}>Từ ngày</span>
                <input
                  type="date"
                  className={styles["date_ListInventory"]}
                  name="timeStart"
                  value={searchInfo.timeStart}
                  onChange={(e) => handleChangeFiedSearch(e)}
                />
                <span className={styles["date_ListInventory2"]}>Đến ngày</span>
                <input
                  type="date"
                  className={styles["date_ListInventory3"]}
                  name="timeEnd"
                  value={searchInfo.timeEnd}
                  onChange={(e) => handleChangeFiedSearch(e)}
                />
              </div>
            </div>
            <div
              className={styles["sub_2_ListInventory"]}
              onClick={handleSearch}
            >
              <span>
                Tìm kiếm{" "}
                <i className={styles["fa fa-search"]} aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div
            className={styles["sub_3_ListInventory"]}
            onClick={() => router.push("/inventory/createdInventory")}
          >
            <p>+ Tạo biên bản kiểm kê</p>
          </div>
          <div className={styles["table_ListInventory"]}>
            <table className={styles["table2_ListInventory"]}>
              <tbody>
                <tr className={styles["ListInventory_tr"]}>
                  <th className={styles["ListInventory_th_1"]}>STT</th>
                  <th className={styles["ListInventory_th_2"]}>Mã biên bản</th>
                  <th className={styles["ListInventory_th_2"]}>Mục đích</th>
                  <th className={styles["ListInventory_th"]}>Thời gian</th>
                  <th className={styles["ListInventory_th"]}>Tình trạng</th>
                  <th className={styles["ListInventory_th"]}>Thao tác</th>
                </tr>
                {recordInventories.length > 0 &&
                  recordInventories.map((recordInventory, index) => (
                    <tr
                      key={recordInventory._id}
                      style={{ backgroundColor: "white" }}
                    >
                      <td className={styles["listinvetory_td"]}>
                        {(page - 1) * limit + index + 1}
                      </td>
                      <td className={styles["listinvetory_td"]}>
                        {recordInventory.recordInventoryCode}
                      </td>
                      <td className={styles["listinvetory_td"]}>
                        {recordInventory.purpose}
                      </td>
                      <td className={styles["listinvetory_td"]}>
                        {formatDate(recordInventory.recordInventoryDate)}
                      </td>
                      <td className={styles["listinvetory_td"]}>
                        <select
                          className={
                            recordInventory.status === "PENDING"
                              ? styles["button1_ListInventory"]
                              : recordInventory.status === "REJECTED"
                                ? styles["button3_ListInventory"]
                                : styles["button_ListInventory"]
                          }
                          onChange={(e) =>
                            handleChangeStatus(
                              recordInventory._id,
                              e.target.value
                            )
                          }
                        >
                          <option
                            className={
                              recordInventory.status === "PENDING"
                                ? styles["button1_ListInventory"]
                                : recordInventory.status === "REJECTED"
                                  ? styles["button3_ListInventory"]
                                  : styles["button_ListInventory"]
                            }
                            value={recordInventory.status}
                          >
                            {recordInventory.status === "PENDING"
                              ? "Chờ duyệt"
                              : recordInventory.status === "CONFIRMED"
                                ? "Đã duyệt"
                                : "Từ chối"}
                          </option>
                          <option
                            className={styles["button1_ListInventory"]}
                            value="PENDING"
                          >
                            Chờ duyệt
                          </option>
                          <option
                            className={styles["button_ListInventory"]}
                            value="CONFIRMED"
                          >
                            Đã duyệt
                          </option>
                          <option
                            className={styles["button3_ListInventory"]}
                            value="REJECTED"
                          >
                            Từ chối
                          </option>
                        </select>
                      </td>
                      <td className={styles["purple"]}>
                        <button
                          className={styles["pen_ListImportSlip"]}
                          title="Sửa"
                          onClick={() => handleClickPen(recordInventory._id)}
                          type="button"
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        >
                          <FontAwesomeIcon icon={faPen} style={{ color: "blue", fontSize: "20px" }} />
                        </button>
                        <button
                          className={styles["bin_ListImportSlip"]}
                          title="Xóa"
                          onClick={() => handleClickBin(recordInventory._id)}
                          type="button"
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ color: "red", fontSize: "20px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              total={total}
              pageSize={limit}
              current={page}
              onChange={handleChangePage}
              style={{
                position: "absolute",
                bottom: "50px",
                right: "50px",
                position: "fixed",
              }}
            />
          </div>
        </div>
        {showDelete && (
          <div className={styles["overlay"]} onClick={handleCancelDelete}>
            <motion.div
              className={styles["itemDelete"]}
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scal: 1 }}
              initial={{ opacity: 0, scal: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <ConfirmDeleteProduct
                type={infoDelete.type}
                onCancel={handleCancelDelete}
                id={infoDelete.id}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
              />
            </motion.div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default ListInventory;
