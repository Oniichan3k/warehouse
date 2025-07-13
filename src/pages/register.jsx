import React, { useState } from "react";
import styles from './Register.module.css';;
import { ErrorMessage, Field, Form, Formik } from "formik";
import Header from "@/components/header/Header";
import { registerAPI } from "@/api/userAPI/user";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { registerValidation } from "@/utils/validation.js/userValidation";
import image4 from "@/assets/images/image4.png";
import Image from "next/image";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const initialValues = {
    fullName: "",
    email: "",
    staffCode: `${Math.floor(Math.random() * 1000000)}`,
    userName: "",
    password: "",
    role: "staff",
  };

  const handleSubmit = async (values) => {
    try {
      const user = await registerAPI(values);
      toast.success("Đăng ký thành công");
      if (typeof window !== 'undefined') {
        localStorage.setItem("userId", user.data.user._id);
        localStorage.setItem("email", user.data.user.email);
        localStorage.setItem("fullName", user.data.user.fullName);
      }
      router.push("/auth/confirmOTP");
    } catch (error) {
      toast.error("Đăng ký thất bại");
    }
  };


  const handleClickLogin = () => router.push("/login");
  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header />
      <div className={styles['register-body']}>
        <div className={styles['register-container']}>
          <div className={styles['register-form']}>
            <Formik
              initialValues={initialValues}
              validationSchema={registerValidation}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, errors, setFieldValue, values }) => (
                <Form onSubmit={handleSubmit}>
                  <h2 className={styles['register-h2']}>ĐĂNG KÝ TÀI KHOẢN</h2>
                  <div className={styles["register-group-field"]}>
                    <label htmlFor="fullName" className={styles["register-label"]}>
                      Họ tên đầy đủ
                    </label>
                    <br />
                    <Field
                      className={styles["register-Field"]}
                      name="fullName"
                      type="text"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </div>

                  <div className={styles["register-group-field"]}>
                    <label className={styles["register-label"]} htmlFor="email">
                      Email
                    </label>
                    <br />
                    <Field
                      className={styles["register-Field"]}
                      name="email"
                      type="email"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </div>

                  <div className={styles["register-group-field"]}>
                    <label className={styles["register-label"]} htmlFor="staffCode">
                      Mã nhân viên
                    </label>
                    <br />
                    <Field
                      className={styles["register-Field"]}
                      name="staffCode"
                      type="text"
                      placeholder=""
                      readOnly
                    />
                    <ErrorMessage
                      name="staffCode"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </div>

                  <div className={styles["register-group-field"]}>
                    <label className={styles["register-label"]} htmlFor="userName">
                      Tên đăng nhập
                    </label>
                    <br />
                    <Field
                      className={styles["register-Field"]}
                      name="userName"
                      type="text"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="userName"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </div>

                  <div className="register-group-field register-eye">
                    <label className={styles["register-label"]} htmlFor="password">
                      Mật khẩu
                    </label>
                    <br />
                    <Field
                      className={styles["register-Field"]}
                      name="password"
                      type={showPassword ? "text" : "password"}
                    />
                    <i
                      className={`register-eye-icon ${
                        showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                      }`}
                      onClick={tooglePasswordVisibility}
                    ></i>
                    <ErrorMessage
                      name="password"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </div>

                  <div className={styles["register-role"]}>
                    <div className={styles["register-role-group"]}>
                      <p>Nhân viên</p>
                      <input
                        type="radio"
                        name="role"
                        value="staff"
                        onChange={() => setFieldValue("role", "staff")}
                        checked={values.role === "staff"}
                      />
                    </div>
                    <div className={styles["register-role-group"]}>
                      <p>Quản lý</p>
                      <input
                        type="radio"
                        name="role"
                        value="manager"
                        onChange={() => setFieldValue("role", "manager")}
                        checked={values.role === "manager"}
                      />
                    </div>
                  </div>

                  <button className={styles["register-button"]} type="submit">
                    Đăng ký
                  </button>

                  <div className={styles["register-bonus"]}>
                    <p>
                      Bạn đã có tài khoản?{" "}
                      <span
                        className={styles["register-span"]}
                        onClick={handleClickLogin}
                      >
                        {" "}
                        Đăng nhập
                      </span>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className={styles["imagine"]}>
            <Image
  className={styles["imagine-img"]}
  src={image4}
  alt=""

/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
