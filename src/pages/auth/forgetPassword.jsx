import React from "react";
import styles from "./ForgetPassword.module.css";
import Header from "@/components/header/Header";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { forgetPassword } from "@/api/userAPI/user";
import { toast } from "react-toastify";
import { forgetPasswordValidation } from "@/utils/validation.js/userValidation";

const ForgetPassword = () => {
  const initialState = { email: "", userName: "" };

  const handleSubmit = async (values) => {
    try {
      await forgetPassword(values);
      toast.success(
        "Gửi lại mật khẩu thành công. Vui lòng kiểm tra email của bạn"
      );
    } catch (error) {
      toast.error("Gửi lại mật khẩu thất bại");
    }
  };

  return (
    <div>
      <Header />
      <Formik
        initialValues={initialState}
        validationSchema={forgetPasswordValidation}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className={styles["main-content"]}>
              <div className={styles["form-card"]}>
                <h2 className={styles["form-title"]}>QUÊN MẬT KHẨU</h2>
                <div className={styles["form-group-fogot"]}>
                  <label htmlFor="email" className={styles["foget-label"]}>
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={styles["foget-input"]}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red", fontSize: "12px" }}
                  />
                </div>
                <div className={styles["form-group-fogot"]}>
                  <label htmlFor="userName" className={styles["foget-label"]}>
                    Tên đăng nhập
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="userName"
                    className={styles["foget-input"]}
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    style={{ color: "red", fontSize: "12px" }}
                  />
                </div>
                <button type="submit" className={styles["submit-btn"]}>
                  Gửi lại mật khẩu
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPassword;
