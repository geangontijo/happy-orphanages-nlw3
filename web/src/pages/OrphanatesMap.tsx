import React from "react";

import "../styles/pages/orphanatesMap.css";
import "leaflet/dist/leaflet.css";
import MapMarker from "../images/map-marker.png";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map, TileLayer } from "react-leaflet";

function OrphanatesList() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarker} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Nova Serrana</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>

      <Map
        center={[-19.8562717, -45.0105913]}
        zoom={15}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        ></TileLayer>
      </Map>

      <Link to="/" className="create-orphanate">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanatesList;
