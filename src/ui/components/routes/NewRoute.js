import React, { useState, useEffect } from "react";
import Head from "../head/Head";
import "./NewRoute.scss";
import useInput from "../hooks/useInput";
import axios from "axios";
import http from "../../../api/http";

function NewRoute({
  match: {
    params: { sectorName }
  }
}) {
  const [sector, setSector] = useState(null);
  const [name, bindName, resetName] = useInput();
  const [description, bindDescription, resetDescription] = useInput();
  const [grade, setGrade] = useState();
  const [height, bindHeight, resetHeight] = useInput();
  const [nanchor, bindNanchor, resetNanchor] = useInput();
  const [message, setMessage] = useState(null);

  const resetInput = () => {
    resetName();
    resetDescription();
    resetHeight();
    resetNanchor();
    setGrade(null);
  };

  useEffect(() => {
    axios
      .get(`${http.defaults.baseURL}api/sectors/?sectorName=${sectorName}`)
      .then(response => {
        setSector(response.data.results[0].id);
      })
      .catch(error => {
        console.log(error);
      });
  }, [sectorName]);

  const addRoute = e => {
    e.preventDefault();

    try {
      axios
        .post(
          `${http.defaults.baseURL}api/routes/add/`,
          {
            name: name,
            description: description,
            grade: grade,
            height: height,
            nanchor: nanchor,
            sector_id: sector
          },
          {
            headers: { Authorization: http.defaults.headers["Authorization"] }
          }
        )
        .then(response => {
          setMessage("Route added correctly, thanks climber!");
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
      <div className="add-route-view">
        <div className="title-route-add">
          ADD ROUTE <span className="title-province">{sectorName}</span>
        </div>

        <div className="form-add-routea">
          <form className="form-add-route" onSubmit={addRoute}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              maxLength="45"
              autoFocus
              required
              {...bindName}
            />
            <label htmlFor="description"> Description</label>
            <textarea
              name="description"
              className="description-new-route"
              id="description"
              {...bindDescription}
              maxLength="200"
              required
            ></textarea>
            <label htmlFor="grade">Grade</label>
            <select
              id="grade"
              name="grade"
              onChange={e => setGrade(e.target.value)}
            >
              <option value="?">?</option>
              <option value="5">5</option>
              <option value="6a">6a</option>
              <option value="6a+">6a+</option>
              <option value="6b">6b</option>
              <option value="6b+">6b+</option>
              <option value="6c">6c</option>
              <option value="6c+">6c+</option>
              <option value="7a">7a</option>
              <option value="7a+">7a+</option>
              <option value="7b">7b</option>
              <option value="7b+">7b+</option>
              <option value="7c">7c</option>
              <option value="7c+">7c+</option>
              <option value="8a">8a</option>
              <option value="8a+">8a+</option>
              <option value="8b">8b</option>
              <option value="8b+">8b+</option>
              <option value="8c">8c</option>
              <option value="8c+">8c+</option>
              <option value="9a">9a</option>
              <option value="9a+">9a+</option>
              <option value="9b">9b</option>
              <option value="9b+">9b+</option>
              <option value="9c">9c</option>
            </select>
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              name="height"
              maxLength="45"
              {...bindHeight}
              required
            />
            <label htmlFor="anchors">Anchors</label>
            <input
              type="number"
              id="anchors"
              name="anchors"
              maxLength="45"
              {...bindNanchor}
              required
            />
            <label htmlFor="sector">Sector</label>
            <input
              type="text"
              id="sector"
              name="sector"
              value={sectorName.charAt(0).toUpperCase() + sectorName.slice(1)}
              required
              disabled
            />
            <div className="buttons-new-route">
              <button
                type="reset"
                className="submit-add-route"
                onClick={resetInput}
              >
                RESET
              </button>
              <button type="submit" className="submit-add-route">
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

export default NewRoute;
