import { Tensorflow } from "../../components/Tensorflow";
import "./HomePage.css";

window.captureTable = [];

export default function HomePage() {
	return (
		<div className="home-container">
			<div className="text-container">
				<div>
					<h1> DIEGO P. - MIDTERM REACT</h1>
				</div>

				<div>
					<h2>Why TensorFlow: </h2>
				</div>
				<div>
					<h3>
						Whether you're an expert or a beginner, TensorFlow is an
						end-to-end platform that makes it easy for you to build
						and deploy ML models.
					</h3>
				</div>


			</div>
			<div className="tensor">
			<div>
					<h3>Real-time object detection example:</h3>
				</div>
				<Tensorflow />
			</div>
		</div>
	);
}
