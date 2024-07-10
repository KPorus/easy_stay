"use client";
import Image from "next/image";
import styles from "./settings.module.scss";
import { useCallback, useEffect, useState } from "react";
import Input from "@/sheared/Desktop/Input/Input";
import Button from "@/sheared/Desktop/Button";
import { deleteAccount, getPersonalInfo, upload } from "@/utils/API";
import toast from "react-hot-toast";
import { UploadBody } from "@/Interface/Isetting";
import { useRouter } from "next/navigation";

const Index = () => {
  const [isModified, setIsModified] = useState(false);
  const [isActive, setIsActive] = useState(false); // Modal visibility state
  const [deleteInput, setDeleteInput] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem("id");
      if (id) {
        const data = await getPersonalInfo(id);
        if (data.statusCode === 200) {
          setUploadBody({
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

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const [uploadBody, setUploadBody] = useState<UploadBody>({
    address: "",
    email: "",
    pass: "",
    phoneNo: "",
    hotelName: "",
    description: "",
    imageName:""
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setIsModified(true);
      setUploadBody((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    },
    []
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setIsModified(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const router = useRouter();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const id = localStorage.getItem("id");
      if (image) {
        formData.append("image", image);
      }
      formData.append("id", id as string);
      formData.append("data", JSON.stringify(uploadBody));

      const result = await upload(formData);
      console.log(result);
      if (result.statusCode === 200) {
        setIsModified(false);
        toast.success(`${result.message}`);
      } else {
        toast.error(`${result.message}`);
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.toLowerCase() === "delete") {
      setDeleteInput(e.target.value);
    }
  };

  const handleDeleteSubmit = useCallback(async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    // Perform the delete action here
    e.preventDefault();
    const id = localStorage.getItem("id");
    if (!id) return;
    if(!deleteInput) return;
    const result = await deleteAccount(id);
    if (result.statusCode === 200) {
      toast.success("Profile deleted successfully.");
      setIsActive(false);
      localStorage.removeItem("id");
      router.push("/");
    } else {
      toast.error(result.message);
    }
  }, [router,deleteInput]);

  return (
    <div id="ts--desktop-settings" className={styles.settingContainer}>
      <div className={styles.settingsTitle}>
        <h1>Profile</h1>
        <span onClick={() => setIsActive(!isActive)}>
          <Button intent={"fourth"} text="Delete" />
        </span>
      </div>
      <form className={styles.settingBody}>
        <div className={styles.settingBodyPartOne}>
          <div className={styles.chooseImage}>
            {!selectedImage && uploadBody.hotelLogo && (
              <Image
                src={uploadBody.hotelLogo}
                className={styles.previewImage}
                width={200}
                height={200}
                alt="logoimage"
              />
            )}
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Selected"
                className={styles.previewImage}
                width={200}
                height={200}
              />
            ) : (
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
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className={styles.inputBody}>
            <Input
              type="text"
              id="hotelName"
              name="hotelName"
              value={uploadBody.hotelName}
              placeholder=""
              isRequired
              labelTitle="Enter Hotel Name"
              labelIntent="secondary"
              inputIntent="secondary"
              handleChange={handleChange}
            />
            <Input
              type="email"
              id="email"
              name="email"
              value={uploadBody.email}
              placeholder=""
              isRequired
              labelTitle="Enter Hotel Email"
              labelIntent="secondary"
              inputIntent="secondary"
              handleChange={handleChange}
            />
            <Input
              type="number"
              id="phoneNo"
              name="phoneNo"
              value={uploadBody.phoneNo}
              placeholder=""
              isRequired
              labelTitle="Enter Hotel Contact Number"
              labelIntent="secondary"
              inputIntent="secondary"
              handleChange={handleChange}
            />
            <Input
              type="text"
              id="address"
              name="address"
              value={uploadBody.address}
              placeholder=""
              isRequired
              labelTitle="Enter Hotel Address"
              labelIntent="secondary"
              inputIntent="secondary"
              handleChange={handleChange}
            />
            <Input
              type="password"
              id="setPassword"
              name="setPassword"
              value={uploadBody.pass}
              placeholder=""
              labelTitle="Set Password"
              labelIntent="secondary"
              inputIntent="secondary"
              handleChange={handleChange}
            />
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder=""
              isRequired={!!uploadBody.pass}
              labelTitle="Confirm Password"
              labelIntent="secondary"
              inputIntent="secondary"
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.settingBodyPartTwo}>
          <textarea
            id="description"
            name="description"
            value={uploadBody.description}
            placeholder="Add description"
            onChange={handleChange}
          />
        </div>
        <span onClick={handleSubmit}>
          <Button text="Submit" intent="thrid" disabled={!isModified} />
        </span>
      </form>
      {isActive && (
        <div>
          <div
            onClick={() => setIsActive(!isActive)}
            className={styles.backCover}
          ></div>
          <div className={styles.modal}>
            <p>To confirm deletion, type delete in the text input field</p>
            <form className="w-[47%]">
              <Input
                labelTitle="delete"
                labelIntent="secondary"
                type="text"
                id="deleteInput"
                name="deleteInput"
                placeholder=""
                handleChange={handleDelete}
              />
              <div className="flex justify-between">
                <span onClick={handleDeleteSubmit}>
                  <Button intent="fourth" text="Confirm" />
                </span>
                <span onClick={() => setIsActive(!isActive)}>
                  <Button intent="fifth" text="Cancel" />
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
