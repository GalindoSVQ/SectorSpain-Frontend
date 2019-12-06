import React, { useState, useEffect } from "react";
import Head from "../head/Head";
import "./NewSector.scss";
import useInput from "../hooks/useInput";
import axios from "axios";
import http from "../../../api/http";

function NewSector({
  match: {
    params: { crag }
  }
}) {
  const [name, bindName, resetName] = useInput();
  const [description, bindDescription, resetDescription] = useInput();
  const [latitude, bindLatitude, resetLatitude] = useInput();
  const [longitude, bindLongitude, resetLongitude] = useInput();
  const [message, setMessage] = useState(null);
  const [orientation, setOrientation] = useState("N");
  const [topo, setTopo] = useState(null);
  const [cragId, setCragId] = useState(null);

  const resetInput = () => {
    resetName();
    resetDescription();
    resetLatitude();
    resetLongitude();
    setOrientation("N");
  };

  useEffect(() => {
    axios
      .get(`${http.defaults.baseURL}api/crags/?cragName=${crag}`)
      .then(response => {
        setCragId(response.data.results[0].id);
      })
      .catch(error => {
        console.log(error);
      });
  }, [crag]);

  const addSector = e => {
    e.preventDefault();

    try {
      axios
        .post(
          `${http.defaults.baseURL}api/sectors/add/`,
          {
            name: name,
            description: description,
            latitude: latitude,
            longitude: longitude,
            orientation: orientation,
            picture: topo,
            crag_id: cragId
          },
          {
            headers: { Authorization: http.defaults.headers["Authorization"] }
          }
        )
        .then(response => {
          setMessage("Sector added correctly, thanks climber!");
        });
    } catch (e) {
      console.log(e);
    } finally {
      resetInput();
      setMessage(null);
    }
  };

  return (
    <>
      <div className="head-mobile">
        <Head />
      </div>
      <div className="add-sector-view">
        <div className="title-sector-add">
          ADD SECTOR <span className="title-sector">{crag}</span>
        </div>

        <div className="form-add-new-sector">
          <form className="form-add-sector" onSubmit={addSector}>
            <label htmlFor="name">Sector Name</label>
            <input
              type="text"
              name="name"
              id="name"
              maxLength="45"
              autoFocus
              required
              {...bindName}
            />
            <label htmlFor="description">Sector Description</label>
            <textarea
              name="description"
              className="description-new-sector"
              id="description"
              {...bindDescription}
              maxLength="200"
              required
            ></textarea>
            <label htmlFor="latitude">Sector Latitude</label>
            <input
              type="text"
              name="latitude"
              id="latitude"
              maxLength="45"
              {...bindLatitude}
              required
              value="0"
            />
            <label htmlFor="longitude">Sector Longitude</label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              maxLength="45"
              {...bindLongitude}
              required
              value="0"
            />
            <label htmlFor="orientationSector">Orientation</label>
            <select
              id="orientationSector"
              name="orientationSector"
              onChange={e => setOrientation(e.target.value)}
            >
              <option value="N">NORTH</option>
              <option value="NE">NORTHEAST</option>
              <option value="E">EAST</option>
              <option value="SE">SOUTHEAST</option>
              <option value="S">SOUTH</option>
              <option value="SO">SOUTHWEST</option>
              <option value="O">WEST</option>
              <option value="NO">NORTHWEST</option>
            </select>

            <label htmlFor="topo">Topo</label>
            <input
              type="file"
              name="topo"
              id="topo"
              onChange={e => setTopo(e.target.file)}
            />
            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="crag"
              name="crag"
              value={crag.charAt(0).toUpperCase() + crag.slice(1)}
              required
              disabled
            />
            <div className="buttons-new-sector">
              <button
                type="reset"
                className="submit-add-sector"
                onClick={resetInput}
              >
                RESET
              </button>
              <button type="submit" className="submit-add-sector">
                SUBMIT
              </button>
            </div>
          </form>
          <span className="message-patch">{message && message}</span>
        </div>
      </div>
    </>
  );
}

export default NewSector;
