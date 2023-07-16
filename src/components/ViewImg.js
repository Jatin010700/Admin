// ImageDisplay.js
import React, { useState, useEffect, useMemo } from 'react';

const ImageDisplay = () => {

  const [imageData, setImageData] = useState([]);
  //Image id array are id number from the database
  //Select the index for the right image number
  const imageIds = useMemo(() => [1,2,3,4], []); // Example image IDs

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = imageIds.map(async (id) => {
          const response = await fetch(
            `http://localhost:5000/api/images/${id}`
          );
          if (!response.ok) {
            throw new Error(`Error retrieving image with ID ${id}`);
          }
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        });

        const imageUrls = await Promise.all(imagePromises);
        setImageData(imageUrls);
      } catch (error) {
        alert("Error:", error);
      }
    };

    fetchImages();
  }, [imageIds]);
  return (
    <div>
      <img src={`${imageData[2]}`} alt="" />
    </div>
  );
};

export default ImageDisplay;
