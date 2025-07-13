import React, { useEffect, useState } from "react";

import styles from "./InforProduct.module.css";
import { useRouter } from "next/router";
import { getProductById } from "@/api/productAPI/product";
import Layout from "@/components/layout/Layout";

const InforProduct = () => {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    if (!productId) return;
    const getProduct = async () => {
      const res = await getProductById(productId);
      setProduct(res.product);
    };
    getProduct();
  }, [productId]);

  const handleClickEdit = () => {
    router.push(`/product/editProduct/${productId}`);
  };

  return (
    <>
      <Layout>
        <div className={styles["container_editPro"]}>
          <div className={styles["h1_editPro"]}>
            <p className={styles["text_1"]}>
              <span onClick={() => router.push("/product/listProduct")}>
                Quản lí danh mục hàng hóa
              </span>
              <span>
                <i
                  className={styles["fa-solid fa-chevron-right"]}
                  style={{ color: "black" }}
                />
              </span>{" "}
              <span>Xem hàng hóa</span>
            </p>
            <button
              type="submit"
              className={styles["buton_h1"]}
              onClick={handleClickEdit}
            >
              Cập nhật thông tin
            </button>
          </div>
          <div className={styles["h2_editPro"]}>
            <div className={styles["sub1_editPro"]}>
              <p className={styles["text_sub1_editPro"]}>Thông tin hàng hóa</p>
              <i
                className={styles["fa-solid fa-x"]}
                onClick={() => navigate("/listProduct")}
              ></i>
            </div>
            <div className={styles["sub2_editPro"]}>
              <div className={styles["idpro"]}>
                <label htmlFor="mh">Mã hàng </label>
                <div
                  className={styles["input_editPro"]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productCode}
                </div>
              </div>
              <div className={styles["namepro"]}>
                <label htmlFor="th">Tên hàng</label>
                <div
                  className={styles["input_editPro"]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productName}
                </div>
              </div>
              <div className={styles["grouppro"]}>
                <label htmlFor="nh">Nhóm hàng</label>
                <div
                  className={styles["input_editPro"]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productGroup}
                </div>
              </div>
              <div className={styles["grouppro"]}>
                <label htmlFor="productPrice">Giá</label>
                <div
                  className={styles["input_editPro"]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productPrice}
                </div>
              </div>
              <div className={styles["image_prod"]}>
                <label htmlFor="">Hình ảnh</label> <br />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {product.productMedia &&
                    product.productMedia.map((item, index) => (
                      <img
                        className={styles["image_ip"]}
                        src={item}
                        alt=""
                        key={index}
                        style={{ width: "200px", height: "200px" }}
                      />
                    ))}
                </div>
              </div>

              <div className={styles["unit"]}>
                <label htmlFor="dv">Đơn vị tính</label>
                <br />
                <br />
                <div
                  className={styles["input_editPro"]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productDVT}
                </div>
              </div>
              <div className={styles["describe_editPro"]}>
                <label htmlFor="mt">Mô tả hàng hóa</label>
                <br />
                <br />
                <div
                  className={styles["mota_editpro"]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default InforProduct;
