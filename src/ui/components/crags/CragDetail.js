import React, { useEffect, useReducer, useState } from "react";
import Head from "../head/Head";
import axios from "axios";
import http from "../../../api/http";

import "./CragDetail.scss";

const initialState = {
  loading: true,
  error: null,
  crags: 0,
  next: null,
  previous: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        error: null,
        crags: action.payload.results,
        loading: false,
        next: action.payload.next,
        previous: action.payload.previous
      };
    case "FETCH_ERROR":
      return {
        error: "Something went wrong, ERROR " + action.payload,
        crags: 0,
        loading: false
      };
    default:
      return state;
  }
};

function CragDetail({
  match: {
    params: { province }
  }
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `${http.defaults.baseURL}api/crags/?province=${province}&ordering=name&page=${page}`
      )
      .then(res => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_ERROR", payload: err.request });
      });
  }, [province, page]);

  return (
    <>
      <div className="head-mobile">
        <Head />
      </div>
      <div className="crag-view">
        <div className="title-crag-view">
          CRAGS <span className="title-province">{province}</span>
        </div>
        <div className="list-crags">
          {state.crags.length > 0 ? (
            <>
              <table className="table-data-crags">
                <thead>
                  <tr className="tr-title-crags">
                    <td className="crag-name"> NAME</td>
                    <td>CITY</td>
                    <td className="crag-description only-desktop">
                      DESCRIPTION
                    </td>
                    <td className="only-mobile">MAP</td>
                    <td className="only-desktop">PUB DATE</td>
                  </tr>
                </thead>
                <tbody>
                  {state.error
                    ? state.error
                    : state.loading
                    ? null
                    : state.crags.map((crag, index) => {
                        return (
                          <tr className="tr-data-crags" key={index}>
                            <td>
                              <a
                                href={`/sectors/${crag.name}`}
                                className="link-to-crag"
                              >
                                {crag.name}
                              </a>
                            </td>
                            <td> {crag.city} </td>
                            <td className="crag-description-body only-desktop">
                              {crag.description}
                            </td>
                            <td className="only-mobile map-link">
                              <a
                                href={`https://www.google.com/maps/dir//${crag.latitude},${crag.longitude}`}
                              >
                                <span
                                  role="img"
                                  aria-label="Map"
                                  className="only-mobile"
                                >
                                  &#x1f5fa;
                                </span>
                              </a>
                            </td>

                            <td className="only-desktop"> {crag.pub_date} </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
              <div className="add-crag-link">
                <a className="" href={`/new-crag/${province}`}>
                  Would you like to add another one?
                </a>
              </div>
            </>
          ) : (
            <div className="not-found">
              <h2>
                The climbing family is sad, there are not crags in this area
                yet.
                <a className="new-crag-link" href={`/new-crag/${province}`}>
                  Would you like to add one?
                </a>
              </h2>
            </div>
          )}
          <div className="crags-pages">
            {state.previous ? (
              <button
                className="button-prev-crag"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Prev Page
              </button>
            ) : null}
            {state.next ? (
              <button
                className="button-next-crag"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Next Page
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default CragDetail;
