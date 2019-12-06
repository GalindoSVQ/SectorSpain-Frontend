import React, { useState, useEffect } from "react";
import { ReactComponent as Topo } from "../../../assets/icons/picture_mountain.svg";
import { ReactComponent as Star } from "../../../assets/icons/star.svg";

import Head from "../head/Head";
import axios from "axios";
import http from "../../../api/http";

import "./RouteList.scss";

function RouteList({
  match: {
    params: { sectorName }
  }
}) {
  const [sector, setSector] = useState({});
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${http.defaults.baseURL}api/sectors/?sectorName=${sectorName}`,
          {
            cancelToken: source.token
          }
        );
        setSector(response.data.results[0]);
        setIsLoading(false);
      } catch (thrown) {
        if (axios.isCancel(thrown)) {
          console.log();
        } else {
          console.log(thrown);
        }
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, [sectorName]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = async () => {
      if (sector.id !== undefined) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${http.defaults.baseURL}api/routes/?sectorID=${sector.id}&ordering=name&page=${page}`,
            {
              cancelToken: source.token
            }
          );
          setRoutes(response.data);
          setIsLoading(false);
        } catch (thrown) {
          if (axios.isCancel(thrown)) {
            console.log();
          } else {
            console.log(thrown);
          }
        }
      }
    };

    loadData();
    return () => {
      source.cancel();
    };
  }, [sector, page]);

  return (
    <>
      <div className="head-mobile">
        <Head />
      </div>
      <div className="routes-view">
        <div className="title-routes-view">
          sector <span className="title-routes">{sectorName} </span>
        </div>
        <div className="sector-details">
          {isLoading ? (
            "LOADING"
          ) : (
            <>
              <p className="description-sector">{sector.description}</p>
              <table className="table-sector-details">
                <tbody>
                  <tr>
                    <th>
                      <span className="warning">
                        {sector.warning && "WARNING !"}
                      </span>
                    </th>
                    <td>
                      <span className="warning">
                        {sector.warning && sector.warning_text}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>APPROACH</th>
                    <td>{sector.approach}</td>
                  </tr>
                  <tr>
                    <th>ORIENTATION</th>
                    <td>{sector.orientation}</td>
                  </tr>
                  <tr>
                    <th>COORDINATES</th>
                    <td>
                      {sector.latitude && (
                        <>
                          <a
                            href={`https://www.google.com/maps/dir//${sector.latitude},${sector.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={require("../../../assets/icons/world-map.png")}
                              style={{ width: "30px", height: "30px" }}
                              alt="See Coordinates"
                              className="only-desktop"
                            />
                            <span
                              role="img"
                              aria-label="Map"
                              className="only-mobile"
                            >
                              &#x1f5fa;
                            </span>
                          </a>
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th> {sector.parking_coordinates && "PARKING"}</th>
                    <td>
                      {sector.parking_coordinates && (
                        <>
                          <a
                            href={`https://www.google.com/maps/dir//${sector.parking_coordinates}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span
                              role="img"
                              aria-label="Map"
                              className="only-mobile"
                            >
                              &#x1f5fa;
                            </span>
                            <img
                              src={require("../../../assets/icons/world-map.png")}
                              style={{ width: "30px", height: "30px" }}
                              alt="See Coordinates"
                              className="only-desktop"
                            />
                          </a>
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>ROCK</th>
                    <td>{sector.rock_type}</td>
                  </tr>
                  <tr>
                    <th>TOPO</th>
                    <td>
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
                </tbody>
              </table>
            </>
          )}
        </div>
        <hr className="line-routelist" />
        <div className="list-routes">
          {isLoading ? (
            "LOADING"
          ) : routes.count > 0 ? (
            <>
              <div className="title-routes-view">
                <span className="title-routes">{sectorName} </span>routes
              </div>
              <table className="table-routes-detail">
                <thead>
                  <tr>
                    <td>NAME</td>
                    <td>GRADE</td>
                    <td>HEIGHT</td>
                    <td>NANCHOR</td>
                    <td>RATING</td>
                  </tr>
                </thead>
                {routes.results.map((route, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{route.name}</td>
                        <td>{route.grade}</td>
                        <td>{route.height}</td>
                        <td>{route.nanchor}</td>
                        <td>
                          {route.rating === "1" && <Star />}
                          {route.rating === "2" && (
                            <>
                              <Star />
                              <Star />
                            </>
                          )}
                          {route.rating === "3" && (
                            <>
                              <Star />
                              <Star />
                              <Star />
                            </>
                          )}

                          {route.rating === "4" && (
                            <>
                              <Star />
                              <Star />
                              <Star />
                              <Star />
                            </>
                          )}

                          {route.rating === "5" && (
                            <>
                              <Star />
                              <Star />
                              <Star />
                              <Star />
                              <Star />
                            </>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div className="add-route-link">
                <a className="" href={`/routes/new-route/${sectorName}`}>
                  Would you like to add another one?
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="not-found-route-list">
                <h2>
                  The climbing family is sad, there are not routes in this
                  sector yet.
                  <a
                    className="new-sector-link"
                    href={`/routes/new-route/${sectorName}`}
                  >
                    Would you like to add one?
                  </a>
                </h2>
              </div>
            </>
          )}
          <div className="route-pages">
            {routes.previous ? (
              <button
                className="button-prev-route"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Prev Page
              </button>
            ) : null}
            {routes.next ? (
              <button
                className="button-next-route"
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

export default RouteList;
