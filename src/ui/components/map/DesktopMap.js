import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import "./map.scss";
import axios from "axios";
import http from "../../../api/http";
import Head from "../head";

export default function DesktopMap() {
  const [cragPoint, setCragPoint] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 40.7269,
    longitude: -3.86491,
    width: "100vw",
    height: "100vh",
    zoom: 5
  });

  const [selectedCrag, setSelectedCrag] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${http.defaults.baseURL}api/crags/map/`);
      setCragPoint(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedCrag(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
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
          onClick={() => {
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
              latitude={parseFloat(selectedCrag.latitude)}
              longitude={parseFloat(selectedCrag.longitude)}
              onClose={() => {
                setSelectedCrag(null);
              }}
              className="popups"
            >
              <div>
                <p className="title">{selectedCrag.name}</p>
                <p className="city">{selectedCrag.city}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    </>
  );
}
