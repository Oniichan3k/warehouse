import React from "react";

import styles from "./ConfirmDeleteProduct.module.css";
import { deleteProduct } from "@/api/productAPI/product";
import { toast } from "react-toastify";
import { deleteSupply } from "@/api/suppliesAPI/supply";
import { deletedImportSlip } from "@/api/importSlipApi/importSlip";
import { deletedExportSlip } from "@/api/exportSlipApi/exportSlip";
import { deletedRecordInventory } from "@/api/recordInventoryApi/recordInventory";

const ConfirmDeleteProduct = ({
  type,
  onCancel,
  id,
  isRefresh,
  setIsRefresh,
}) => {
  const handleAgree = async () => {
    if (type === "deletedProduct") {
      try {
        await deleteProduct(id);
        onCancel();
        toast.success("Xoá hàng hóa thành công");
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "agency" || type === "provider") {
      try {
        await deleteSupply(type, id);
        onCancel();
        toast.success("Xoá nguồn hàng thành công");
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "importSlip") {
      try {
        await deletedImportSlip(id);
        onCancel();
        toast.success("Xoá phiếu nhập thành công");
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "exportSlip") {
      try {
        await deletedExportSlip(id);
        onCancel();
        toast.success("Xoá phiếu xuất thành công");
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "recordInventory") {
      try {
        await deletedRecordInventory(id);
        onCancel();
        toast.success("Xoá phiếu kiểm kê thành công");
      } catch (error) {
        console.log(error);
      }
    }
    setIsRefresh(!isRefresh);
  };

  return (
    <div className={styles["body"]}>
      <div className={styles["frame"]}>
        <span className={styles["close"]} onClick={() => onCancel()}>
          {" "}
          &times;{" "}
        </span>
        <p>Bạn chắc chắn muốn xoá?</p>
        <div className={styles["btn-confirm-deleted"]}>
          <button className={styles["confirm"]} onClick={() => handleAgree()}>
            Đồng ý
          </button>
          <button className={styles["cancel"]} onClick={() => onCancel()}>
            Huỷ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteProduct;
