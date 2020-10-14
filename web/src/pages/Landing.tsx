import React from "react";

import "../styles/global.css";
import "../styles/pages/landing.css";
import LogoImg from "../images/logo.png";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={LogoImg} alt="Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>

          <div className="location">
            <strong>Nova Serrana</strong>
            <span>Minas Gerais</span>
          </div>

          <Link to="/map" className="enter-app">
            <FiArrowRight size={26} color="rgba(0,0,0.6)" />
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Landing;
