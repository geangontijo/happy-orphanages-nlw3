import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";

import { FiArrowLeft, FiDelete, FiPlus, FiTrash } from "react-icons/fi";

import mapMarkerImg from "../images/map-marker.png";

import "../styles/pages/create-orphanage.css";
import Sidebar from "../components/Sidebar";
import { any } from "prop-types";
import api from "../services/api";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function mapClick(e: LeafletMouseEvent) {
    setPosition(e.latlng);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("instructions", instructions);
    formData.append("opening_hours", opening_hours);
    formData.append("open_on_weekends", String(open_on_weekends));
    formData.append("latitude", String(position.lat));
    formData.append("longitude", String(position.lng));

    images.forEach((img) => formData.append("images", img));

    await api.post("/orphanages", formData);

    alert("sucesso!");
    history.push("/map");
  }

  const { goBack } = useHistory();

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={submit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-19.8562717, -45.0105913]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={mapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.lat !== 0 && position.lng !== 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.lat, position.lng]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((img, i) => (
                  <div>
                    <img src={img} key={i} alt="Foto enviada do usuario" />
                  </div>
                ))}

                <label htmlFor="image" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.files) {
                    return;
                  }
                  let inputImages = Array.from(e.target.files);
                  setImages(inputImages);

                  setPreviewImages(
                    inputImages.map((img) => URL.createObjectURL(img))
                  );
                }}
                multiple
                type="file"
                name="image[]"
                id="image"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(e) => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends === true ? "active" : ""}
                  onClick={() => {
                    setOpenOnWeekends(true);
                  }}
                >
                  Sim
                </button>
                <button
                  className={open_on_weekends === false ? "active" : ""}
                  type="button"
                  onClick={() => {
                    setOpenOnWeekends(false);
                  }}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
