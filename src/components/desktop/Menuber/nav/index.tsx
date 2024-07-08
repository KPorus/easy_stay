import Link from "next/link";
import styles from "./nav.module.scss";

const navItems = [
  {
    title: "Home",
    href: "/home",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Reviews",
    href: "/reviews",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];

const Index = () => {
  return (
    <div
      id="ts--desktop-nav"
      className={styles.menuListContainer}
    >
      <ul className={styles.menuListBody}>
        {navItems.map((item) => (
          <li key={item.title}>
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
