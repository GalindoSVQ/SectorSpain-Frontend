import React, { useState, useEffect } from "react";
import Head from "../head/Head";
import axios from "axios";
import http from "../../../api/http";

import "./BrowserCrags.scss";

function BrowserCrags() {
  const [data, setData] = useState([]);
  const [crag, setCrag] = useState("");
  const [cragSelected, setCragSelected] = useState("");
  const [sectors, setSectors] = useState("");
  const [sectorSelected, setSectorSelected] = useState("");
  const [dataSector, setDataSector] = useState(null);

  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = async () => {
      try {
        axios
          .get(`${http.defaults.baseURL}api/crags/map/`, {
            cancelToken: source.token
          })
          .then(res => setData(res.data))
          .catch(err => console.log());
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = async () => {
      try {
        axios
          .get(`${http.defaults.baseURL}api/crags/?cragName=${crag}`, {
            cancelToken: source.token
          })
          .then(res => setCragSelected(res.data))
          .catch(err => console.log());
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, [crag]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = async () => {
      if (cragSelected) {
        try {
          axios
            .get(
              `${http.defaults.baseURL}api/sectors/?cragID=${cragSelected.results[0].id}`,
              {
                cancelToken: source.token
              }
            )
            .then(res => setSectors(res.data))
            .catch(err => console.log(err));
        } catch (error) {
          console.log(error);
        }
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, [crag, cragSelected]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = async () => {
      if (sectorSelected.length > 0) {
        try {
          axios
            .get(
              `${http.defaults.baseURL}api/sectors/?sectorName=${sectorSelected}`,
              {
                cancelToken: source.token
              }
            )
            .then(res => setDataSector(res.data.results[0]))
            .catch(err => console.log(err));
        } catch (error) {
          console.log(error);
        }
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, [sectorSelected]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = async () => {
      if (dataSector) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${http.defaults.baseURL}api/routes/?sectorID=${dataSector.id}&ordering=name&page=${page}`,
            {
              cancelToken: source.token
            }
          );
          setRoutes(response.data);
          setIsLoading(false);
        } catch (thrown) {
          if (axios.isCancel(thrown)) {
            console.log("Request canceled", thrown.message);
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
  }, [page, dataSector]);

  return (
    <>
      <div className="head-mobile">
        <Head />
      </div>
      <div className="seeker-view">
        <div className="title-seeker-view">SEEKER CRAGS</div>
        <div className="seeker-options">
          <table className="table-seeker-view">
            <tbody>
              <tr>
                <td>
                  <label>
                    LOOK FOR A CRAG
                    <input
                      list="crags"
                      name="myBrowser"
                      className="inputs-seeker"
                      value={crag}
                      onChange={e => setCrag(e.target.value)}
                    />
                  </label>
                  <datalist id="crags">
                    {Array.isArray(data) &&
                      data.map(d => <option value={d.name} key={d.id} />)}
                  </datalist>
                </td>
                <td>
                  {cragSelected != null && cragSelected.count === 1 ? (
                    <>
                      <p>{cragSelected.results[0].description}</p>
                      <p>{cragSelected.results[0].province}</p>
                    </>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td>
                  {crag && (
                    <>
                      <label>
                        SELECT SECTOR
                        <input
                          list="sectors"
                          name="sectors"
                          className="inputs-seeker"
                          value={sectorSelected}
                          onChange={e => setSectorSelected(e.target.value)}
                        />
                      </label>
                      <datalist id="sectors">
                        {Array.isArray(sectors.results) &&
                          sectors.results.map((sector, index) => (
                            <option value={sector.name} key={index} />
                          ))}
                      </datalist>
                    </>
                  )}
                </td>
                <td>
                  {dataSector != null && sectorSelected ? (
                    <>
                      <p>{dataSector.description}</p>
                    </>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
          {dataSector && (
            <div className="list-routes">
              {sectorSelected ? (
                isLoading ? (
                  "LOADING"
                ) : routes.count > 0 ? (
                  <>
                    <table className="table-routes-seeker">
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
                              <td>{route.rating}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                    <div className="add-route-link">
                      <a
                        className=""
                        href={`/routes/new-route/${sectorSelected}`}
                      >
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
                          href={`/routes/new-route/${sectorSelected}`}
                        >
                          Would you like to add one?
                        </a>
                      </h2>
                    </div>
                  </>
                )
              ) : null}
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
          )}
        </div>
      </div>
    </>
  );
}

export default BrowserCrags;
