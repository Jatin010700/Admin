import React, { useState } from "react";
import "../App.css";

export const Delete = () => {
  const [id, setId] = useState("");
  const [paraValue, setParaValue] = useState("");
  const [successValue, setSuccessValue] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setParaValue(data.message);
        setSuccessValue(true);
        console.log(data.message);
      } else {
        const errorData = await response.json();
        setParaValue(errorData.error);
        setSuccessValue(false);
        console.log(errorData.error);
      }
    } catch (error) {
      setParaValue("Error occurred deleting");
      console.error(error);
    }
  };
  
  // Reset the error message and success state after 3 seconds
  setTimeout(() => {
    setParaValue("");
    setSuccessValue("");
  }, 2000);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col p-2 w-full md:w-2/4">
        <h1 className="font-bold p-2 text-2xl">
          <i className="bi bi-code p-2"></i>
          DELETE
          <i className="bi bi-code-slash p-2"></i>
        </h1>
        <p
          className={`text-center font-bold text-white w-full ${
            successValue ? "success" : "error"
          }`}
        >
          {paraValue}
        </p>
        <div className="text-white bg-dark rounded-2xl shadow w-full p-4 mt-2">
          <form
            className="flex justify-center items-center"
            onSubmit={handleFormSubmit}
          >
            <label className="font-bold mr-2">ID</label>
            <input
              type="number"
              className="py-2.5 w-12 bg-G-white text-dark text-center rounded-lg mr-2"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button className="bg-err-red py-2 px-3 rounded-lg hover:bg-opacity-90 active:transform active:-translate-y-1/4 scale-85 duration-150">
              <i className="text-2xl bi bi-trash-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
