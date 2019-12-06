import React, { useState } from "react";
import Head from "../head/Head";
import "./NewCrag.scss";
import useInput from "../hooks/useInput";
import axios from "axios";
import http from "../../../api/http";

function NewCrag({
  match: {
    params: { province }
  }
}) {
  const [name, bindName, resetName] = useInput();
  const [description, bindDescription, resetDescription] = useInput();
  const [latitude, bindLatitude, resetLatitude] = useInput();
  const [longitude, bindLongitude, resetLongitude] = useInput();
  const [city, bindCity, resetCity] = useInput();
  const [message, setMessage] = useState(null);

  const resetInput = () => {
    resetName();
    resetDescription();
    resetLatitude();
    resetLongitude();
    resetCity();
  };

  const addCrag = e => {
    e.preventDefault();

    try {
      axios
        .post(
          `${http.defaults.baseURL}api/crags/add/`,
          {
            name: name,
            description: description,
            latitude: latitude,
            longitude: longitude,
            city: city,
            province: province.charAt(0).toUpperCase() + province.slice(1)
          },
          {
            headers: { Authorization: http.defaults.headers["Authorization"] }
          }
        )
        .then(response => {
          setMessage("Crag added correctly, thanks climber!");
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
      <div className="add-crag-view">
        <div className="title-crag-add">
          ADD CRAG <span className="title-province">{province}</span>
        </div>

        <div className="form-add-craga">
          <form className="form-add-crag" onSubmit={addCrag}>
            <label htmlFor="name">Crag Name</label>
            <input
              type="text"
              name="name"
              id="name"
              maxLength="45"
              autoFocus
              required
              {...bindName}
            />
            <label htmlFor="description">Crag Description</label>
            <textarea
              name="description"
              className="description-new-crag"
              id="description"
              {...bindDescription}
              maxLength="200"
              required
            ></textarea>
            <label htmlFor="latitude">Crag Latitude</label>
            <input
              type="text"
              name="latitude"
              id="latitude"
              maxLength="45"
              {...bindLatitude}
              required
              value="0"
            />
            <label htmlFor="longitude">Crag Longitude</label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              maxLength="45"
              {...bindLongitude}
              required
              value="0"
            />
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              maxLength="45"
              {...bindCity}
              required
            />
            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={province.charAt(0).toUpperCase() + province.slice(1)}
              required
              disabled
            />
            <div className="buttons-new-crag">
              <button
                type="reset"
                className="submit-add-crag"
                onClick={resetInput}
              >
                RESET
              </button>
              <button type="submit" className="submit-add-crag">
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

export default NewCrag;
