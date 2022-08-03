import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Skeleton } from "antd";

const containerStyle = {
  width: "600px",
  height: "400px",
};

const RequestMap = ({ address }) => {
  console.log(address);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxxVKoXmMpvOeHp_pMEpOaA0WtEN-oG9o",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: address.latitude,
      lng: address.longitude,
    });

    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: address.latitude, lng: address.longitude }}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}

      <Marker position={{ lat: address.latitude, lng: address.longitude }} />
    </GoogleMap>
  ) : (
    <>
      <Skeleton />
    </>
  );
};

export default RequestMap;
