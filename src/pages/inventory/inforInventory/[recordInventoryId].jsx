import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getRecordInventoryById } from "@/api/recordInventoryApi/recordInventory";
import { formatDate } from "@/utils/function/slipFuntion";

import styles from "./InforInventory.module.css";
import Layout from "@/components/layout/Layout";
const InfoInventory = () => {
  const [recordInventory, setRecordInventory] = useState({});

  const router = useRouter();
  const { recordInventoryId } = router.query;
  useEffect(() => {
    if (!recordInventoryId) return;
    const getRecordInventory = async () => {
      const res = await getRecordInventoryById(recordInventoryId);
      setRecordInventory(res.recordInventory);
    };
    getRecordInventory();
  }, [recordInventoryId]);

  const handleCountDifference = () => {
    let count = 0;
    if (recordInventory.products?.length > 0) {
      recordInventory.products?.forEach((item) => {
        count += +item.difference;
      });
    }
    return count;
  };
  return (
    <>
      <Layout>
        <div className={styles["container_infinven"]}>
          <div className={styles["lef_infim"]}>
            <div className={styles["top_sub_infim"]}>
              <p className={styles["h1_top_sub_infim"]}>
                <span onClick={() => router.push("/inventory/listInventory")}>
                  Danh sách biên bản kiểm kê hàng hóa
                </span>
                <span>
                  <i
                    className={styles["fa-solid fa-chevron-right"]}
                    style={{ color: "black" }}
                  ></i>
                </span>
                Xem biên bản kiểm kê hàng hóa
              </p>
            </div>
            <div className={styles["sub_infinven"]}>
              <div className={styles["f1_infim"]}>
                <p className={styles["cen_inf"]}>
                  BẢNG KIỂM KÊ HÀNG HÓA
                  <span className={styles["icon_x_inf"]}>
                    <i className={styles["fa-solid fa-x"]}></i>
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
                    <p>Mã biên bản</p>
                    <div className={styles["inp1_inf"]}>
                      {recordInventory.recordInventoryCode}
                    </div>
                  </div>
                  <div></div>
                  <div className={styles["flecx_inf"]}>
                    <p>Kiểm kê tại kho</p>
                    <div className={styles["inp1_inf"]}>
                      {recordInventory.agencyId?.agencyName}
                    </div>
                  </div>
                  <div className={styles["flecx_inf"]}>
                    <p>Ngày kiểm</p>
                    <div className={styles["inp1_inf"]}>
                      {formatDate(recordInventory.recordInventoryDate)}
                    </div>
                  </div>
                </div>
                <div className={styles["sub2_inven"]}>
                  <p>Mục đích</p>
                  <div className={styles["inp2_infven"]}>
                    {recordInventory.purpose}
                  </div>
                </div>
              </div>
              <div className={styles["box2_infim"]}>
                <table className={styles["List_infim"]}>
                  <tbody>
                    <tr className={styles["tr_infim"]}>
                      <th className={styles["centerinfim"]} rowSpan={2}>
                        STT
                      </th>
                      <th className={styles["centerinfim"]} rowSpan={2}>
                        Tên hàng hoá
                      </th>
                      <th className={styles["centerinfim"]} rowSpan={2}>
                        Mã hàng
                      </th>
                      <th className={styles["centerinfim"]} rowSpan={2}>
                        Đơn vị <div>tính</div>
                      </th>
                      <th className={styles["centerinfim"]} rowSpan={2}>
                        Đơn giá
                      </th>
                      <th className={styles["centerinfim"]} colSpan={3}>
                        Số Lượng
                      </th>
                      <th className={styles["centerinfim"]} rowSpan={2}>
                        Xử lý
                      </th>
                    </tr>
                    <tr className={styles["tr_infim"]}>
                      <th className={styles["centerinfim"]}>
                        Theo hệ <div>thống</div>
                      </th>
                      <th className={styles["centerinfim"]}>
                        Theo <div>kiểm kê</div>
                      </th>
                      <th className={styles["centerinfim"]}>
                        Chênh <div>Lệch</div>
                      </th>
                    </tr>

                    {recordInventory.products?.length > 0 &&
                      recordInventory.products?.map((item, index) => (
                        <tr key={item.productId?._id}>
                          <td>{index + 1}</td>
                          <td>{item.productId?.productName}</td>
                          <td>{item.productId?.productCode}</td>
                          <td>{item.productId?.productDVT}</td>
                          <td>{item.productId?.productPrice}</td>
                          <td>{item.numberOfSystem}</td>
                          <td>{item.numberOfReality}</td>
                          <td>{item.difference}</td>
                          <td>{item.solution ? item.solution : ""}</td>
                        </tr>
                      ))}
                    <tr className={styles["tr_infim"]}>
                      <th className={styles["sum_inf_1"]} colSpan={8}>
                        Tổng
                        <span className={styles["count_inf"]}>
                          {handleCountDifference()}
                        </span>
                      </th>
                      <th className={styles["sum_inf_2"]}></th>
                    </tr>
                  </tbody>
                </table>
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
                {recordInventory.userId?.fullName}
              </div>
              <div className={styles["out_inf"]}>
                {formatDate(recordInventory.createdAt)}
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
                {recordInventory.status === "CONFIRMED" &&
                  recordInventory.userEditStatus?.fullName}
              </div>
              <div className={styles["out_inf"]}>
                {recordInventory.status === "CONFIRMED" &&
                  formatDate(recordInventory.updatedAt)}
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
                {recordInventory.status === "REJECTED" &&
                  recordInventory.userEditStatus?.fullName}
              </div>
              <div className={styles["out_inf"]}>
                {recordInventory.status === "REJECTED" &&
                  formatDate(recordInventory.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default InfoInventory;
