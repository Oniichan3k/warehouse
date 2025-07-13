import React, { useState } from "react";
import styles from "./Login.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login } from "@/api/userAPI/user";
import { toast } from "react-toastify";
import { setUser } from "@/store/userSlice";
import { loginValidation } from "@/utils/validation.js/userValidation";
import Header from "@/components/header/Header";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const initialValues = {
    userName: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const user = await login(values);
      toast.success("Đăng nhập thành công");
      dispatch(setUser(user));
      router.push("/");
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }
  };

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClickForgetPassword = () => {
    router.push("/auth/forgetPassword");
  };

  return (
    <>
      <Header />
      <div className={styles["login-body"]}>
        <div className={styles["login-contain"]}>
          <div className={styles["login-left"]}>
            <Image
              src="/img/login/image 4.png"
              alt="login-visual"
              className={styles["login-image"]}
              width={400}
              height={400}
              priority
            />
          </div>
          <div className={styles["login-right"]}>
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidation}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <div className={styles["login-h1"]}>
                    ĐĂNG NHẬP VÀO TÀI KHOẢN
                  </div>
                  <div className={styles["login-group"]}>
                    <label htmlFor="userName" className={styles["login-label"]}>
                      Tên đăng nhập:
                    </label>
                    <Field
                      name="userName"
                      className={styles["login-input"]}
                      type="text"
                    />
                    <ErrorMessage
                      name="userName"
                      style={{ color: "red", fontSize: "12px" }}
                      component="div"
                    />
                  </div>
                  <div className={styles["login-group login-eye"]}>
                    <label htmlFor="password" className={styles["login-label"]}>
                      Mật khẩu:
                    </label>
                    <Field
                      name="password"
                      className={styles["login-input"]}
                      type={showPassword ? "text" : "password"}
                    />
                    <i
                      className={`${styles["login-eye-icon"]} ${showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                        }`}
                      onClick={tooglePasswordVisibility}
                    />
                    <ErrorMessage
                      name="password"
                      style={{ color: "red", fontSize: "12px" }}
                      component="div"
                    />
                  </div>
                  <div className={styles["login-s3"]}>
                    <div className={styles["rememberPW"]}>
                      <input
                        type="checkbox"
                        name="recomendPassword"
                        id="login-radio"
                      />
                      <label
                        htmlFor="recomendPassword"
                        className={styles["login-label"]}
                      >
                        Ghi nhớ tôi
                      </label>
                    </div>
                    <div className={styles["forgetPW"]}>
                      <span
                        className={styles["foget-text"]}
                        onClick={handleClickForgetPassword}
                      >
                        Quên mật khẩu?
                      </span>
                    </div>
                  </div>
                  <div className={styles["login-btn"]}>
                    <button type="submit" className={styles.loginBTN}>ĐĂNG NHẬP</button>
                  </div>
                  <div className={styles["login-register"]}>
                    <span>Bạn chưa có tài khoản?</span>
                    <button
                      type="button"
                      className={styles["register-btn"]}
                      onClick={() => router.push("/register")}
                    >
                      Đăng ký
                    </button>
                  </div>

                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
