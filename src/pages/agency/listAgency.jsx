import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { getSupplies, searchSupply } from "@/api/suppliesAPI/supply";
import { Pagination } from "antd";
import ConfirmDeleteProduct from "@/components/confirmDeleteProduct/ConfirmDeleteProduct";
import Layout from "@/components/layout/Layout";
import styles from "./ListAgency.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ListAgency = () => {
  const [supplies, setSupplies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [supplyCode, setSupplyCode] = useState("");
  const [supplyName, setSupplyName] = useState("");
  const [typeSupply, setTypeSupply] = useState("");
  const [supplyPhone, setSupplyPhone] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [type, setType] = useState("supply");
  const [deletedId, setDeletedId] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getListSupplies = async () => {
      try {
        const res = await getSupplies(limit, page);
        setSupplies(res.supplies);
        setTotal(res.totalResult);
      } catch (error) {
        console.error(error);
      }
    };

    getListSupplies();
  }, [page, isRefresh]);

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "supplyCode") {
      setSupplyCode(value);
    }
    if (name === "typeSupply") {
      setTypeSupply(value);
    }
    if (name === "supplyName") {
      setSupplyName(value);
    }
    if (name === "supplyPhone") {
      setSupplyPhone(value);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await searchSupply(
        supplyCode,
        supplyName,
        supplyPhone,
        typeSupply,
        page,
        limit
      );

      setSupplies(res.supplies);
      setTotal(res.supplies.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickBin = (supplyId, type) => {
    setDeletedId(supplyId);
    setType(type);
    setIsDelete(true);
  };

  const handleCancelDelete = () => {
    setIsDelete(false);
  };

  const handleClickName = (supplyId, type) => {
    router.push(`/agency/inforAgency/${type}/${supplyId}`);
  };

  return (
    <>
      <Layout>
        <div className={styles["container_ListAgency"]}>
          <div className={styles["sub_ListAgency"]}>
            <div className={styles["sub_1_ListAgency"]}>
              <div className={styles["group-listAgency"]}>
                <div>
                  <span>Mã nguồn</span>
                  <input
                    type="text"
                    className={styles["input_ListAgency"]}
                    name="supplyCode"
                    value={supplyCode}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <span>Tên nguồn</span>
                  <input
                    type="text"
                    className={styles["input_ListAgency"]}
                    name="supplyName"
                    value={supplyName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles["group-listAgency"]}>
                <div>
                  <span>Loại nguồn</span>
                  <select
                    name="typeSupply"
                    value={typeSupply}
                    id=""
                    className={styles["input2_ListAgency"]}
                    onChange={handleChange}
                  >
                    <option value="">-Chọn loại nguồn-</option>
                    <option value="agency">Đại lý</option>
                    <option value="provider">Nhà cung cấp</option>
                  </select>
                </div>
                <div>
                  <span>Số điện thoại</span>
                  <input
                    type="text"
                    className={styles["input_ListAgency"]}
                    name="supplyPhone"
                    value={supplyPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles["sub_2_ListAgency"]} onClick={handleSearch}>
              <span>
                Tìm kiếm{" "}
                <i className={styles["fa fa-search"]} aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div
            className={styles["sub_3_ListAgency"]}
            onClick={() => router.push("/agency/createdAgency")}
          >
            <p>+ Thêm mới nguồn</p>
          </div>
          <div className={styles["table_ListAgency"]}>
            <table className={styles["table2_ListAgency"]}>
              <tbody>
                <tr className={styles["ListAgency_tr"]}>
                  <th className={styles["ListAgency_th_1"]}>STT</th>
                  <th className={styles["ListAgency_th1"]}>Tên nguồn</th>
                  <th className={styles["ListAgency_th"]}>Loại nguồn</th>
                  <th className={styles["ListAgency_th"]}>Mã nguồn</th>
                  <th className={styles["ListAgency_th"]}>Số điện thoại</th>
                  <th className={styles["ListAgency_th1"]}>Địa chỉ</th>
                  <th className={styles["ListAgency_th"]}>Thao tác</th>
                </tr>
                {supplies.length > 0 &&
                  supplies.map((supply, index) => (
                    <tr className={styles["listAgency_tr_2"]} key={supply._id}>
                      <td className={styles["listAgency_td_2"]}>
                        {(page - 1) * limit + index + 1}
                      </td>
                      <td
                        className={styles["listAgency_td nameSupply"]}
                        onClick={() =>
                          handleClickName(
                            supply._id,
                            supply.providerName ? "provider" : "agency"
                          )
                        }
                      >
                        {supply.providerName || supply.agencyName}
                      </td>
                      <td className={styles["listAgency_td_2"]}>
                        {supply.providerName ? "Nhà cung cấp " : "Đại lý"}
                      </td>
                      <td className={styles["listAgency_td_2"]}>
                        {supply.providerCode || supply.agencyCode}
                      </td>
                      <td className={styles["listAgency_td_2"]}>
                        {supply.providerPhone || supply.agencyPhone}
                      </td>
                      <td className={styles["listAgency_td"]}>
                        {supply.providerAddress || supply.agencyAddress}
                      </td>
                      <td className={styles["purple"]}>
                        <button
                          className={styles["bin_ListAgency"]}
                          onClick={() =>
                            handleClickBin(
                              supply._id,
                              supply.providerName ? "provider" : "agency"
                            )
                          }
                          title="Xóa"
                          type="button"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ color: "red", fontSize: 18 }} />
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
                bottom: "20px",
                right: "50px",
                position: "fixed",
              }}
            />
          </div>
        </div>
        {isDelete && (
          <div className={styles["overlay"]} onClick={handleCancelDelete}>
            <motion.div
              className={styles["itemDelete"]}
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scal: 1 }}
              initial={{ opacity: 0, scal: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <ConfirmDeleteProduct
                type={type}
                onCancel={handleCancelDelete}
                id={deletedId}
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

export default ListAgency;
