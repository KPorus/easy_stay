"use client";
import Nav from "./nav/";
import styles from "./MMenu.module.scss";
import Image from "next/image";
import logo from "/public/images/logo1.png";
import { useEffect, useState } from "react";
import { handleHtmlBodyOverFlow } from "@/utils/ShearedFunction";

const Menu = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    handleHtmlBodyOverFlow(isActive);
    return () => {
      handleHtmlBodyOverFlow(isActive);
    };
  }, [isActive]);

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuBody}>
        <div
          onClick={() => setIsActive(!isActive)}
          className={styles.button}
        >
          <div
            className={`${styles.hamburger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </div>
        <Image
          src={logo}
          alt="logo"
          style={{ width: "78px", height: "78px", cursor: "pointer" }}
          width={100}
          height={100}
        />
      </div>
      {isActive && (
        <div
          onClick={() => setIsActive(!isActive)}
          className={styles.backCover}
        ></div>
      )}
      <Nav isActive={isActive} />
    </div>
  );
};

export default Menu;
