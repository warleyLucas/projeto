'use client';

import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

export default function Mapa() {
  useEffect(() => {
    // Importa o Leaflet dinamicamente
    const L = require('leaflet');

    // Cria o mapa
    const map = L.map('mapid').setView([-23.55052, -46.633308], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([-23.55052, -46.633308]).addTo(map)
      .bindPopup('Localização Exemplo')
      .openPopup();

    // Limpa o mapa ao desmontar
    return () => {
      map.remove();
    };
  }, []);

  return <div id="mapid" className="h-full w-full z-0" />;
}
