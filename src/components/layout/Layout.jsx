import Header from "@/components/header/Header";
import NavBar from "@/components/navBar/NavBar";
import React, { useState } from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div className={styles["layout-h"]}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className={isOpen ? styles["layout-n"] : styles["layout-n"] + " " + styles["closed"]}>
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <main
        className={isOpen ? styles["layout-m"] : styles["layout-m"] + " " + styles["full"]}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;