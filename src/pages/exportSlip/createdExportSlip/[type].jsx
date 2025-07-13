import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import recycle from "@/assets/images/bin.png";
import styles from "./CreatedExportSlip.module.css";
import { searchSupply } from "@/api/suppliesAPI/supply";
import { createdContract } from "@/api/contractApi/contract";
import { createdExportSlip } from "@/api/exportSlipApi/exportSlip";
import { formatCurrency } from "@/utils/function/slipFuntion";
import DLFromLocal from "@/components/downloadProduct/downloadProductFromLocal/DLFromLocal";
import Layout from "@/components/layout/Layout";

const CreatedExportSlip = () => {
  const router = useRouter();
  const { type } = router.query;
  const [showUploadFromLocal, setShowUploadFromLocal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [listProvider, setListProvider] = useState([]);
  const [providerInfor, setProviderInfor] = useState({
    providerCode: "",
    providerPhone: "",
    providerAddress: "",
  });

  const [isRefresh, setIsRefresh] = useState(false);

  const user = useSelector((state) => state.user);
  const [newExportSlip, setNewExportSlip] = useState({
    exportSlipCode: `PNK${Math.floor(Math.random() * 1000000)}`,
    providerId: "",
    userId: user._id,
    status: "PENDING",
    products: [],
    newProducts: [],
    contracts: "",
    type: type,
    reason: "",
    exportPrice: "0",
  });

  const [contract, setContract] = useState({
    contractContent: "",
    contractMedia: [],
  });

  const handleCancelUploadLocal = () => {
    setShowUploadFromLocal(false);
  };

  useEffect(() => {
    if (!type || (type !== "Provider" && type !== "Agency")) {
      setListProvider([]);
      return;
    }
    const getProvider = async () => {
      let res;
      try {
        if (type === "Provider") {
          res = await searchSupply("", "", "", "provider", 1, 100);
        } else if (type === "Agency") {
          res = await searchSupply("", "", "", "agency", 1, 100);
        }
        if (res && Array.isArray(res.supplies)) {
          setListProvider(res.supplies);
        } else {
          setListProvider([]);
        }
      } catch (error) {
        setListProvider([]);
        toast.error("Không lấy được danh sách nguồn nhận!");
      }
    };
    getProvider();
  }, [type]);


  useEffect(() => {
    setNewExportSlip({
      ...newExportSlip,
      products: selectedProducts.map((product) => ({
        productId: product._id,
        quantity: 0,
        discount: 0,
      })),
    });
  }, [isRefresh]);

  const handleChangeProvider = (e) => {
    const { name, value } = e.target;
    setNewExportSlip({ ...newExportSlip, [name]: value });

    const provider = listProvider.find((p) => p._id === value);
    if (provider) {
      setProviderInfor({
        providerCode: provider.providerCode || provider.agencyCode,
        providerPhone: provider.providerPhone || provider.agencyPhone,
        providerAddress: provider.providerAddress || provider.agencyAddress,
      });
    }
  };

  const handleChangeField = (e, productId) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      setNewExportSlip((prev) => ({
        ...prev,
        products: prev.products.map((p) => {
          if (p.productId === productId) {
            return { ...p, quantity: parseInt(value) || 0 };
          }
          return p;
        }),
      }));
    }

    if (name === "discount") {
      const discountValue = value.replace("%", "");
      const newDiscount = parseInt(discountValue) || 0;
      setNewExportSlip((prev) => ({
        ...prev,
        products: prev.products.map((p) => {
          if (p.productId === productId) {
            return { ...p, discount: newDiscount };
          }
          return p;
        }),
      }));
    }
  };

  const calculateLineTotal = (product) => {
    const item = newExportSlip.products.find(
      (p) => p.productId === product._id
    );
    if (item) {
      return +product.productPrice * item.quantity * (1 - item.discount / 100);
    } else {
      return 0;
    }
  };

  const calculateTotalPrice = useMemo(() => {
    return newExportSlip.products.reduce((total, product) => {
      const productPrice = selectedProducts.find(
        (p) => p._id === product.productId
      )?.productPrice;
      return (
        total + +productPrice * product.quantity * (1 - product.discount / 100)
      );
    }, 0);
  }, [newExportSlip.products, selectedProducts]);

  useEffect(() => {
    setNewExportSlip((prev) => ({
      ...prev,
      exportPrice: `${calculateTotalPrice}`,
    }));
  }, [calculateTotalPrice]);

  const handleFileChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    const newRawFile = [...contract.contractMedia, ...selectedFile];
    setContract({ ...contract, contractMedia: newRawFile });
    setFileNames([...fileNames, ...selectedFile.map((file) => file.name)]);
  };

  const handleChangeFileNameContract = (e) => {
    const updateFileNames = e.target.value.split(", ").map((name) => name);
    const removeFiles = fileNames.filter(
      (name) => !updateFileNames.includes(name)
    );

    const updateContractMedia = contract.contractMedia.filter(
      (file) => !removeFiles.includes(file.name)
    );
    setContract({ ...contract, contractMedia: updateContractMedia });
  };

  const handleSubmit = async () => {
    try {
      const newContract = await createdContract(contract);
      const data = {
        ...newExportSlip,
        contracts: newContract.newContract._id,
      };
      if (!data.newProducts || data.newProducts.length === 0) {
        delete data.newProducts;
      }

      await createdExportSlip(data);
      toast.success("Tạo phiếu xuất kho thành công");
      router.push(`/exportSlip/listExportSlip/${type}`);
    } catch (error) {
      toast.error("Tạo phiếu xuất kho thất bại");
    }
  };

  const handleCancelCreateExportSlip = () => {
    router.push(`/exportSlip/listExportSlip/${type}`);
  };
  const handleDeleteProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  return (
    <>
      <Layout>
        <div className={styles["content-container-createdImportSlip"]}>
          <div className={styles["right-content"]}>
            <div className={styles["navigation-path"]}>
              <span onClick={() => router.push(`/exportSlip/listExportSlip/${type}`)}>
                Xuất - nhập với{" "}
                {(type === "Provider" && "NCC") ||
                  (type === "Agency" && "Nội bộ")}
              </span>
              &gt; Tạo mới phiếu xuất kho
            </div>

            <div className={styles["action-buttons"]}>
              <button
                className={styles["add-button system"]}
                onClick={() => setShowUploadFromLocal(true)}
              >
                + Thêm hàng từ hệ thống
              </button>
            </div>

            <div className={styles["form-container-createdImport"]}>
              <h2 className={styles["form-title"]}>PHIẾU XUẤT KHO</h2>

              <div className={styles["form-section"]}>
                <div className={styles["info-section"]}>
                  <h3>Thông tin chung</h3>
                  <div className={styles["form-grid"]}>
                    <div className={styles["form-group-create"]}>
                      <label>Nguồn nhận</label>
                      <select
                        className={styles["nguon-nhan"]}
                        name="providerId"
                        onChange={handleChangeProvider}
                      >
                        <option value="">-Chọn nguồn nhận-</option>
                        {listProvider.length > 0 &&
                          listProvider.map((provider) => (
                            <option key={provider._id} value={provider._id}>
                              {provider.providerName || provider.agencyName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className={styles["form-group"]}>
                      <label>Mã phiếu</label>
                      <input
                        name="idSlip"
                        style={{ backgroundColor: "darkgray" }}
                        value={newExportSlip.exportSlipCode}
                        readOnly
                      />
                    </div>
                    <div className={styles["form-group short-input"]}>
                      <label>Mã nguồn</label>
                      <input
                        style={{
                          width: "100%",
                          height: "40px",
                          paddingLeft: "10px",
                        }}
                        name="providerCode"
                        value={providerInfor.providerCode}
                        readOnly
                      />
                    </div>
                    <div className={styles["form-group short-input"]}>
                      <label>Số điện thoại</label>
                      <input
                        type="text"
                        value={providerInfor.providerPhone}
                        readOnly
                      />
                    </div>
                    <div className={styles["form-group"]}>
                      <label>Địa chỉ</label>
                      <textarea
                        rows="5"
                        value={providerInfor.providerAddress}
                        readOnly
                      />
                    </div>
                    <div className={styles["form-group"]}>
                      <label>Lý do xuất</label>
                      <textarea
                        rows="5"
                        value={newExportSlip.reason}
                        name="reason"
                        onChange={(e) =>
                          setNewExportSlip({
                            ...newExportSlip,
                            reason: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className={styles["table-section"]}>
                  <table className={styles.customTable}>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên hàng hóa</th>
                        <th>Mã hàng</th>
                        <th>Đơn vị tính</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Chiết khấu</th>
                        <th>Thành tiền</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProducts.length > 0 &&
                        selectedProducts.map((product, index) => (
                          <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.productName}</td>
                            <td>{product.productCode}</td>
                            <td>{product.productDVT}</td>
                            <td>{formatCurrency(product.productPrice)}</td>
                            <td>
                              <input
                                type="number"
                                name="quantity"
                                onChange={(e) =>
                                  handleChangeField(e, product._id)
                                }
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  border: "none",
                                }}
                                placeholder="nhập số lượng"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="discount"
                                onChange={(e) =>
                                  handleChangeField(e, product._id)
                                }
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  border: "none",
                                }}
                                placeholder="nhập % chiết khấu"
                              />
                            </td>
                            <td>
                              {formatCurrency(calculateLineTotal(product))}
                            </td>
                            <td>
                              <button
                                className={styles["delete-button"]}
                                onClick={() => handleDeleteProduct(product._id)}
                                type="button"
                                title="Xóa"
                              >
                                <Image
                                  src={recycle}
                                  alt="Xóa"
                                  className={styles["bin"]}
                                />
                              </button>
                            </td>

                          </tr>
                        ))}
                      <tr className={styles["total-row"]}>
                        <td colSpan="7">Tổng</td>
                        <td>{formatCurrency(calculateTotalPrice)}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={styles["attachment-section"]}>
                  <div className={styles["contract-section"]}>
                    <h3>Hợp đồng</h3>
                    <div className={styles["upload-group"]}>
                      <div className={styles["form-group"]}>
                        <label>Nội dung</label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setContract({
                              ...contract,
                              contractContent: e.target.value,
                            })
                          }
                        />
                      </div>
                      <br />
                      <div className={styles["form-group-upload"]}>
                        <label>Hình ảnh</label>
                        <div className={styles["input-upload"]}>
                          <input
                            className={styles["input-file-name"]}
                            type="url"
                            value={fileNames.join(", ")}
                            onChange={(e) => handleChangeFileNameContract(e)}
                          />

                          <label
                            style={{
                              width: "auto",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              gap: "8px",
                              background: "#f3f3f3",
                              borderRadius: "8px",
                              padding: "0 12px",
                              fontWeight: 500,
                              fontSize: "16px"
                            }}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              multiple
                              onChange={handleFileChange}
                            />
                            <i className={styles["fa-solid fa-cloud-arrow-up"]}></i>
                            <span>Ảnh</span>
                          </label>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles["button-section"]}>
                  <button
                    className={styles["cancel-button"]}
                    onClick={handleCancelCreateExportSlip}
                  >
                    Hủy
                  </button>
                  <button
                    className={styles["save-button"]}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showUploadFromLocal && (
          <div className={styles["overlay"]} onClick={handleCancelUploadLocal}>
            <motion.div
              className={styles["item-upload"]}
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scal: 1 }}
              initial={{ opacity: 0, scal: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <DLFromLocal
                onCancel={handleCancelUploadLocal}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
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

export default CreatedExportSlip;
