import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

const NavBar = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state) => state.user);
  const router = useRouter();


  const [openMenu, setOpenMenu] = useState(null);

  const handleClickProfile = () => {
    const userId = user._id;
    router.push(`/auth/information/${userId}`);
  };

  const isActive = (path) => router.pathname === path ? styles.active : "";

  const handleToggleMenu = (menuKey) => {
    setOpenMenu(openMenu === menuKey ? null : menuKey);
  };

  return (
    <div className={styles.main} style={{ display: isOpen ? "block" : "none" }}>
      <div className={styles.navBar}>

        <div className={styles.navBarUser}>
          <div className={styles.userAvt}>
            <img src={user.avatar} alt="avatar" onClick={handleClickProfile} />
          </div>
          <div className={styles.userName} onClick={handleClickProfile}>
            {user.fullName || user.userName}
          </div>
        </div>
        <hr className={styles.hr} />

        <div className={styles.navBarMenu}>
          <div className={styles.navBarMenuItem}>
            <p
              onClick={() => router.push("/")}
              className={isActive("/")}
            >
              <Image src="/img/homepage/Group 45.png" alt="overview" width={22} height={22} style={{marginRight: 8}} /> Tổng quan
            </p>
          </div>

          <div className={styles.navBarMenuItem}>
            <div className={styles.menuItemTitle}>
              <p
                onClick={() => handleToggleMenu("ncc")}
                style={{ cursor: "pointer" }}
              >
                <Image src="/img/homepage/Component 11.png" alt="icon" width={20} height={20} style={{marginRight: 8}} /> Xuất - nhập với NCC
              </p>
              {openMenu === "ncc" && (
                <>
                  <div className={styles.subMenu}>
                    <div className={styles.subMenuItem}>
                      <p>
                        <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Xuất kho
                      </p>
                    </div>
                    <p
                      className={`${styles.subMenuItem} ${isActive("/exportSlip/listExportSlip/Provider")}`}
                      onClick={() => router.push("/exportSlip/listExportSlip/Provider")}
                    >
                      <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Phiếu xuất kho
                    </p>
                  </div>
                  <div className={styles.subMenu}>
                    <div className={styles.subMenuItem}>
                      <p>
                        <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Nhập kho
                      </p>
                    </div>
                    <p
                      className={`${styles.subMenuItem} ${isActive("/importSlip/listImportSlip/Provider")}`}
                      onClick={() => router.push(`/importSlip/listImportSlip/Provider`)}
                    >
                      <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Phiếu nhập kho
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>


          <div className={styles.navBarMenuItem}>
            <div className={styles.menuItemTitle}>
              <p
                onClick={() => handleToggleMenu("nvbh")}
                style={{ cursor: "pointer" }}
              >
                <Image src="/img/homepage/Component 11.png" alt="icon" width={20} height={20} style={{marginRight: 8}} /> Xuất - nhập với NVBH
              </p>
              {openMenu === "nvbh" && (
                <>
                  <div className={styles.subMenu}>
                    <div className={styles.subMenuItem}>
                      <p>
                        <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Xuất kho
                      </p>
                    </div>
                    <p
                      className={`${styles.subMenuItem} ${isActive("/exportSlip/listExportSlip/Agency")}`}
                      onClick={() => router.push(`/exportSlip/listExportSlip/Agency`)}
                    >
                      <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Phiếu xuất kho
                    </p>
                  </div>
                  <div className={styles.subMenu}>
                    <div className={styles.subMenuItem}>
                      <p>
                        <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Nhập kho
                      </p>
                    </div>
                    <p
                      className={`${styles.subMenuItem} ${isActive("/importSlip/listImportSlip/Agency")}`}
                      onClick={() => router.push(`/importSlip/listImportSlip/Agency`)}
                    >
                      <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Phiếu nhập kho
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>


          <div className={styles.navBarMenuItem}>
            <p
              onClick={() => router.push("/inventory/listInventory")}
              className={isActive("/inventory/listInventory")}
            >
              <Image src="/img/homepage/Group 5 (1).png" alt="inventory" width={20} height={20} style={{marginRight: 8}} /> Quản lý kiểm kê
            </p>
          </div>


          <div className={styles.navBarMenuItem}>
            <div className={styles.menuItemTitle}>
              <p
                onClick={() => handleToggleMenu("report")}
                style={{ cursor: "pointer" }}
              >
                <Image src="/img/homepage/Group 4.png" alt="report" width={20} height={20} style={{marginRight: 8}} /> Báo cáo thống kê
              </p>
              {openMenu === "report" && (
                <div className={styles.subMenu}>
                  <div className={styles.subMenuItem}>
                    <p
                      onClick={() => router.push("/report/reportImport")}
                      className={isActive("/report/reportImport")}
                    >
                      <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Báo cáo nhập kho
                    </p>
                    <p
                      onClick={() => router.push("/report/reportInventory")}
                      className={isActive("/report/reportInventory")}
                    >
                      <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Báo cáo tồn kho
                    </p>
                    <p
                      onClick={() => router.push("/report/reportEII")}
                      className={isActive("/report/reportEII")}
                    >
                      <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Báo cáo xuất nhập tồn
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

   
          <div className={styles.navBarMenuItem}>
            <div className={styles.menuItemTitle}>
              <p
                onClick={() => handleToggleMenu("category")}
                style={{ cursor: "pointer" }}
              >
                <Image src="/img/homepage/Group 3.png" alt="category" width={20} height={20} style={{marginRight: 8}} /> Danh mục
              </p>
              {openMenu === "category" && (
                <div className={styles.subMenu}>
                  <div className={styles.subMenuItem}>
                    <p
                      onClick={() => router.push("/agency/listAgency")}
                      className={isActive("/agency/listAgency")}
                    >
                      <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Nguồn hàng xuất/nhập
                    </p>
                    <p
                      onClick={() => router.push("/product/listProduct")}
                      className={isActive("/product/listProduct")}
                    >
                      <Image src="/img/homepage/Vector 9.png" alt="arrow" width={12} height={12} style={{marginRight: 6}} /> Danh mục hàng hóa
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
