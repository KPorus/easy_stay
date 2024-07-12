import Image from "next/image";
import styles from "./menu.module.scss";
import logo from "/public/images/logo1.png";
import Nav from './nav'
const index = () => {
  return (
    <div className={styles.menuContainer}>
      <Image
        src={logo}
        alt="logo"
        className={styles.menuLogo}
        priority
        width={100}
        height={100}
      />
      <Nav />
    </div>
  );
};

export default index;
