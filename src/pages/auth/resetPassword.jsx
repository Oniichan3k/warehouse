import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Header from "@/components/header/Header";
import { useRouter } from "next/router";
import { updatePassword } from "@/api/userAPI/user";
import { toast } from "react-toastify";
import { resetPasswordValidation } from "@/utils/validation.js/userValidation";
const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: "",
    userName: "",
    newPassword: "",
  };

  const handleSubmit = async (values) => {
    try {
      await updatePassword(values);
      toast.success("Đổi mật khẩu thành công");
      router.push("/login");
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại");
    }
  };

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header />

      <div className={styles["resetPasswordBody"]}>
        <div className={styles["ResetPasswordcontent"]}>
          <Formik
            initialValues={initialValues}
            validationSchema={resetPasswordValidation}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, errors }) => (
              <Form onSubmit={handleSubmit}>
                <h1 className={styles["reset-name"]}>Đổi Mật Khẩu</h1>
                <div className={styles["reset-form-group"]}>
                  <label htmlFor="email" className={styles["reset-label"]}>
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={styles["reset-input"]}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles["error"]}
                  />
                </div>
                <div className={styles["reset-form-group"]}>
                  <label htmlFor="userName" className={styles["reset-label"]}>
                    Tên Đăng Nhập
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="userName"
                    className={styles["reset-input"]}
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className={styles["error"]}
                  />
                </div>
                <div className={styles["reset-form-group reset-password"]}>
                  <label
                    htmlFor="newPassword"
                    className={styles["reset-label"]}
                  >
                    Mật Khẩu Mới
                  </label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    className={styles["reset-input"]}
                  />
                  <i
                    className={`${styles["reset-eye-icon"]} ${
                      showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                    }`}
                    onClick={tooglePasswordVisibility}
                  />

                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className={styles["error"]}
                  />
                </div>
                <button type="submit" className={styles["reset-btn"]}>
                  Đổi Mật Khẩu
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
