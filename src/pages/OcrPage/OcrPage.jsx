import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import { createWorker } from "tesseract.js";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
// import { Box } from "@mui/system";
import TableContainer from "@mui/material/TableContainer";
import "./OcrPage.css";


import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function OcrPage() {
	const canvasRef = useRef(null);
	const webcamRef = useRef(null);
	const [screenshot, setScreenshot] = useState(null);
	const [ocrText, setOcrText] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [srcX, setSrcX] = useState(null);
	const [open, setOpen] = useState(false);
	const [recText, setRecText] = useState(null);

	const popUpOn = (srcImage, recText) => {
		setSrcX(srcImage);
		setRecText(recText);
		setOpen(true);
	};
	const popUpOff = () => setOpen(false);

	useEffect(() => {
		if (window.tableImage.length > 0) {
			setTableData([...window.tableImage]);
		}
	}, []);

	const capture = () => {
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
			recognizeText(dataURL);
		}
	};

	async function recognizeText(imageSrc) {
		const worker = await createWorker({
			logger: (m) => console.log(m),
		});

		(async () => {
			// await worker.load();
			await worker.loadLanguage("eng");
			await worker.initialize("eng");
			const {
				data: { text },
			} = await worker.recognize(imageSrc);
			setOcrText(text);
			updateTable(imageSrc, text);

			await worker.terminate();
		})();
	}

	function updateTable(img, txt) {
		const newRowData = {
			imageX: img,
			textX: txt,
		};
		console.log("newRowData=========", newRowData);
		console.log("before ---- tableData=========", tableData);

		setTableData([...tableData, newRowData]);
		window.tableImage.push(newRowData);
	}

	return (
		<div className="app">
			<div className="title">OCR RECOGNITION</div>
			<div className="container">
				<div className="camera-container">
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
					<Button
						sx={{
							width: 640,
							height: 100,
							backgroundColor: "green",
							m: 2,
						}}
						variant="contained"
						onClick={capture}
					>
						TAKE SAMPLE
					</Button>
				</div>

				<TableContainer component={Paper} sx={{ maxWidth: 1000, m: 2, backgroundColor: "dimgray"}}>
					<Table
						sx={{ maxWidth: 1500, m: 0 }}
						align="center"
						size="small"
						aria-label="a dense table"
					>
						<TableHead>
							<TableRow >
								<TableCell sx={{ fontWeight: 'bold', fontSize: 20 }} align="center">ID</TableCell>
								<TableCell sx={{ fontWeight: 'bold', fontSize: 20 }} align="center">Image</TableCell>
								<TableCell sx={{ fontWeight: 'bold', fontSize: 20 }} align="center">Text</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{tableData.map((tableData, index) => (
								<TableRow
									key={index}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell sx={{ fontSize: 18 }} align="center">
										{index}
									</TableCell>
									<TableCell align="center">
										<img
											src={tableData.imageX}
											width={80}
											height={60}
											alt=""
											onClick={() =>
												popUpOn(
													`${tableData.imageX}`,
													`${tableData.textX}`
												)
											}
										/>
									</TableCell>

									<TableCell sx={{ fontSize: 18 }}>{tableData.textX}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>

			<Modal
				open={open}
				onClose={popUpOff}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 650,
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						OCR SAMPLE
					</Typography>

					<img src={srcX} width={640} height={480}></img>

					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Recognized: {recText}
					</Typography>
				</Box>
			</Modal>

			<canvas
				hidden
				ref={canvasRef}
				style={{
					width: 160,
					height: 120,
				}}
			/>

			{/* {screenshot && (
				<img
					src={screenshot}
					style={{
						// position: "relative",
						// marginLeft: "200px",
						// marginRight: "auto",
						// marginTop: "500px",
						// left: 0,
						// right: 0,
						// textAlign: "right",
						// width: 320,
						// height: 240,
					}}
				/>
			)} */}
		</div>
	);
}
