"use client";
import { getPersonalInfo } from "@/utils/API";
import styles from "./home.module.scss";
import { useEffect, useState } from "react";
import { UploadBody } from "@/Interface/Isetting";
import toast from "react-hot-toast";
import Image from "next/image";
import dynamic from "next/dynamic";
const HProductList = dynamic(()=>import("./HomeProductList"))

const Home = () => {
  const [data, setData] = useState<UploadBody>({
    address: "",
    email: "",
    pass: "",
    phoneNo: "",
    hotelName: "",
    description: "",
    imageName: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem("id");
      if (id) {
        const data = await getPersonalInfo(id);
        if (data.statusCode === 200) {
          setData({
            address: data.data.address || "",
            email: data.data.email || "",
            pass: "",
            phoneNo: data.data.phoneNo || "",
            hotelName: data.data.hotelName || "",
            description: data.data.description || "",
            hotelLogo: data.data.hotelLogo || "",
            imageName: data.data.imageName || "",
          });
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    };
    fetchUserData();
  }, []);
  return (
    <div id="ts--desktop-home" className={styles.homeContainer}>
      <div className={styles.profileInfo}>
        {data.hotelLogo ? (
          <Image
            className={`${styles.profileImage}`}
            src={data.hotelLogo}
            alt={"hotel logo"}
            width={200}
            height={200}
            priority
            quality={75}
          />
        ) : (
          <div className={styles.avatar}>No Image</div>
        )}

        <div className={styles.profileText}>
          <h1 className="font-black text-[18px] text-[#071952] uppercase pb-4">
            Welcome {data.hotelName}
          </h1>
          <h2>Email: {data.email}</h2>
          <h3>Phone no: {data.phoneNo}</h3>
        </div>
      </div>
      <h1 className="font-black text-[18px] text-[#071952] uppercase pb-4">
        Product
      </h1>
      <HProductList />
    </div>
  );
};

export default Home;
