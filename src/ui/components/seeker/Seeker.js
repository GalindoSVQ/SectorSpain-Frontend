import React, { useState } from "react";
import "./seeker.scss";
import { Redirect } from "react-router-dom";

function Seeker() {
  const provinces = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Avila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ceuta",
    "Ciudad Real",
    "Córdoba",
    "Coruña",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Baleares",
    "Jaén",
    "León",
    "Lérida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Melilla",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Las Palmas",
    "Pontevedra",
    "La Rioja",
    "Salamanca",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Santa Cruz de Tenerife",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza"
  ];

  const [province, setProvince] = useState(null);

  return (
    <>
      {province != null ? (
        <Redirect
          to={`crags/${province
            .toLowerCase()
            .normalize("NFD")
            .replace(
              /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
              "$1"
            )}`}
        />
      ) : (
        <div className="seeker box">
          <div className="box">
            <h1> ROCK CLIMB FINDER IN SPAIN </h1>

            <form className="form-seeker">
              <label htmlFor="select-provinces">CHOOSE PROVINCE</label>
              <select
                onChange={e => setProvince(e.target.value)}
                name="select-provinces"
                id="select-provinces"
                className="select-province"
              >
                <option value="" key="no-value">
                  PROVINCES
                </option>
                {provinces.map((pro, index) => {
                  return (
                    <option value={pro} key={index}>
                      {pro}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Seeker;
