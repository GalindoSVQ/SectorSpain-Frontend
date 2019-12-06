import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import "./map.scss";
import axios from "axios";
import http from "../../../api/http";
import Head from "../head";

export default function MobileMap() {
  const [cragPoint, setCragPoint] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 38.657,
    longitude: -4.29359,
    width: "100vw",
    height: "100vh",
    zoom: 4
  });
  const [selectedCrag, setSelectedCrag] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${http.defaults.baseURL}api/crags/map/`);
      setCragPoint(result);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="head-mobile">
        <Head />
      </div>
      <div className="map-view">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={viewport => {
            setViewport(viewport);
          }}
          onTouchStart={() => {
            setSelectedCrag(null);
          }}
        >
          <div style={{ position: "absolute", left: 10, top: 100 }}>
            <NavigationControl />
          </div>
          {Array.isArray(cragPoint.data) &&
            cragPoint.data.map(
              (crag, index) =>
                crag.latitude != null &&
                crag.latitude > 0 && (
                  <Marker
                    key={index}
                    latitude={parseFloat(crag.latitude)}
                    longitude={parseFloat(crag.longitude)}
                  >
                    <img
                      onClick={e => {
                        e.preventDefault();
                        setSelectedCrag(crag);
                      }}
                      src={require("../../../assets/icons/climbing-anchor.png")}
                      className="img-crag"
                      alt="crag-point"
                    ></img>
                  </Marker>
                )
            )}

          {selectedCrag ? (
            <Popup
              className="popups"
              latitude={parseFloat(selectedCrag.latitude)}
              longitude={parseFloat(selectedCrag.longitude)}
              onClose={() => {
                setSelectedCrag(null);
              }}
            >
              <div>
                <p className="title">{selectedCrag.name}</p>
                <p className="city">{selectedCrag.city}</p>
                {
                  <a
                    href={`https://www.google.com/maps/dir//${selectedCrag.latitude},${selectedCrag.longitude}`}
                    className="link-crag"
                  >
                    Let's go there!
                  </a>
                }
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    </>
  );
}
