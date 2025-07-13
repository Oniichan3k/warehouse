import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./InforExportSlip.module.css";
import { getExportSlipById } from "@/api/exportSlipApi/exportSlip";
import { formatCurrency, formatDate } from "@/utils/function/slipFuntion";
import Layout from "@/components/layout/Layout";
const InforExportSlip = () => {
  const [exportSlip, setExportSlip] = useState({});
  const [type, setType] = useState("");
  const router = useRouter();
  const { exportSlipId } = router.query;
  useEffect(() => {
    if (!exportSlipId) return;
    const getExportSlip = async () => {
      const res = await getExportSlipById(exportSlipId);
      if (res.exportSlip.agencyId?._id) setType("Agency");
      else if (res.exportSlip.providerId?._id) setType("Provider");
      setExportSlip(res.exportSlip);
    };
    getExportSlip();
  }, [exportSlipId]);

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
        <div className={styles["exportForm-container"]}>
          <div style={{ width: "100%", overflow: "auto" }}>
            <div
              className={styles["exportForm-nav"]}
              style={{ display: "flex" }}
            >
              <p onClick={() => router.push(`/exportSlip/listExportSlip/${type}`)}>
                Xuất - nhập với{" "}
                {(type === "Provider" && "NCC") ||
                  (type === "Agency" && "đại lý")}{" "}
                {">"}{" "}
              </p>
              <p>Xem phiếu xuất kho</p>
            </div>
            <div className={styles["exportForm-main"]}>
              <div className={styles["exportForm-title"]}>PHIẾU XUẤT KHO</div>
              <div className={styles["exportForm"]}>
                <p>Thông tin chung</p>
                <div className={styles["exportForm-infor"]}>
                  <div className={styles["col"]}>
                    <div className={styles["col-item"]}>
                      <label for="ef-agencyName">Nguồn nhận</label>
                      <div
                        className={styles["ef-inforBox"]}
                        name="ef-agencyName"
                      >
                        {(type === "Provider" &&
                          exportSlip.providerId?.providerName) ||
                          (type === "Agency" &&
                            exportSlip.agencyId?.agencyName)}
                      </div>
                    </div>

                    <div className={styles["col-item"]}>
                      <label for="ef-agencyID">Mã nguồn</label>
                      <div className={styles["ef-inforBox"]} name="ef-agencyID">
                        {(type === "Provider" &&
                          exportSlip.providerId?.providerCode) ||
                          (type === "Agency" &&
                            exportSlip.agencyId?.agencyCode)}
                      </div>
                    </div>

                    <div className={styles["col-item"]}>
                      <label for="ef-agencyPhone">Điện thoại</label>
                      <div
                        className={styles["ef-inforBox"]}
                        name="ef-agencyPhone"
                      >
                        {(type === "Provider" &&
                          exportSlip.providerId?.providerPhone) ||
                          (type === "Agency" &&
                            exportSlip.agencyId?.agencyPhone)}
                      </div>
                    </div>

                    <div className={styles["col-item"]}>
                      <label for="ef-agencyAddress">Địa chỉ</label>
                      <div
                        className={styles["ef-inforBox ef-formDescribe"]}
                        name="ef-agencyID"
                      >
                        {(type === "Provider" &&
                          exportSlip.providerId?.providerAddress) ||
                          (type === "Agency" &&
                            exportSlip.agencyId?.agencyAddress)}
                      </div>
                    </div>
                  </div>

                  <div className={styles["col"]}>
                    <div className={styles["col-item"]}>
                      <label for="ef-formID">Mã phiếu</label>
                      <div className={styles["ef-inforBox"]} name="ef-formID">
                        {exportSlip.exportSlipCode}
                      </div>
                    </div>

                    <div className={styles["col-item"]}>
                      <label for="ef-formDescribe">Lý do xuất</label>
                      <div
                        className={styles["ef-inforBox ef-formDescribe"]}
                        name="ef-formDescribe"
                      >
                        {exportSlip.reason}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles["exportForm-listProduct"]}>
                <table>
                  <tr>
                    <th>STT</th>
                    <th>Tên hàng hóa</th>
                    <th>Mã hàng</th>
                    <th>Đơn vị tính</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Chiết khấu</th>
                    <th>Thành tiền</th>
                  </tr>
                  {exportSlip.products?.length > 0 &&
                    exportSlip.products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.productId?.productName}</td>
                        <td>{product.productId?.productCode}</td>
                        <td>{product.productId?.productDVT}</td>
                        <td>
                          {formatCurrency(product.productId?.productPrice || 0)}
                        </td>
                        <td>{product.quantity}</td>
                        <td> {product.discount} %</td>
                        <td>{formatCurrency(calculateLineTotal(product))}</td>
                      </tr>
                    ))}
                  <tr>
                    <td colspan="7">Tổng</td>
                    <td>{formatCurrency(exportSlip.exportPrice)}</td>
                  </tr>
                </table>
              </div>

              <div className={styles["ef-contract"]}>
                <div className={styles["ef-contact-title"]}>Hợp đồng</div>
                <div className={styles["ef-contract-img"]}>
                  {exportSlip.contracts?.contractMedia.length > 0 &&
                    exportSlip.contracts?.contractMedia.map(
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

            <div className={styles["status-panel"]}>
              <div className={styles["status-header"]}>
                <h4>Tình trạng</h4>
              </div>
              <div className={styles["status-group"]}>
                <div className={styles["status-label"]}>
                  Tạo bởi{" "}
                  <button className={styles["status-btn delete"]}>Xóa</button>
                </div>

                <div className={styles["status-info"]}>
                  <input
                    type="text"
                    value={exportSlip.userId?.fullName}
                    readOnly
                  />
                </div>
                <div className={styles["status-info"]}>
                  <input type="text" value={formatDate(exportSlip.createdAt)} />
                </div>
              </div>

              <div className={styles["status-group"]}>
                <div className={styles["status-label"]}>
                  Duyệt bởi{" "}
                  <button className={styles["status-btn approve"]}>
                    Duyệt
                  </button>{" "}
                </div>

                <div className={styles["status-info"]}>
                  <input
                    type="text"
                    value={
                      (exportSlip.status === "CONFIRMED" &&
                        exportSlip.userEditStatus?.fullName) ||
                      ""
                    }
                    readOnly
                  />
                </div>
                <div className={styles["status-info"]}>
                  <input
                    type="text"
                    value={
                      (exportSlip.status === "CONFIRMED" &&
                        formatDate(exportSlip.updatedAt)) ||
                      ""
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className={styles["status-group"]}>
                <div className={styles["status-label"]}>
                  Từ chối bởi{" "}
                  <button className={styles["status-btn reject"]}>
                    Từ chối
                  </button>
                </div>

                <div className={styles["status-info"]}>
                  <input
                    type="text"
                    value={
                      (exportSlip.status === "REJECTED" &&
                        exportSlip.userEditStatus?.fullName) ||
                      ""
                    }
                    readOnly
                  />
                </div>
                <div className={styles["status-info"]}>
                  <input
                    type="text"
                    value={
                      (exportSlip.status === "REJECTED" &&
                        formatDate(exportSlip.updatedAt)) ||
                      ""
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className={styles["status-group"]}>
                <div className={styles["status-label"]}>
                  Đã xuất bởi{" "}
                  <button className={styles["status-btn exported"]} disabled>
                    Đã xuất
                  </button>
                </div>

                <div className={styles["status-info"]}>
                  <input
                    type="text"
                    value={
                      (exportSlip.status === "DONE" &&
                        exportSlip.userEditStatus?.fullName) ||
                      ""
                    }
                    readOnly
                  />
                </div>
                <div className={styles["status-info"]}>
                  <input
                    type="text"
                    value={
                      (exportSlip.status === "DONE" &&
                        formatDate(exportSlip.updatedAt)) ||
                      ""
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className={styles["status-group"]}>
                <div className={styles["status-label"]}>
                  Hoàn hàng bởi
                  <button className={styles["status-btn return"]}>
                    Hoàn hàng
                  </button>
                </div>

                <div className={styles["status-info"]}>
                  <input
                    type="text"
                    value={
                      (exportSlip.status === "RETURNED" &&
                        exportSlip.userEditStatus?.fullName) ||
                      ""
                    }
                    readOnly
                  />
                </div>
                <div className={styles["status-info"]}>
                  <input
                    type="text"
                    value={
                      (exportSlip.status === "RETURNED" &&
                        formatDate(exportSlip.updatedAt)) ||
                      ""
                    }
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default InforExportSlip;
