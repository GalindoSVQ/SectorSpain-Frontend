import React from "react";
import Autocomplete from "./Autocomplete";

const Provinces = () => {
  return (
    <>
      <Autocomplete
        options={[
          "Álava",
          "Albacete",
          "Alicante",
          "Almería",
          "Asturias",
          "Ávila",
          "Badajoz",
          "Baleares",
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
          "Palmas",
          "Rioja",
          "Pontevedra",
          "Salamanca",
          "Segovia",
          "Sevilla",
          "Soria",
          "Tarragona",
          "Tenerife",
          "Teruel",
          "Toledo",
          "Valencia",
          "Valladolid",
          "Vizcaya",
          "Zamora",
          "Zaragoza"
        ]}
      />
    </>
  );
};

export default Provinces;
