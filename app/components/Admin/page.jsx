'use client';

import { useState } from 'react';
import NavBar from '../NavBar/page';
import Styles from '../../css/Admin.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {

  const [formData, setFormData] = useState({
    carName: '',
    yearOfManufacture: '',
    mileage: '',
    fuelType: '', 
    carCategory: '',
    emissionStandard: '',
    transmissionType: '',
    seatCapacity: '',
    pricePerDay: '',
    pricePerWeek: '',
    pricePerMonth: '',
  });

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null); 
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);   
    }
  };

  const imageData = new FormData();
  imageData.append("file", file);
  imageData.append("carName", formData.carName);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').toUpperCase()} is required`;
        isValid = false;
      }
    });

    if (formData.yearOfManufacture && !/^\d{4}$/.test(formData.yearOfManufacture)) {
      newErrors.yearOfManufacture = 'Please enter a valid 4-digit year';
      isValid = false;
    }

    if (formData.mileage && !/^[a-zA-Z0-9\s\-\/]*$/.test(formData.mileage)) {
      newErrors.mileage = 'Please enter valid characters for mileage';
      isValid = false;
    } else if (!formData.mileage.trim()) {
      newErrors.mileage = 'Mileage cannot be empty';
      isValid = false;
    }

    if (formData.pricePerDay && isNaN(formData.pricePerDay)) {
      newErrors.pricePerDay = 'Please enter a valid number for price per day';
      isValid = false;
    }

    if (formData.pricePerWeek && isNaN(formData.pricePerWeek)) {
      newErrors.pricePerWeek = 'Please enter a valid number for price per week';
      isValid = false;
    }

    if (formData.pricePerMonth && isNaN(formData.pricePerMonth)) {
      newErrors.pricePerMonth = 'Please enter a valid number for price per month';
      isValid = false;
    }

    setErrors(newErrors);

     Object.values(newErrors).forEach((error) => {
      toast.warn(error);
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
     if (!validateForm()) {
      return;
    }
  
     const userConfirmed = window.confirm('Are you sure you want to upload the car details?');
    
    if (!userConfirmed) {
      toast.warn('Submission Cancelled');
      return;  
    }
  
    const formDataToSend = {
      carName: formData.carName,
      yearOfManufacture: formData.yearOfManufacture,
      mileage: formData.mileage,
      fuelType: formData.fuelType,
      carCategory: formData.carCategory,
      emissionStandard: formData.emissionStandard,
      transmissionType: formData.transmissionType,
      seatCapacity: formData.seatCapacity,
      pricePerDay: formData.pricePerDay,
      pricePerWeek: formData.pricePerWeek,
      pricePerMonth: formData.pricePerMonth,
    };
  
    console.log(imageData);
  
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });
  
      const imageUpload = await fetch("/api/images", {
        method: "POST",
        body: imageData,
      });
  
      const Imageresult = await imageUpload.json();
      const result = await response.json();
  
      if (result.success) {
        toast.success('Car uploaded successfully');
        setFormData({
          carName: '',
          yearOfManufacture: '',
          mileage: '',
          fuelType: '',
          carCategory: '',
          emissionStandard: '',
          transmissionType: '',
          seatCapacity: '',
          pricePerDay: '',
          pricePerWeek: '',
          pricePerMonth: '',
        });
      }
  
      if (Imageresult.success) {
        console.log(`Image Upload successful: ${Imageresult.name}`);
        toast.success(`Image Upload successful: ${Imageresult.name}`);
      } else {
        toast.error('Error uploading car data');
      }
    } catch (error) {
      console.log('Error uploading car data:', error);
      toast.error('Error uploading car data');
    }
  };
  

  return (
    <div className={Styles.container}>
      <ToastContainer stacked />
      <div className={Styles.main}>
        <NavBar />
        
        <form onSubmit={handleSubmit} className={Styles.upload}>
          {/* Car Name */}
          <div>
            <label>Car Name:</label>
            <input
              type="text"
              name="carName"
              value={formData.carName}
              onChange={handleChange}
            />
          </div>

          {/* Year of Manufacture */}
          <div>
            <label>Year of Manufacture:</label>
            <input
              type="text"
              name="yearOfManufacture"
              value={formData.yearOfManufacture}
              onChange={handleChange}
            />
          </div>

          {/* Mileage */}
          <div>
            <label>Mileage:</label>
            <input
              type="text"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label>Fuel Type:</label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Car Category */}
          <div>
            <label>Car Category:</label>
            <select
              name="carCategory"
              value={formData.carCategory}
              onChange={handleChange}
            >
              <option value="">Select Car Category</option>
              <option value="SUV">SUV</option>
              <option value="Luxury Sedan">Luxury Sedan</option>
              <option value="Sports">Sports</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Truck">Truck</option>
            </select>
          </div>

          {/* Emission Standard */}
          <div>
            <label>Emission Standard:</label>
            <select
              name="emissionStandard"
              value={formData.emissionStandard}
              onChange={handleChange}
            >
              <option value="">Select Emission Standard</option>
              <option value="BS5">BS5</option>
              <option value="BS6">BS6</option>
            </select>
          </div>

          {/* Transmission Type */}
          <div>
            <label>Transmission Type:</label>
            <select
              name="transmissionType"
              value={formData.transmissionType}
              onChange={handleChange}
            >
              <option value="">Select Transmission Type</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          {/* Seat Capacity */}
          <div>
            <label>Seat Capacity:</label>
            <select
              name="seatCapacity"
              value={formData.seatCapacity}
              onChange={handleChange}
            >
              <option value="">Select Seat Capacity</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          {/* Price Per Day */}
          <div>
            <label>Price per Day:</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
            />
          </div>

          {/* Price Per Week */}
          <div>
            <label>Price per Week:</label>
            <input
              type="number"
              name="pricePerWeek"
              value={formData.pricePerWeek}
              onChange={handleChange}
            />
          </div>

          {/* Price Per Month */}
          <div>
            <label>Price per Month:</label>
            <input
              type="number"
              name="pricePerMonth"
              value={formData.pricePerMonth}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
