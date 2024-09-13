import {
  createElementObject,
  createPathComponent,
  extendContext,
} from "@react-leaflet/core";
import L from "leaflet";
import "leaflet.marker-motion";

function createMarkerMotion(props, context) {
  const markerMotion = L.markerMotion(props.path, props.speedInKmH, props.options);
  return createElementObject(
    markerMotion,
    extendContext(context, { overlayContainer: markerMotion }),
  );
}

function updateMarkerMotion(instance, props, prevProps) {
  if (props.speedInKmH !== prevProps.speedInKmH) {
    instance.setSpeed(props.speedInKmH);
  }
}

const MarkerMotion = createPathComponent(createMarkerMotion, updateMarkerMotion);

export default MarkerMotion;