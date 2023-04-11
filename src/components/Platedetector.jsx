import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const apiKey = "xxxxxxx";
const apiEndpoint = "https://openalpr.p.rapidapi.com/recognize_bytes";

export default function Platedetector() {
	const canvasRef = useRef(null);
	const [screenshot, setScreenshot] = useState(null);
	const webcamRef = useRef(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [plateNumber, setPlateNumber] = useState(null);

	const captureImage = async () => {
		if (
			typeof webcamRef.current !== "undefined" &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			const canvas = canvasRef.current;
			const webcam = webcamRef.current.video;
			const image = webcamRef.current.getScreenshot();
			// setScreenshot(image);
			const screenshotWidth = webcamRef.current.video.videoWidth;
			const screenshotHeight = webcamRef.current.video.videoHeight;

			canvasRef.current.width = screenshotWidth;
			canvasRef.current.height = screenshotHeight;

			const ctx = canvasRef.current.getContext("2d");
			ctx.drawImage(webcam, 0, 0, canvas.width, canvas.height);
			const dataURL = canvas.toDataURL("image/jpeg");
			setScreenshot(dataURL);
			findPlate(dataURL);
		}
	};

	async function findPlate(imageX) {
		const encodedParams = new URLSearchParams();
		encodedParams.append("image_bytes",  imageX );

		const options = {
			method: "POST",
			url: "https://openalpr.p.rapidapi.com/recognize_bytes",
			params: { country: "eu" },
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"X-RapidAPI-Key": apiKey,
				"X-RapidAPI-Host": "openalpr.p.rapidapi.com",
			},
			data: encodedParams,
		};

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	return (
		<div>
			<Webcam
				ref={webcamRef}
				muted={true}
				screenshotFormat="image/jpeg"
				style={{
					// position: "absolute",
					// zindex: 9,
					width: 640,
					height: 480,
					align: "center",
				}}
			/>
			<button onClick={captureImage}>Capture</button>
			{imageUrl && (
				<div>
					<img src={imageUrl} alt="captured" />
					<p>Plate Number: {plateNumber}</p>
				</div>
			)}

			<canvas
				// hidden
				ref={canvasRef}
				style={{
					width: 160,
					height: 120,
				}}
			/>
		</div>
	);
}
