import React, { useState } from "react";
import VietnamMap from "./components/VietnamMap";
import ProvinceInfo from "./components/ProvinceInfo";
import "./App.css";

interface Province {
  id: string;
  name: string;
  capital: string;
  population: string;
  area: string;
  region: string;
}

function App() {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );

  const handleProvinceHover = (province: Province) => {
    setSelectedProvince(province);
  };

  const handleProvinceLeave = () => {
    setSelectedProvince(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Interactive Vietnam Map</h1>
        <p>Hover over provinces to see information and scale effects</p>
      </header>

      <main className="app-main">
        <div className="map-section">
          <VietnamMap
            onProvinceHover={handleProvinceHover}
            onProvinceLeave={handleProvinceLeave}
          />
        </div>

        <div className="info-section">
          <ProvinceInfo province={selectedProvince} />
        </div>
      </main>
    </div>
  );
}

export default App;
