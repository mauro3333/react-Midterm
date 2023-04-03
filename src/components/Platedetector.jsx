
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';


const webcamConstraints = {
  width: 640,
  height: 480,
  facingMode: "environment"
};

const apiKey = 'a6d8a8d357msh6a6e6c33dba73bcp11c305jsnef40c8149b73';
const apiEndpoint = 'https://openalpr.p.rapidapi.com/recognize_bytes';

export default function Platedetector() {
  const webcamRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [plateNumber, setPlateNumber] = useState(null);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageUrl(imageSrc);

    const response = await axios.post(apiEndpoint, imageSrc, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Host': 'openalpr.p.rapidapi.com',
        'X-RapidAPI-Key': 'a6d8a8d357msh6a6e6c33dba73bcp11c305jsnef40c8149b73'
      }
    });

    if (response.data.results.length > 0) {
      setPlateNumber(response.data.results[0].plate);
    } else {
      setPlateNumber('No plate detected');
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={webcamConstraints.height}
        width={webcamConstraints.width}
        videoConstraints={webcamConstraints}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={captureImage}>Capture</button>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="captured" />
          <p>Plate Number: {plateNumber}</p>
        </div>
      )}
    </div>
  );
}



