

export const drawRect = (detections, ctx) => {
	detections.forEach((prediction) => {
		const [x, y, width, height] = prediction["bbox"];
		const text = prediction["class"];
		if (text === "car") {
			console.log("carrrrrrrrrrrrrrrrrrrrrr");
		}
		const score = (prediction["score"] * 100).toFixed(0);

		ctx.font = "18px Arial";
		ctx.beginPath();
		ctx.fillStyle = "blue";
		ctx.fillText(text, x, y - 10);
		ctx.fillText(score, x + 80, y - 10);
		ctx.rect(x, y, width, height);
		ctx.strokeStyle = "yellow";
		ctx.lineWidth = 5;
		ctx.stroke();
	});
};
