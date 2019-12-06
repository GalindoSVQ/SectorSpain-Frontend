import React, { useState, useEffect, useContext } from "react";
import { ProvinceContext } from "../../routes/auth/AuthRoutes";
import MobileHead from "../header/MobileHead";
import http from "../../../api/http";
import axios from "axios";
import "./province.scss";

function ProvincesMobile() {
  const province = useContext(ProvinceContext);
  const [data, setData] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${http.defaults.baseURL}api/crags/?province=${province}`
      );
      setData(result.data);
    };
    fetchData();
  }, [province]);

  useEffect(() => {
    if (selectedSector != null) {
      window.location.href = `/sector/${selectedSector.name}`;
    }
  }, [selectedSector]);

  return (
    <>
      <MobileHead />
      <div className="sectors-list">
        <h1>{province.toUpperCase()}</h1>
        <h2>SPORT CLIMBING CRAGS</h2>
        <hr className="line" />
        {data.count > 0 ? (
          <>
            <div className="yes-result">
              <table className="table-results" key={data.length}>
                <tbody>
                  <tr className="titles">
                    <td> SECTOR </td>
                    <td> CITY </td>
                    <td> MAP </td>
                    <td> DATE </td>
                  </tr>
                  {data.results.map((crag, index) => {
                    return (
                      <tr
                        className="sons-results"
                        key={index}
                        onClick={() => setSelectedSector(crag)}
                      >
                        <td> {crag.name} </td>
                        <td> {crag.city} </td>
                        <td> {crag.map} </td>
                        <td> {crag.mod_date} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="no-result">
              <h2>
                The climbing family is sad, there are no crags in this area yet.{" "}
                <a href="/new-crag">
                  {" "}
                  <p>Would you like to add one?</p>{" "}
                </a>{" "}
              </h2>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProvincesMobile;
