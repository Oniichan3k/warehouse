import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Pagination } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import { searchSupply } from "@/api/suppliesAPI/supply";
import {
  getExportSlipByType,
  searchExportSlip,
  updateStatusExportSlip,
} from "@/api/exportSlipApi/exportSlip";
import { formatCurrency, formatDate } from "@/utils/function/slipFuntion";
import ConfirmDeleteProduct from "@/components/confirmDeleteProduct/ConfirmDeleteProduct";
import Layout from "@/components/layout/Layout";
import styles from "./ListExportSlip.module.css";
const ListExportSlip = () => {
  const router = useRouter();
  const { type } = router.query;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [exportSlips, setExportSlips] = useState([]);
  const [total, setTotal] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [infoDelete, setInfoDelete] = useState({
    type: "exportSlip",
    id: "",
  });

  const [inforSearch, setInforSearch] = useState({
    exportSlipCode: "",
    providerId: "",
    status: "",
    timeStart: "",
    timeEnd: "",
  });

  const [listProvider, setListProvider] = useState([]);
 useEffect(() => {
  if (!type) return;
  const getProvider = async () => {
    let res;
    if (type === "Provider") {
      res = await searchSupply("", "", "", "provider", 1, 100);
    } else if (type === "Agency") {
      res = await searchSupply("", "", "", "agency", 1, 100);
    }
    if (res && Array.isArray(res.supplies)) {
      setListProvider(res.supplies);
    } else {
      setListProvider([]);
      // Có thể log lỗi hoặc thông báo cho dev biết
      // console.error("API trả về không hợp lệ:", res);
    }
  };
  getProvider();
}, [type]);


  useEffect(() => {
    if (!type) return;
    const getListExportSlip = async () => {
      const res = await getExportSlipByType(type, page, limit);
      setExportSlips(res.exportSlip);
      setTotal(res.totalResult);
    };
    getListExportSlip();
  }, [isRefresh, page, type]);

  const handleChangeFieldSearch = (e) => {
    const { name, value } = e.target;
    setInforSearch({
      ...inforSearch,
      [name]: value,
    });
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleSearch = async () => {
    const data = {
      exportSlipCode: inforSearch.exportSlipCode,
      providerId: inforSearch.providerId,
      status: inforSearch.status,
      timeStart: inforSearch.timeStart
        ? new Date(inforSearch.timeStart).toISOString()
        : "",
      timeEnd: inforSearch.timeEnd
        ? new Date(inforSearch.timeEnd).toISOString()
        : "",
      type: type,
    };

    try {
      let res;
      if (type === "Provider") {
        res = await searchExportSlip(
          data.exportSlipCode,
          data.providerId,
          "",
          "",
          data.status,
          data.timeStart,
          data.timeEnd,
          page,
          limit,
          data.type
        );
      } else {
        if (type === "Agency") {
          res = await searchExportSlip(
            data.exportSlipCode,
            "",
            data.providerId,
            "",
            data.status,
            data.timeStart,
            data.timeEnd,
            page,
            limit,
            data.type
          );
        }
      }
      setExportSlips(res.exportSlips);
      setTotal(res.totalResult);
      setInforSearch({
        exportSlipCode: "",
        providerId: "",
        status: "",
        timeStart: "",
        timeEnd: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (exportSlipId, status) => {
    try {
      await updateStatusExportSlip(exportSlipId, status);
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickPen = (exportSlipId) => {
    router.push(`/exportSlip/inforExportSlip/${exportSlipId}`);
  };

  const handleClickBin = (exportSlipId) => {
    setShowDelete(true);
    setInfoDelete({
      type: "exportSlip",
      id: exportSlipId,
    });
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
  };

  return (
    <>
      <Layout>
        <div className={styles["container_ListExportSlip"]}>
          <div className={styles["sub_ListExportSlip"]}>
            <div className={styles["sub_1_ListExportSlip"]}>
              <div>
                <span>Mã phiếu</span>
                <input
                  type="text"
                  className={styles["input_ListExportSlip"]}
                  name="exportSlipCode"
                  value={inforSearch.exportSlipCode}
                  onChange={(e) => handleChangeFieldSearch(e)}
                />
                <span>Nguồn nhận</span>
                <select
                  name="providerId"
                  id=""
                  className={styles["input1_ListExportSlip"]}
                  value={inforSearch.providerId}
                  onChange={(e) => handleChangeFieldSearch(e)}
                >
                  <option value="">-Chọn nguồn nhận-</option>
                  {listProvider.length > 0 &&
                    listProvider.map((provider) => (
                      <option value={provider._id} key={provider._id}>
                        {provider.providerName || provider.agencyName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <span>Tình trạng</span>
                <select
                  name="status"
                  id=""
                  className={styles["input2_ListExportSlip"]}
                  value={inforSearch.status}
                  onChange={(e) => handleChangeFieldSearch(e)}
                >
                  <option value=""></option>
                  <option value="PENDING">Chờ duyệt</option>
                  <option value="DONE">Đã xuất</option>
                  <option value="REJECTED">Từ chối</option>
                  <option value="CONFIRMED">Đã duyệt</option>
                  <option value="RETURNED">Hoàn hàng</option>
                </select>
                <span className={styles["date_ListExportSlip1"]}>Từ ngày</span>
                <input
                  type="date"
                  className={styles["date_ListExportSlip"]}
                  value={inforSearch.timeStart}
                  name="timeStart"
                  onChange={(e) => handleChangeFieldSearch(e)}
                />
                <span className={styles["date_ListExportSlip2"]}>Đến ngày</span>
                <input
                  type="date"
                  className={styles["date_ListExportSlip3"]}
                  value={inforSearch.timeEnd}
                  name="timeEnd"
                  onChange={(e) => handleChangeFieldSearch(e)}
                />
              </div>
            </div>
            <div
              className={styles["sub_2_ListExportSlip"]}
              onClick={handleSearch}
            >
              <span>
                Tìm kiếm{" "}
                <i className={styles["fa fa-search"]} aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div
            className={styles["sub_3_ListExportSlip"]}
            onClick={() => {
              if (type) {
                router.push(`/exportSlip/createdExportSlip/${type}`);
              } else {
                alert("Vui lòng chọn loại phiếu xuất kho!");
              }
            }}

          >
            <p>+ Tạo phiếu xuất kho</p>
          </div>
          <div className={styles["table_ListExportSlip"]}>
            <table className={styles["table2_ListExportSlip"]}>
              <tr className={styles["ListExportSlip_tr"]}>
                <th className={styles["ListExportSlip_th_1"]}>STT</th>
                <th className={styles["ListExportSlip_th"]}>Mã phiếu</th>
                <th className={styles["ListExportSlip_th"]}>Nguồn xuất</th>
                <th className={styles["ListExportSlip_th"]}>Giá trị</th>
                <th className={styles["ListExportSlip_th"]}>Thời gian</th>
                <th className={styles["ListExportSlip_th"]}>Tình trạng</th>
                <th className={styles["ListExportSlip_th"]}>Thao tác</th>
              </tr>
              {exportSlips.length > 0 &&
                exportSlips.map((exportSlip, index) => (
                  <tr
                    className={styles["listExportSlip_tr_2"]}
                    key={exportSlip._id}
                  >
                    <td className={styles["ListExportSlip_td"]}>
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className={styles["ListExportSlip_td"]}>
                      {exportSlip.exportSlipCode}
                    </td>
                    <td className={styles["ListExportSlip_td"]}>
                      {" "}
                      {(type === "Provider" &&
                        exportSlip.providerId?.providerName) ||
                        (type === "Agency" && exportSlip.agencyId?.agencyName)}
                    </td>
                    <td className={styles["ListExportSlip_td"]}>
                      {formatCurrency(exportSlip.exportPrice)}
                    </td>
                    <td className={styles["ListExportSlip_td"]}>
                      {formatDate(exportSlip.createdAt)}
                    </td>
                    <td className={styles["ListExportSlip_td"]}>
                      <select
                        className={
                          exportSlip.status === "PENDING"
                            ? "button1_ListExportSlip"
                            : exportSlip.status === "DONE"
                              ? "button2_ListExportSlip"
                              : exportSlip.status === "REJECTED"
                                ? "button3_ListExportSlip"
                                : exportSlip.status === "CONFIRMED"
                                  ? "button_ListExportSlip"
                                  : exportSlip.status === "RETURNED"
                                    ? "button4_ListExportSlip"
                                    : ""
                        }
                        onChange={(e) =>
                          handleUpdateStatus(exportSlip._id, e.target.value)
                        }
                      >
                        <option
                          className={
                            exportSlip.status === "PENDING"
                              ? "button1_ListExportSlip"
                              : exportSlip.status === "DONE"
                                ? "button2_ListExportSlip"
                                : exportSlip.status === "REJECTED"
                                  ? "button3_ListExportSlip"
                                  : exportSlip.status === "CONFIRMED"
                                    ? "button_ListExportSlip"
                                    : exportSlip.status === "RETURNED"
                                      ? "button4_ListExportSlip"
                                      : ""
                          }
                          value={exportSlip.status}
                        >
                          {exportSlip.status === "PENDING"
                            ? "Chờ duyệt"
                            : exportSlip.status === "DONE"
                              ? "Đã xuất"
                              : exportSlip.status === "REJECTED"
                                ? "Từ chối"
                                : exportSlip.status === "CONFIRMED"
                                  ? "Đã duyệt"
                                  : exportSlip.status === "RETURNED"
                                    ? "Hoàn hàng"
                                    : ""}
                        </option>
                        <option
                          className={styles["button1_ListExportSlip"]}
                          value="PENDING"
                        >
                          Chờ duyệt
                        </option>
                        <option
                          className={styles["button2_ListExportSlip"]}
                          value="DONE"
                        >
                          Đã xuất
                        </option>
                        <option
                          className={styles["button3_ListExportSlip"]}
                          value="REJECTED"
                        >
                          Từ chối
                        </option>
                        <option
                          className={styles["button_ListExportSlip"]}
                          value="CONFIRMED"
                        >
                          Đã duyệt
                        </option>
                        <option
                          className={styles["button4_ListExportSlip"]}
                          value="RETURNED"
                        >
                          Hoàn hàng
                        </option>
                      </select>
                    </td>
                    <td className={styles["purple"]}>
                        <button
                          className={`${styles["icon-action"]} ${styles["pen_ListImportSlip"]}`}
                          title="Sửa"
                          onClick={() => handleClickPen(exportSlip._id)}
                          type="button"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button
                          className={`${styles["icon-action"]} ${styles["bin_ListImportSlip"]}`}
                          title="Xóa"
                          onClick={() => handleClickBin(exportSlip._id)}
                          type="button"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>

                  </tr>
                ))}
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

export default ListExportSlip;
