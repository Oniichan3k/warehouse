import React from 'react';
import styles from './Header.module.css';
import { logout } from '@/api/userAPI/user';
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import Image from 'next/image';

const Header = ({ isOpen, setIsOpen }) => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      logout();
      toast.success('Đăng xuất thành công');
      router.push('/login');
    } catch (error) {
      toast.error('Đăng xuất thất bại');
    }
  };

  const handleMenuClick = () => {
    if (typeof setIsOpen === "function") setIsOpen(prev => !prev);
  };

  return (
    <div className={styles.headercontaint}>
      <Image src="/img/login/Rectangle 36.png" alt="header-bg" fill className={styles.headerbg} />
      <span className={styles.menuToggle} onClick={handleMenuClick} tabIndex={0} role="button" style={{ marginLeft: "20px", display: "flex", alignItems: "center", cursor: "pointer", zIndex: 2 }}>

      </span>
      <p className={styles.tenheader}>

      </p>
      <div className={styles.iconheader}>
        <span className={styles.iconGroup} style={{display: 'flex', alignItems: 'center', gap: 6}}>
          <Image src="/img/login/Group 22.png" alt="Thông báo" width={28} height={28} />

        </span>
        <span className={styles.logout} onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 6 }}>
          <Image src="/img/login/Frame 37.png" alt="Đăng xuất" width={28} height={28} />
 
        </span>
      </div>
    </div>
  );
};

export default Header;