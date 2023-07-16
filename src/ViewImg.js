// ImageDisplay.js
import React, { useState, useEffect, useMemo } from 'react';

const ImageDisplay = () => {
  const [imageData, setImageData] = useState([]);
  
  const img_names = useMemo(() => [
    'car2.jpg',
    'car4.jpg',
    'car9.jpg',
    'ferrari.gif'
  ], []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = img_names.map(async (img_name) => {
          const response = await fetch(`http://localhost:5000/api/images/${img_name}`);
          if (!response.ok) {
            throw new Error(`Error retrieving image ${img_name}`);
          }
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        });

        const imageUrls = await Promise.all(imagePromises);
        setImageData(imageUrls);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchImages();
  }, [img_names]);

  return (
    <div>
      <img src={imageData[0]} alt={img_names} />
      <img src={imageData[1]} alt={img_names} />
      <img src={imageData[2]} alt={img_names} />
    </div>
  );
};

export default ImageDisplay;
