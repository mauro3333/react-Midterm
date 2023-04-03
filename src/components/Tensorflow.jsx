import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";


export const Tensorflow = () => {
	// console.log("test");

	const webcamRef = useRef(null);
	const canvasRef = useRef(null);

	const runCoco = async () => {
		const net = await cocossd.load();
		setInterval(() => {
			detect(net);
		}, 100);
	};

	const detect = async (net) => {
		if (
			typeof webcamRef.current !== "undefined" &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			const video = webcamRef.current.video;
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;

			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			const obj = await net.detect(video);

			const ctx = canvasRef.current.getContext("2d");
			drawRect(obj, ctx);
		}
	};

	useEffect(() => {
		runCoco();
	}, []);

	return (
		<div>
			<Webcam
				ref={webcamRef}
				muted={true}
				screenshotFormat="image/jpeg"
				style={{
					position: "absolute",
					zindex: 9,
					width: 640,
					height: 480,
				}}
			/>

			<canvas
				ref={canvasRef}
				style={{
					position: "relative",
					zindex: 8,
					width: 640,
					height: 480,
				}}
			/>
		</div>
	);
}
