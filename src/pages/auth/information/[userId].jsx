import React, { useEffect, useState } from "react";
import { editProfile, getUserById, uploadAvatar } from "@/api/userAPI/user";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/router";
import styles from "./Information.module.css";
import Layout from "@/components/layout/Layout";
const Information = () => {
  const [userInf, setUserInf] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    staffCode: "",
    role: "",
    address: "",
    gender: "",
    startDate: "",
    avatar: "",
  });

  const [isRefresh, setIsRefresh] = useState(false);
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (!userId) return;
    const getUser = async () => {
      const respone = await getUserById(userId);
      const dateObj = new Date(respone.startDate);
      const day = dateObj.getUTCDate();
      const month = dateObj.getUTCMonth() + 1;
      const year = dateObj.getUTCFullYear();

      respone.startDate = `${day}/${month}/${year}`;
      setUserInf({
        fullName: respone.fullName,
        userName: respone.userName,
        email: respone.email,
        phoneNumber: respone.phoneNumber,
        staffCode: respone.staffCode,
        role: respone.role,
        address: respone.address,
        gender: respone.gender,
        startDate: respone.startDate,
        avatar: respone.avatar,
      });

      setAvatar(respone.avatar);

      dispatch(setUser(respone));
    };

    getUser();
  }, [isRefresh, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInf({
      ...userInf,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    console.log(userInf);
    await editProfile(userInf, userId);
    toast.success("Cập nhật thông tin thành công");
    setIsRefresh(!isRefresh);
    router.push("/");
  };

  const handleCancel = () => {
    setIsRefresh(!isRefresh);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);

    await uploadAvatar(file, userId);
    toast.success("Cập nhật ảnh đại diện thành công");
    setIsRefresh(!isRefresh);
  };

  return (
    <Layout>
    <div>
      <div className={styles["infoBody"]}>
        <div className={styles["infoAvatar"]}>
          <img className={styles["infoImage"]} src={avatar} alt="" />
          <label
            style={{
              marginLeft: "80%",
              marginTop: "-30px",
              borderRadius: "50%",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            />
            <i
              className={styles["fa-solid fa-pen"]}
              style={{
                color: "black",
                cursor: "pointer",
              }}
            ></i>
          </label>
          <p className={styles["infoUsername"]}>
            <b>{userInf.userName}</b>
          </p>
        </div>
        <div className={styles["infoContainer"]}>
          <div className={styles["inforForm"]}>
            <h2 className={styles["info-h2"]}>THÔNG TIN CÁ NHÂN</h2>
            <div className={styles["info-group-field"]}>
              <label className={styles["info-label"]} htmlFor="infoFullName">
                Họ và tên
              </label>
              {/* <input className={styles["info-input" type="text" /> */}
              <input
                className={styles["info-input"]}
                value={userInf.fullName}
                name="fullName"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles["info-group-field"]}>
              <label className={styles["info-label"]} htmlFor="infoEmail">
                Email
              </label>
              {/* <input className={styles["info-input" type="text" /> */}
              <input
                className={styles["info-input"]}
                value={userInf.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles["info-group-field"]}>
              <label className={styles["info-label"]} htmlFor="infoPhone">
                Số điện thoại
              </label>
              {/* <input className={styles["info-input" type="text" /> */}
              <input
                className={styles["info-input"]}
                value={userInf.phoneNumber}
                name="phoneNumber"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles["info-group-field"]}>
              <label className={styles["info-label"]} htmlFor="infoStaffCode">
                Mã nhân viên
              </label>
              {/* <input className={styles["info-input" type="text" /> */}
              <input
                className={styles["info-input"]}
                value={userInf.staffCode}
                readOnly
              />
            </div>
            <div className={styles["info-group-field"]}>
              <label className={styles["info-label"]} htmlFor="infoPosition">
                Chức vụ
              </label>
              {/* <input className={styles["info-input" type="text" /> */}
              <input
                className={styles["info-input"]}
                value={userInf.role == "manager" ? "Quản lý" : "Nhân viên"}
                readOnly
              />
            </div>
            <div className={styles["info-group-field"]}>
              <label className={styles["info-label"]} htmlFor="infoAddress">
                Địa chỉ
              </label>
              {/* <input className={styles["info-input" type="text" /> */}
              <input
                className={styles["info-input"]}
                value={userInf.address}
                name="address"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles["info-group-field"]}>
              <label className={styles["info-label"]} htmlFor="infoGender">
                Giới tính
              </label>
              <select
                name="gender"
                onChange={(e) => handleChange(e)}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid #dedbdb",
                  padding: "0 20px",
                }}
              >
                <option>
                  {userInf.gender === "male"
                    ? "Nam"
                    : userInf.gender === "fermale"
                    ? "Nữ"
                    : "Khác"}
                </option>
                <option value="male">Nam</option>
                <option value="fermale">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div className={styles["info-group-field"]}>
              <label className={styles["info-label"]} htmlFor="infoDate">
                Ngày vào làm
              </label>
              {/* <input className={styles["info-input" type="text" /> */}
              <input
                className={styles["info-input"]}
                value={userInf.startDate}
                readOnly
              />
            </div>

            <div className={styles["button-section"]}>
              <button
                className={styles["cancel-button"]}
                onClick={handleCancel}
              >
                Hủy
              </button>
              <button
                className={styles["save-button"]}
                type="submit"
                onClick={handleUpdate}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Information;
