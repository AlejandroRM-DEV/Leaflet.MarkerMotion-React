# Leaflet.MarkerMotion React Wrapper
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Leaflet.MarkerMotion is a powerful open-source plugin for Leaflet that enables smooth marker animation along predefined paths. This documentation covers the React wrapper for Leaflet.MarkerMotion, which allows easy integration with React-Leaflet projects.

## Demo

Check out our live demo: [https://leaflet-marker-motion-react-5jbe.vercel.app](https://leaflet-marker-motion-react-5jbe.vercel.app)

## Installation

Install Leaflet.MarkerMotion and its React wrapper via npm:

```bash
npm install leaflet.marker-motion-react
```

## Usage

Here's a basic example of how to use the Leaflet.MarkerMotion React wrapper:

```jsx
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
  // ... more points ...
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
        {/* Control buttons */}
      </Control>
    </MapContainer>
  );
}

export default App;
```

## API Reference

### MarkerMotion Component

The `MarkerMotion` component is the main component provided by the React wrapper.

#### Props

- `path`: Array of `[lat, lng]` points defining the path.
- `speedInKmH`: Speed of the marker in kilometers per hour.
- `options`: Optional Leaflet marker options and MarkerMotion-specific options.
  - `rotation` (boolean): Updates the rotation angle of the marker based on its current position and next point in the path.
  - `autoplay` (boolean): Starts animation automatically when added to the map.
  - `loop` (boolean): Restarts the animation from the beginning when it reaches the end of the path.
  - All standard Leaflet marker options are also supported like icon
- `eventHandlers`: Object containing event handler functions for MarkerMotion events.

#### Ref Methods

The `MarkerMotion` component can be controlled using a ref. The following methods are available:

- `start()`: Starts or resumes the motion of the marker along the path.
- `pause()`: Pauses the motion of the marker.
- `reset()`: Stops the motion of the marker and resets it to the starting position.
- `setProgress(index)`: Sets the progress of the marker to a specific segment of the path.

### Events

The following events can be handled using the `eventHandlers` prop:

- `motion.start`: Fired when the motion starts or resumes.
- `motion.pause`: Fired when the motion is paused.
- `motion.reset`: Fired when the marker is reset to its starting position.
- `motion.end`: Fired when the marker reaches the end of the path.
- `motion.segment`: Fired when the marker enters a new segment of the path. Returns an object with the current segment index.

## Example: Controlling MarkerMotion

Here's an example of how to control the MarkerMotion component using buttons:

```jsx
<Control position="topright">
  <div className="leaflet-bar leaflet-control">
    <button onClick={() => markerMotionRef.current.start()}>
      Start
    </button>
    <button onClick={() => markerMotionRef.current.pause()}>
      Pause
    </button>
    <button onClick={() => markerMotionRef.current.reset()}>
      Reset
    </button>
    <button
      onClick={() => {
        const randomIndex = Math.floor(Math.random() * points.length);
        markerMotionRef.current.setProgress(randomIndex);
      }}
    >
      Random progress
    </button>
    <button onClick={() => setSpeed((s) => Math.max(s - 500, 1000))}>
      Slower
    </button>
    <button onClick={() => setSpeed((s) => Math.min(s + 1000, 10000))}>
      Faster
    </button>
  </div>
</Control>
```

This example demonstrates how to use the ref methods to control the marker's motion and how to adjust the speed dynamically.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AlejandroRM-DEV"><img src="https://avatars.githubusercontent.com/u/8054357?v=4?s=100" width="100px;" alt="Alejandro Ramírez Muñoz"/><br /><sub><b>Alejandro Ramírez Muñoz</b></sub></a><br /><a href="https://github.com/AlejandroRM-DEV/Leaflet.MarkerMotion-React/commits?author=AlejandroRM-DEV" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!