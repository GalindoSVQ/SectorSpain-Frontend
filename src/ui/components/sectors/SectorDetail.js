import React, { useEffect, useReducer, useState } from "react";
import { ReactComponent as Topo } from "../../../assets/icons/picture_mountain.svg";

import Head from "../head/Head";
import axios from "axios";
import http from "../../../api/http";

import "./SectorDetail.scss";

const initialState = {
  loading: true,
  error: null,
  sectors: 0,
  next: null,
  previous: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        error: null,
        sectors: action.payload.results,
        loading: false,
        next: action.payload.next,
        previous: action.payload.previous
      };
    case "FETCH_ERROR":
      return {
        error: "Something went wrong, ERROR " + action.payload,
        sectors: null,
        loading: false
      };
    default:
      return state;
  }
};

function SectorDetail({
  match: {
    params: { cragName }
  }
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [crag, setCrag] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = async () => {
      axios
        .get(`${http.defaults.baseURL}api/crags/?cragName=${cragName}`, {
          cancelToken: source.token
        })
        .then(res => {
          setCrag(res.data.results[0]);
          setError("");
          setLoading(false);
        })
        .catch(err => {
          setError("Something went wrong !!");
          setCrag(null);
          setLoading(false);
        });
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, [cragName]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = async () => {
      crag.id &&
        axios
          .get(
            `${http.defaults.baseURL}api/sectors/?cragID=${crag.id}&ordering=name&page=${page}`,
            {
              cancelToken: source.token
            }
          )
          .then(res => {
            dispatch({ type: "FETCH_SUCCESS", payload: res.data });
          })
          .catch(err => {
            dispatch({ type: "FETCH_ERROR", payload: err.request.status });
          });
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, [crag, page]);

  return (
    <>
      <div className="head-mobile">
        <Head />
      </div>
      <div className="sector-view">
        <div className="title-sector-view">
          <span className="title-sector">{cragName} </span>
          sectors
        </div>
        <div className="list-sectors">
          {state.sectors.length > 0 ? (
            <>
              <table className="table-data-sectors">
                <thead>
                  <tr className="tr-title-sectors">
                    <td className="crag-name">NAME</td>
                    <td>ORIENTATION</td>
                    <td className="sector-description only-desktop">
                      DESCRIPTION
                    </td>
                    <td className="">ROPE</td>
                    <td className="">TOPO</td>
                  </tr>
                </thead>
                <tbody>
                  {state.error
                    ? state.error + error
                    : state.loading
                    ? loading
                    : state.sectors.map((sector, index) => {
                        return (
                          <tr className="tr-data-sectors" key={index}>
                            <td>
                              <a
                                href={`/routes/${sector.name}`}
                                className="link-to-sector"
                              >
                                {sector.name}
                              </a>
                            </td>
                            <td> {sector.orientation} </td>
                            <td className="sector-description-body  only-desktop">
                              {sector.description}
                            </td>
                            <td className="rope-sector">{sector.rope}</td>

                            <td className="topo-sector">
                              {sector.picture != null && (
                                <a
                                  href={sector.picture}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Topo />
                                </a>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
              <div className="add-sector-link">
                <a className="" href={`/sectors/new-sector/${cragName}`}>
                  Would you like to add another one?
                </a>
              </div>
            </>
          ) : (
            <div className="not-found">
              <h2>
                The climbing family is sad, there are not sectors in this area
                yet.
                <a
                  className="new-sector-link"
                  href={`/sectors/new-sector/${cragName}`}
                >
                  Would you like to add one?
                </a>
              </h2>
            </div>
          )}
          <div className="sectors-pages">
            {state.previous ? (
              <button
                className="button-prev-sector"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Prev Page
              </button>
            ) : null}
            {state.next ? (
              <button
                className="button-next-sector"
                onClick={() => {
                  setPage(2);
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

export default SectorDetail;
