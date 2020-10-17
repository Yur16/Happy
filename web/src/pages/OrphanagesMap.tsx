import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapIcon from "../utils/mapIcon";
import mapMarkerImg from '../images/map-marker.svg';
import api from "../services/api";

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanges, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Juazeiro do Norte</strong>
          <span>Ceará</span>
        </footer>
      </aside>

      <Map 
        center={[-7.2204294,-39.3264265]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanges.map(orphanage => {
          return (
            <Marker
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
              key={orphanage.id}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'> 
                {orphanage.name}
                <Link to={`/orphanage/${orphanage.id}`}>
                  <FiArrowRight size={20} color='#fff'/>
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link> 
    </div>
  );
}

export default OrphanagesMap;