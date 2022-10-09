import React from "react";
import { Skeleton } from "antd";
import { GoogleMap,MarkerF, useJsApiLoader } from "@react-google-maps/api";

export default function CardLineChart({requests}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxxVKoXmMpvOeHp_pMEpOaA0WtEN-oG9o",
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

  // const position= {
  //   lat: address.latitude, lng: address.longitude
  // }

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  // React.useEffect(() => {}, []);

  return isLoaded ? (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-[#021529]">
      <GoogleMap
      mapContainerStyle={{width:"100%",height:"360px"}}
      center={{ lat:-1.9377445286878083, lng: 30.05737782055923 }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}

      {requests && <>
        {requests.map((request)=><MarkerF position={ {lat:request.address.latitude,lng:request.address.longitude}} />)}
      </>}
      
    </GoogleMap>
       
      </div>
    </>
  ) : (
    <>
      <Skeleton />
    </>
  );
}
