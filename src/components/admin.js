import React, { useState } from "react";

import "../App.css";
import Info from "./info";

export const Admin = () => {
  const [id, setId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [paraValue, setParaValue] = useState("");
  const [successValue, setSuccessValue] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (selectedFile && id) {
      try {
        const formData = new FormData();
        formData.append("image", selectedFile, selectedFile.name);
        formData.append("id", id); // Add the ID to the form data

        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setParaValue(data.message);
          setSuccessValue(true);
        } else {
          const errorData = await response.json();
          setParaValue(errorData.error);
          setSuccessValue(false);
        }
      } catch (error) {
        setParaValue("Error occurred inserting image");
        setSuccessValue(false);
        console.error("Error uploading image:", error);
      }
    } else {
      setParaValue("Please provide both file and ID");
      setSuccessValue(false);
    }
    // Reset the error message and success state after 3 seconds
    setTimeout(() => {
      setParaValue("");
      setSuccessValue("");
    }, 2000);
  };

  const resetForm = (event) => {
    event.preventDefault();
    setSelectedFile(null);
    setParaValue("");
    setSuccessValue("");
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col flex-wrap p-2">

        <div className="flex justify-between bg-green-blue rounded-lg p-2">

        <div>
        <h1 className="font-bold  text-4xl   text-white">
          <i className="bi bi-person-fill-lock"></i>ADMIN
        </h1>
        </div>

        <Info/>
        </div>

        <h1 className="font-bold p-2 text-2xl">
          <i className="bi bi-code p-2"></i>UPLOAD
          <i className="bi bi-code-slash p-2"></i>
        </h1>
        <p
          className={`text-center font-bold text-white w-full mb-2 ${
            successValue ? "success" : "error"
          }`}
        >
          {paraValue}
        </p>
        <div className="text-white bg-dark rounded-2xl shadow w-full p-4">
          <form className="flex flex-col items-center md:flex-row md:justify-evenly">
            <label className="font-bold mr-2">ID</label>
            <input
              type="number"
              className="py-2.5 w-12 bg-G-white text-dark text-center rounded-lg mr-2"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <i className="text-2xl mr-2 bi bi-link"></i>
            <label className="flex gap-2">
              <span className="bg-green-blue text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-opacity-90 active:transform active:-translate-y-1/4 scale-85 duration-150">
                <i className="text-2xl bi bi-file-earmark-text-fill"></i>
                
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="bg-G-white text-dark py-2 px-4 w-52 md:w-80 mr-2 rounded-lg cursor-pointer">
                {selectedFile ? selectedFile.name : "Choose File"}
              </span>
            </label>
            <div className="flex gap-2 m-2 md:m-0">
              <button
                onClick={handleUpload}
                className="bg-Green py-2 px-3 rounded-lg hover:bg-opacity-90  active:transform active:-translate-y-1/4 scale-85 duration-150"
              >
                <i className="text-2xl bi bi-cloud-arrow-up-fill"></i>
              </button>
              <button
                onClick={resetForm}
                className="bg-err-red py-2 px-3 rounded-lg hover:bg-opacity-90  active:transform active:-translate-y-1/4 scale-85 duration-150"
              >
                <i className="text-2xl bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
