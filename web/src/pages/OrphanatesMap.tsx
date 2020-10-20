import React, { useEffect, useState } from "react";

import "../styles/pages/orphanatesMap.css";
import "leaflet/dist/leaflet.css";
import MapMarker from "../images/map-marker.png";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import api from "../services/api";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const mapIcon = Leaflet.icon({
  iconUrl: MapMarker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 9],
});

function OrphanatesList() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  console.log(orphanages);

  useEffect(() => {
    api
      .get("orphanages")
      .then((r) => setOrphanages(r.data.data))
      .catch((err) => alert("Erro ao conectar com o servidor"));
  }, []);

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
        {orphanages.map((orphanage: Orphanage) => {
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popop"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanate">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanatesList;
