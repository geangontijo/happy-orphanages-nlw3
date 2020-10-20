import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useHistory, useParams } from "react-router-dom";
import L from "leaflet";

import mapMarkerImg from "../images/map-marker.png";

import "../styles/pages/orphanage.css";
import api from "../services/api";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  about: string;
  opening_hours: string;
  open_on_weekends: string;
  images: {
    path: string;
    id: number;
  }[];
}
interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const orphanageId = params.id;
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    api
      .get(`orphanages/${orphanageId}`)
      .then((r) => setOrphanage(r.data.data))
      .catch((err) => alert("Erro ao conectar com o servidor"));
  }, [orphanageId]);

  const { goBack } = useHistory();

  console.log(orphanage);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

      <main>
        <div className="orphanage-details">
          <img
            src={orphanage.images[currentImageIndex].path}
            alt={orphanage.name}
          />

          <div className="images">
            {orphanage.images.map((img, index) => (
              <button
                className={index === currentImageIndex ? "active" : ""}
                type="button"
                key={img.id}
                onClick={() => {
                  setCurrentImageIndex(index);
                }}
              >
                <img src={img.path} alt={orphanage.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.description}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                target="_blanc"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.about}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                8h às 18h
              </div>
              {orphanage.open_on_weekends == "true" ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
