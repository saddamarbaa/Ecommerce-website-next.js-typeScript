import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

type MapProps = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type PropsType = {
  latitude: number;
  longitude: number;
};

export function Map({ latitude, longitude }: PropsType) {
  const [viewport, setViewport] = React.useState<MapProps>({
    latitude,
    longitude,
    zoom: 11,
  });

  React.useEffect(() => {
    setViewport((prevState) => ({
      ...prevState,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);

  return (
    <div className="relative h-[600px] w-full sm:h-[800px]">
      <ReactMapGL
        initialViewState={viewport}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}
      >
        <Marker longitude={viewport.longitude} latitude={viewport.latitude} color="red" />
      </ReactMapGL>
    </div>
  );
}

export default Map;
