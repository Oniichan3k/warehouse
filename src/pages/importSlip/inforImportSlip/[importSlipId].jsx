import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./InforImportSlip.module.css";
import { getImportSlipById } from "@/api/importSlipApi/importSlip";
import { formatCurrency, formatDate } from "@/utils/function/slipFuntion";
import Layout from "@/components/layout/Layout";
const InforImportSlip = () => {
  const [importSlip, setImportSlip] = useState({});
  const [type, setType] = useState("");

  const router = useRouter();
  const { importSlipId } = router.query;
  useEffect(() => {
    if (!importSlipId) return;
    const getImportSlip = async () => {
      const res = await getImportSlipById(importSlipId);
      if (res.importSlip.agencyId?._id) setType("Agency");
      else if (res.importSlip.providerId?._id) setType("Provider");
      setImportSlip(res.importSlip);
    };
    getImportSlip();
  }, [importSlipId]);

  const calculateLineTotal = (product) => {
    return (
      product.productId?.productPrice *
      product.quantity *
      (1 - product.discount / 100)
    );
  };

  return (
    <>
      <Layout>
        <div className={styles["container_infim"]}>
          <div className={styles["lef_infim"]}>
            <div className={styles["top_sub_infim"]}>
              <p className={styles["h1_top_sub_infim"]}>
                <span onClick={() => router.push(`/importSlip/listImportSlip/${type}`)}>
                  Xuất - nhập với{" "}
                  {(type === "Provider" && "NCC") ||
                    (type === "Agency" && "Nội bộ")}
                </span>
                <span>
                  <i
                    className={styles["fa-solid fa-chevron-right"]}
                    style={{ color: "black" }}
                  ></i>
                </span>
                Xem phiếu nhập kho
              </p>
            </div>
            <div className={styles["sub_infim"]}>
              <div className={styles["f1_infim"]}>
                <p className={styles["cen_inf"]}>
                  PHIẾU NHẬP KHO
                  <span className={styles["icon_x_inf"]}>
                    <i
                      className={styles["fa-solid fa-x"]}
                      onClick={() => router.push(`/listImportSlip/${type}`)}
                    ></i>
                  </span>
                </p>
              </div>
              <div className={styles["box1_infim"]}>
                <p
                  className={styles["inf_inf"]}
                  style={{ fontSize: "20px", fontWeight: "700" }}
                >
                  Thông tin chung
                </p>
                <div className={styles["sub_box1_infim"]}>
                  <div className={styles["flecx_inf"]}>
                    <p>Nguồn xuất</p>
                    <div className={styles["inp1_inf1"]}>
                      {(type === "Provider" &&
                        importSlip.providerId?.providerName) ||
                        (type === "Agency" && importSlip.agencyId?.agencyName)}
                    </div>
                  </div>
                  <div className={styles["flecx_inf"]}>
                    <p>Mã phiếu</p>
                    <div className={styles["inp1_inf1"]}>
                      {importSlip.importSlipCode}
                    </div>
                  </div>
                  <div className={styles["flecx_inf"]}>
                    <p>Mã nguồn</p>
                    <div className={styles["inp1_inf1"]}>
                      {(type === "Provider" &&
                        importSlip.providerId?.providerCode) ||
                        (type === "Agency" && importSlip.agencyId?.agencyCode)}
                    </div>
                  </div>
                  {/* <div className={styles['flecx_inf'>
                  <p>Nhập tại kho</p>
                  <div className={styles['inp1_inf'></div>
                </div> */}
                  <div className={styles["flecx_inf"]}>
                    <p>Số điện thoại</p>
                    <div className={styles["inp1_inf1"]}>
                      {(type === "Provider" &&
                        importSlip.providerId?.providerPhone) ||
                        (type === "Agency" && importSlip.agencyId?.agencyPhone)}
                    </div>
                  </div>
                  {/* <div className={styles['flecx_inf'>
                  <p>Mã kho</p>
                  <div className={styles['inp1_inf'></div>
                </div> */}
                  <div className={styles["flecx_inf"]}>
                    <p>Địa chỉ</p>
                    <div className={styles["inp2_inf"]}>
                      {(type === "Provider" &&
                        importSlip.providerId?.providerAddress) ||
                        (type === "Agency" &&
                          importSlip.agencyId?.agencyAddress)}
                    </div>
                  </div>
                  <div className={styles["flecx_inf"]}>
                    <p>Lí do</p>
                    <div className={styles["inp2_inf"]}>
                      {importSlip.reason}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["box2_infim"]}>
                <table className={styles["List_infim"]}>
                  <tbody>
                    <tr className={styles["tr_infim"]}>
                      <th className={styles["centerinfim"]}>STT</th>
                      <th className={styles["centerinfim"]}>Tên hàng hoá</th>
                      <th className={styles["centerinfim"]}>Mã hàng</th>
                      <th className={styles["centerinfim"]}>
                        Đơn vị <div>tính</div>
                      </th>
                      <th className={styles["centerinfim"]}>Đơn giá</th>
                      <th className={styles["centerinfim"]}>
                        Số<div>Lượng</div>
                      </th>
                      <th className={styles["centerinfim"]}>Chiết khấu</th>
                      <th className={styles["centerinfim"]}>Thành tiền</th>
                    </tr>
                    {importSlip.products?.length > 0 &&
                      importSlip.products.map((product, index) => (
                        <tr className={styles["tr_infim"]} key={product._id}>
                          <td>{index + 1}</td>
                          <td>{product.productId?.productName}</td>
                          <td>{product.productId?.productCode}</td>
                          <td>{product.productId?.productDVT}</td>
                          <td>
                            {formatCurrency(
                              product.productId?.productPrice || 0
                            )}
                          </td>
                          <td>{product.quantity}</td>
                          <td>{product.discount} %</td>
                          <td>{formatCurrency(calculateLineTotal(product))}</td>
                        </tr>
                      ))}
                    <tr className={styles["tr_infim"]}>
                      <th className={styles["sum_inf_1"]} colSpan={7}>
                        Tổng
                      </th>
                      <th className={styles["sum_inf_2"]}>
                        {formatCurrency(importSlip.importPrice)}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles["box3_infim"]}>
                <p>
                  <i className={styles["fa-solid fa-file-contract"]}></i>{" "}
                  <span>Hợp đồng</span>
                </p>
                <div className={styles["img_contract"]}>
                  {importSlip.contracts?.contractMedia.length > 0 &&
                    importSlip.contracts?.contractMedia.map(
                      (contractMedia, index) => (
                        <img
                          className={styles["img_contract"]}
                          src={contractMedia}
                          alt=""
                          key={index}
                        />
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles["rig_infim"]}>
            <div>
              <p>Tình trạng</p>
            </div>
            <div className={styles["status_infim"]}>
              <div className={styles["flex2_inf"]}>
                <p>Tạo bởi</p>
                <button className={styles["b1_infim"]}>
                  Xóa{" "}
                  <span>
                    <i className={styles["fa-solid fa-key"]}></i>
                  </span>
                </button>
              </div>
              <div className={styles["out_inf"]}>
                {importSlip.userId?.fullName}
              </div>
              <div className={styles["out_inf"]}>
                {formatDate(importSlip.createdAt)}
              </div>
            </div>
            <div className={styles["status_infim"]}>
              <div className={styles["flex2_inf"]}>
                <p>Duyệt bởi</p>
                <button className={styles["b2_infim"]}>
                  Duyệt{" "}
                  <span>
                    <i className={styles["fa-solid fa-key"]}></i>
                  </span>
                </button>
              </div>
              <div className={styles["out_inf"]}>
                {importSlip.status === "CONFIRMED" &&
                  importSlip.userEditStatus?.fullName}
              </div>
              <div className={styles["out_inf"]}>
                {importSlip.status === "CONFIRMED" &&
                  formatDate(importSlip.updatedAt)}
              </div>
            </div>
            <div className={styles["status_infim"]}>
              <div className={styles["flex2_inf"]}>
                <p>Từ chối bởi</p>
                <button className={styles["b3_infim"]}>
                  Từ chối{" "}
                  <span>
                    <i className={styles["fa-solid fa-key"]}></i>
                  </span>
                </button>
              </div>
              <div className={styles["out_inf"]}>
                {importSlip.status === "REJECTED" &&
                  importSlip.userEditStatus?.fullName}
              </div>
              <div className={styles["out_inf"]}>
                {importSlip.status === "REJECTED" &&
                  formatDate(importSlip.updatedAt)}
              </div>
            </div>
            <div className={styles["status_infim"]}>
              <div className={styles["flex2_inf"]}>
                <p>Đã nhập bởi</p>
                <button className={styles["b4_infim"]}>Đã nhập</button>
              </div>
              <div className={styles["out_inf"]}>
                {importSlip.status === "DONE" &&
                  importSlip.userEditStatus?.fullName}
              </div>
              <div className={styles["out_inf"]}>
                {importSlip.status === "DONE" &&
                  formatDate(importSlip.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default InforImportSlip;
