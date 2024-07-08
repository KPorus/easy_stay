"use client";
import Image from "next/image";
import styles from "./settings.module.scss";
import { useState } from "react";
import Input from "@/sheared/Desktop/Input/Input";
import Button from "@/sheared/Mobile/Button";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div id="ts--mobile-settings" className={styles.settingContainer}>
      <h1 className="font-black text-[2rem] text-[#071952] uppercase pb-4">
        Profile
      </h1>
      <div className={styles.settingBody}>
        <div className={styles.settingBodyPartOne}>
          <div className={styles.chooseImage}>
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Selected"
                className={styles.previewImage}
                width={200}
                height={200}
              />
            ) : (
              // <div className={styles.placeholderBox}></div>
              <label
                htmlFor="img"
                className={`${styles.chooseImageLabel} ${styles.placeholderBox}`}
              >
                Choose an image
              </label>
            )}
            <input
              type="file"
              name="imgfile"
              id="img"
              onChange={handleImageChange}
            />
          </div>
          <div className={styles.inputBody}>
            <Input
              type="text"
              id="hotelName"
              name="hotelName"
              placeholder=""
              isRequired
              labelTitle="Enter Hotel Name"
              labelIntent="secondary"
              inputIntent="secondary"
            />
            <Input
              type="email"
              id="email"
              name="email"
              placeholder=""
              isRequired
              labelTitle="Enter Hotel Email"
              labelIntent="secondary"
              inputIntent="secondary"
            />
            <Input
              type="number"
              id="contact"
              name="contact"
              placeholder=""
              isRequired
              labelTitle="Enter Hotel contact Number"
              labelIntent="secondary"
              inputIntent="secondary"
            />
            <Input
              type="pass"
              id="setPassword"
              name="setPassword"
              placeholder=""
              isRequired
              labelTitle="Set password"
              labelIntent="secondary"
              inputIntent="secondary"
            />
            <Input
              type="pass"
              id="confirmPassword"
              name="confirmPassword"
              placeholder=""
              isRequired
              labelTitle="Confirm password"
              labelIntent="secondary"
              inputIntent="secondary"
            />
          </div>
        </div>
        <div className={styles.settingBodyPartTwo}>
          <textarea
            id="description"
            name="description"
            placeholder="Add description"
          />
        </div>
        <Button text="Submit" intent="primary" />
      </div>
    </div>
  );
};

export default Index;
