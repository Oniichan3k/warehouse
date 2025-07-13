import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSupplyById } from "@/api/suppliesAPI/supply";
import Layout from "@/components/layout/Layout";
import styles from "./InforAgency.module.css";

const InforAgency = () => {
  const [supply, setSupply] = useState({});
  const router = useRouter();
  const { type, supplyId } = router.query;

  useEffect(() => {
    if (!type || !supplyId) return;
    const getSupplyInfo = async () => {
      const res = await getSupplyById(type, supplyId);
      setSupply(type === "agency" ? res.agency : res.provider);
    };
    getSupplyInfo();
  }, [type, supplyId]);
  return (
    <>
      <Layout>
        <div className={styles["inforAgency"]}>
          <div className={styles["inforAgency-nav"]}>
            <p onClick={() => router.push("/agency/listAgency")}>
              Quản lý nguồn hàng nhập/xuất {">"}{" "}
            </p>
            <p>Xem nguồn hàng</p>
          </div>
          {/* <div className={styles["updateAgency-btn">
          <div className={styles["btn">Cập nhật thông tin</div>
        </div> */}
          <div className={styles["inforAgency-form"]}>
            <div className={styles["inforAgency-form-title"]}>
              <div>Thông tin nguồn</div>
              <div
                className={styles["close-btn"]}
                onClick={() => router.push("/agency/listAgency")}
              >
                X
              </div>
            </div>
            <div className={styles["inforAgency-form-main"]}>
              <div className={styles["inforAgency-form-row"]}>
                <label htmlFor="agencyID" className={styles["inforAgency-lbl"]}>
                  Mã nguồn
                </label>
                <div
                  id="agencyID"
                  name="agencyID"
                  className={styles["inforBox"]}
                >
                  {supply.providerCode || supply.agencyCode}
                </div>
              </div>

              <div className={styles["inforAgency-form-row"]}>
                <label
                  htmlFor="agencyName"
                  className={styles["inforAgency-lbl"]}
                >
                  Tên nguồn
                </label>
                <div
                  id="agencyName"
                  name="agencyName"
                  className={styles["inforBox"]}
                >
                  {supply.providerName || supply.agencyName}
                </div>
              </div>

              <div className={styles["inforAgency-form-row"]}>
                <label
                  htmlFor="agencyType"
                  className={styles["inforAgency-lbl"]}
                >
                  Loại nguồn
                </label>
                <div
                  id="agencyType"
                  name="agencyType"
                  className={styles["inforBox"]}
                >
                  {type === "provider" ? "Nhà cung cấp" : "Đại lý"}
                </div>
              </div>

              <div className={styles["inforAgency-form-row"]}>
                <label
                  htmlFor="agencyManager"
                  className={styles["inforAgency-lbl"]}
                >
                  Người đại diện
                </label>
                <div
                  id="agencyManager"
                  name="agencyManager"
                  className={styles["inforBox"]}
                >
                  {supply.representative}
                </div>
              </div>

              <div className={styles["inforAgency-form-row"]}>
                <label
                  htmlFor="agencyAddress"
                  className={styles["inforAgency-lbl"]}
                >
                  Địa chỉ
                </label>
                <div
                  id="agencyAddress"
                  name="agencyAddress"
                  className={styles["inforBox"]}
                >
                  {supply.providerAddress || supply.agencyAddress}
                </div>
              </div>

              <div className={styles["inforAgency-form-row"]}>
                <label
                  htmlFor="agencyPhone"
                  className={styles["inforAgency-lbl"]}
                >
                  Số điện thoại
                </label>
                <div
                  id="agencyPhone"
                  name="agencyPhone"
                  className={styles["inforBox"]}
                >
                  {supply.providerPhone || supply.agencyPhone}
                </div>
              </div>

              <div className={styles["inforAgency-form-row"]}>
                <label
                  htmlFor="agencyEmail"
                  className={styles["inforAgency-lbl"]}
                >
                  Email
                </label>
                <div
                  id="agencyEmail"
                  name="agencyEmail"
                  className={styles["inforBox"]}
                >
                  {supply.providerEmail || supply.agencyEmail}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default InforAgency;
