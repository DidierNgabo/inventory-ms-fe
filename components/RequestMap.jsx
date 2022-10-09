import React from "react";
import { GoogleMap, Marker,MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { Skeleton } from "antd";

const containerStyle = {
  width: "600px",
  height: "400px",
};

const RequestMap = ({ address }) => {
  console.log(address);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: -1.9377445286878083,
      lng: 30.05737782055923,
    });

    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const position= {
    lat: address.latitude, lng: address.longitude
  }

  console.log(position);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat:-1.9377445286878083, lng: 30.05737782055923 }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}

      <MarkerF position={ position} />
    </GoogleMap>
  ) : (
    <>
      <Skeleton />
    </>
  );
};

export default RequestMap;
