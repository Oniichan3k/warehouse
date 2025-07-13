import React from "react";

import styles from "./TableReport.module.css";
const TableReport = ({ list }) => {
  return (
    <div className={styles["rtbody"]}>
      <div className={styles["rtTable"]}>
        <table className={styles["rtInside"]}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Mã sản phẩm</th>
              <th>Số lượng nhập</th>
              <th>Số lượng xuất</th>
              <th>Số lượng tồn</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length > 0 &&
              list.map((item, index) => (
                <tr key={item.productId || index}>
                  <td className={styles["rtnum"]}>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.productCode}</td>
                  <td className={styles["rtnum"]}>{item.importQuantity}</td>
                  <td className={styles["rtnum"]}>{item.exportQuantity}</td>
                  <td className={styles["rtnum"]}>{item.inventoryQuantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default TableReport;
