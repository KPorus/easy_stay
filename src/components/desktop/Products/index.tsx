"use client";
import Button from "@/sheared/Desktop/Button";
import styles from "./products.module.scss";
import { useState } from "react";
import Input from "@/sheared/Desktop/Input/Input";
import Model from "./Model";
const Index = () => {
  const roomTypes = ["single", "double", "queen", "king"];
  const [isActive, setIsActive] = useState(false);
  console.log(isActive);
  return (
    <div id="ts--desktop-product" className={styles.productContainer}>
      <div className={styles.title}>
        <h1 className="font-black text-[18px] text-[#071952] uppercase pb-4">
          Products
        </h1>
        <span onClick={() => setIsActive(!isActive)}>
          <Button intent={"sixth"} text="Add" />
        </span>
      </div>
      {isActive && (
        <div>
          <div
            onClick={() => setIsActive(!isActive)}
            className={styles.backCover}
          ></div>
          
           <Model/>
        </div>
      )}
    </div>
  );
};

export default Index;
