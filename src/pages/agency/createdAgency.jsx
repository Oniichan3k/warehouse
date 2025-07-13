import React, { useState } from "react";
import { useRouter } from "next/router";
import { createdSupply } from "@/api/suppliesAPI/supply";
import { toast } from "react-toastify";
import Layout from "@/components/layout/Layout";
import styles from "./CreatedAgency.module.css";

const CreatedAgency = () => {
  const router = useRouter();

  const [supply, setSupply] = useState({
    supplyCode: `${Math.floor(Math.random() * 1000000)}`,
    supplyName: "",
    supplyType: "",
    supplyAddress: "",
    supplyPhone: "",
    supplyEmail: "",
    supplyRepresentative: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupply({
      ...supply,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        code: supply.supplyCode,
        name: supply.supplyName,
        address: supply.supplyAddress,
        phone: supply.supplyPhone,
        email: supply.supplyEmail,
        representative: supply.supplyRepresentative,
        type: supply.supplyType,
      };
      await createdSupply(data);
      toast.success("Thêm nguồn hàng thành công");
      router.push("/agency/listAgency");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Lỗi hệ thống");
    }
  };

  return (
    <div>
      <Layout>
        <div className={styles["main-CreatedAgency"]}>
          <div className={styles["body-CreatedAgency"]}>
            <div className={styles["breadcrumb"]}>
              <p
                className={styles["title-createdAgency"]}
                onClick={() => router.push("/agency/listAgency")}
                style={{ cursor: "pointer" }}
              >
                Quản lý nguồn hàng xuất/nhập
              </p>
              <span className={styles["title-createdAgency"]}>&gt;</span>
              <p className={styles["title-createdAgency"]}>Thêm loại nguồn</p>
            </div>
            <div className={styles["content-container-agency"]}>
              <div className={styles["title-bar-agency"]}>Thêm mới nguồn</div>

              <div className={styles["form-container"]}>
                <div className={styles["form-group-created-agency"]}>
                  <label className={styles["form-label"]}>Mã nguồn</label>
                  <input
                    type="text"
                    name="supplyCode"
                    value={supply.supplyCode}
                    className={styles["form-input"]}
                    readOnly
                  />
                </div>

                <div className={styles["form-group-created-agency"]}>
                  <label className={styles["form-label"]}>Tên nguồn</label>
                  <input
                    type="text"
                    name="supplyName"
                    value={supply.supplyName}
                    className={styles["form-input"]}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles["form-group-created-agency"]}>
                  <label className={styles["form-label"]}>Loại nguồn</label>
                  <select
                    name="supplyType"
                    value={supply.supplyType}
                    onChange={handleChange}
                    id=""
                    className={styles["form-input"]}
                    required
                  >
                    <option value="">-Loại nguồn-</option>
                    <option value="provider">Nhà cung cấp</option>
                    <option value="agency">Đại lý</option>
                  </select>
                </div>

                <div className={styles["form-group-created-agency"]}>
                  <label className={styles["form-label"]}>Địa chỉ</label>
                  <input
                    type="text"
                    name="supplyAddress"
                    value={supply.supplyAddress}
                    onChange={handleChange}
                    className={styles["form-input"]}
                    required
                  />
                </div>

                <div className={styles["form-group-created-agency"]}>
                  <label className={styles["form-label"]}>Số điện thoại</label>
                  <input
                    type="text"
                    name="supplyPhone"
                    value={supply.supplyPhone}
                    onChange={handleChange}
                    className={styles["form-input"]}
                    required
                  />
                </div>

                <div className={styles["form-group-created-agency"]}>
                  <label className={styles["form-label"]}>Email</label>
                  <input
                    type="text"
                    name="supplyEmail"
                    value={supply.supplyEmail}
                    onChange={handleChange}
                    className={styles["form-input"]}
                    required
                  />
                </div>

                <div className={styles["form-group-created-agency"]}>
                  <label className={styles["form-label"]}>Người đại diện</label>
                  <input
                    type="text"
                    name="supplyRepresentative"
                    value={supply.supplyRepresentative}
                    onChange={handleChange}
                    className={styles["form-input"]}
                    required
                  />
                </div>

                <div className={styles["button-group"]}>
                  <button
                    className={styles["save-btn"]}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Lưu
                  </button>
                  <button
                    className={styles["cancel-btn"]}
                    onClick={() => router.push("/agency/listAgency")}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreatedAgency;
