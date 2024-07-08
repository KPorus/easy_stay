import Link from "next/link";
import styles from "./nav.module.scss";
import logo from "/public/images/logo1.png";
import Image from "next/image";
import classNames from "classnames";

const navItems = [
  { title: "Home", href: "/home" },
  { title: "Products", href: "/products" },
  { title: "Reviews", href: "/reviews" },
  { title: "Settings", href: "/settings" },
];

const Nav = ({ isActive }: { isActive: boolean }) => {
  return (
    <div
      id="ts--mobile-nav"
      className={classNames(styles.menuListContainer, {
        [styles.menuListContainerActive]: isActive,
      })}
    >
      <ul className={styles.menuListBody}>
        <Image
          className={styles.navLogo}
          src={logo}
          alt="logo"
          style={{ width: "78px", height: "78px", cursor: "pointer" }}
          width={100}
          height={100}
        />
        {navItems.map((item) => (
          <li key={item.title}>
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;

