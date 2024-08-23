"use client";
import Button from "@/sheared/Desktop/Button";
import styles from "./products.module.scss";
import { useState } from "react";

const Model = () => {
  const [services, setServices] = useState("");
  const [servicesList, setServicesList] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    roomTitle: "",
    roomType: "",
    services: [],
    roomDescription: "",
    numGuests: "",
    roomSize: "",
    numBeds: "",
    price: "",
    available: false,
    images: []
  });

  const handleServicesKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const trimmedValue = services.trim();

      if (trimmedValue && !servicesList.includes(trimmedValue)) {
        setServicesList([...servicesList, trimmedValue]);
        setServices(""); // Clear the input after adding a tag
      }
    }
  };

  const handleRemoveService = (tagToRemove: string) => {
    setServicesList(servicesList.filter((service) => service !== tagToRemove));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement & { files?: FileList };
  
    if (type === "checkbox") {
      setFormData(prevState => ({ ...prevState, [name]: checked }));
    } else if (type === "file") {
      setFormData(prevState => ({ ...prevState, [name]: Array.from(files || []) }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validation
    const {
      roomTitle,
      roomType,
      roomDescription,
      numGuests,
      roomSize,
      numBeds,
      price,
      available,
      images
    } = formData;
  
    // Check for missing or invalid fields
    if (!roomTitle || !roomType || servicesList.length === 0 || !roomDescription ||
        !numGuests || !roomSize || !numBeds || !price || images.length === 0) {
      alert('Please fill out all required fields.');
      return;
    }
  
    // Optional: Validate specific fields if needed
    if (isNaN(Number(numGuests)) || isNaN(Number(roomSize)) || isNaN(Number(numBeds)) || isNaN(Number(price))) {
      alert('Please enter valid numbers for guests, room size, number of beds, and price.');
      return;
    }
  
    const productData = {
      roomTitle,
      roomType,
      services: servicesList,
      roomDescription,
      numGuests: Number(numGuests),
      roomSize: Number(roomSize),
      numBeds: Number(numBeds),
      price: Number(price),
      available,
      images
    };
  console.log(productData);
    // try {
    //   // Replace with your API endpoint
    //   const response = await fetch('/api/products', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(productData)
    //   });
  
    //   if (response.ok) {
    //     alert('Product added successfully!');
    //     // Optionally, reset the form or redirect
    //     setFormData({
    //       roomTitle: "",
    //       roomType: "",
    //       services: [],
    //       roomDescription: "",
    //       numGuests: "",
    //       roomSize: "",
    //       numBeds: "",
    //       price: "",
    //       available: false,
    //       images: []
    //     });
    //     setServicesList([]);
    //   } else {
    //     alert('Error adding product');
    //   }
    // } catch (error) {
    //   console.error('Submission error:', error);
    //   alert('An error occurred while submitting the form.');
    // }
  };
  
  return (
    <div id="webcrumbs" className={`${styles.modal}`}>
      <div className="w-[700px] shadow-lg bg-neutral-50 p-6 rounded-lg">
        <h1 className="font-title text-2xl mb-2">Room Information Form</h1>
        <form className={`space-y-6 ${styles.formContainer}`} onSubmit={handleSubmit}>
          {/* Room Title */}
          <div className="sm:flex sm:space-x-4">
            <div className="sm:w-1/2">
              <label htmlFor="roomTitle" className="block mb-2">
                Room Title
              </label>
              <input
                type="text"
                id="roomTitle"
                name="roomTitle"
                className="w-full px-4 h-[44px] border rounded-md"
                placeholder="Deluxe Room"
                required
                value={formData.roomTitle}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Room Type */}
          <div className="sm:flex sm:space-x-4">
            <div className="sm:w-1/2">
              <label htmlFor="roomType" className="block mb-2">
                Room Type
              </label>
              <select
                id="roomType"
                name="roomType"
                className="w-full px-4 h-[44px] border rounded-md"
                defaultValue=""
                required
                value={formData.roomType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select room type
                </option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
                <option value="Duplex">Duplex</option>
              </select>
            </div>
          </div>

          {/* Services */}
          <div>
            <label htmlFor="services" className="block mb-2">
              Services
            </label>
            <input
              type="text"
              id="services"
              name="services"
              className="w-full px-4 h-[44px] border rounded-md"
              placeholder="Add a service and press Enter"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              onKeyDown={handleServicesKeyDown}
            />
            <div className="mt-2 flex flex-wrap">
              {servicesList.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2"
                >
                  <span>{service}</span>
                  <button
                    type="button"
                    className="ml-2 text-blue-800"
                    onClick={() => handleRemoveService(service)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Room Description */}
          <div>
            <label htmlFor="roomDescription" className="block mb-2">
              Room Description
            </label>
            <textarea
              id="roomDescription"
              name="roomDescription"
              className="w-full px-4 h-[100px] border rounded-md"
              placeholder="Room description"
              required
              value={formData.roomDescription}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Number of Guests and Room Size */}
          <div className="sm:flex sm:space-x-4">
            <div className="sm:w-1/2">
              <label htmlFor="numGuests" className="block mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                id="numGuests"
                name="numGuests"
                className="w-full px-4 h-[44px] border rounded-md"
                placeholder="2"
                required
                value={formData.numGuests}
                onChange={handleChange}
              />
            </div>
            <div className="sm:w-1/2">
              <label htmlFor="roomSize" className="block mb-2">
                Room Size (sqm)
              </label>
              <input
                type="number"
                id="roomSize"
                name="roomSize"
                className="w-full px-4 h-[44px] border rounded-md"
                placeholder="40"
                required
                value={formData.roomSize}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Number of Beds and Price */}
          <div className="sm:flex sm:space-x-4">
            <div className="sm:w-1/2">
              <label htmlFor="numBeds" className="block mb-2">
                Number of Beds
              </label>
              <input
                type="number"
                id="numBeds"
                name="numBeds"
                className="w-full px-4 h-[44px] border rounded-md"
                placeholder="1"
                required
                value={formData.numBeds}
                onChange={handleChange}
              />
            </div>
            <div className="sm:w-1/2">
              <label htmlFor="price" className="block mb-2">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="w-full px-4 h-[44px] border rounded-md"
                placeholder="100"
                required
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Availability and Room Images */}
          <div className="sm:flex sm:space-x-4 items-center">
            <div className="sm:w-1/2">
              <input
                type="checkbox"
                id="available"
                name="available"
                className="mr-2"
                checked={formData.available}
                onChange={handleChange}
              />
              <label htmlFor="available">Available</label>
            </div>
            <div className="sm:w-1/2">
              <label htmlFor="images" className="block mb-2">
                Room Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                className="w-full"
                multiple
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Reset and Submit Buttons */}
          <div className="flex justify-between">
            <Button text="Submit" intent={'seventh'} type="submit"/>
            <Button text="Reset" intent={'eighth'} type="reset"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Model;
