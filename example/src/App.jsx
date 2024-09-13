import { useRef, useState } from "react";
import L from "leaflet";
import MarkerMotion from "leaflet.marker-motion-react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
	iconUrl: "./car.png",
	iconSize: [38, 38],
	iconAnchor: [19, 19],
});

const points = [
	[22.614407, -103.009848],
	[22.622247, -103.006986],
	[22.640489, -102.996611],
	[22.641672, -102.995121],
	[22.644173, -102.993314],
	[22.646203, -102.996537],
	[22.652985, -102.995663],
	[22.648454, -102.987019],
	[22.646342, -102.978193],
	[22.646175, -102.968946],
	[22.651401, -102.961356],
	[22.651874, -102.958555],
	[22.639483, -102.959202],
	[22.618056, -102.981606],
	[22.618216, -102.992432],
	[22.616452, -102.997295],
];

function App() {
	const markerMotionRef = useRef(null);
	const [speed, setSpeed] = useState(4000);

	return (
		<MapContainer
			center={[22.634087, -102.983227]}
			zoom={14}
			style={{ height: "100vh", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Polyline pathOptions={{ color: "blue" }} positions={points} />
			<MarkerMotion
				ref={markerMotionRef}
				path={points}
				speedInKmH={speed}
				options={{
					icon,
					rotation: true,
					autoplay: true,
					loop: true,
				}}
				eventHandlers={{
					"motion.start": () => {
						console.log("motion start");
					},
					"motion.pause": () => {
						console.log("motion pause");
					},
					"motion.reset": () => {
						console.log("motion reset");
					},
					"motion.end": () => {
						console.log("motion end");
					},
					"motion.segment": (data) => {
						console.log("motion segment", data.index);
					},
				}}
			/>
			<Control prepend position="topright">
				<div className="leaflet-bar leaflet-control">
					<button
						onClick={() => {
							markerMotionRef.current.start();
						}}
					>
						Start
					</button>
					<button
						onClick={() => {
							markerMotionRef.current.pause();
						}}
					>
						Pause
					</button>
					<button
						onClick={() => {
							markerMotionRef.current.reset();
						}}
					>
						Reset
					</button>
					<button
						onClick={() => {
							const randomIndex = Math.floor(
								Math.random() * points.length
							);
							markerMotionRef.current.setProgress(randomIndex);
						}}
					>
						Random progress
					</button>
					<button
						onClick={() => {
							setSpeed((s) => Math.max(s - 500, 1000));
						}}
					>
						Slower
					</button>
					<button
						onClick={() => {
							setSpeed((s) => Math.min(s + 1000, 10000));
						}}
					>
						Faster
					</button>
				</div>
			</Control>
		</MapContainer>
	);
}

export default App;
