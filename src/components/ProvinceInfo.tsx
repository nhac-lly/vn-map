import React from "react";
import "./ProvinceInfo.css";

interface Province {
  id: string;
  name: string;
  capital: string;
  population: string;
  area: string;
  region: string;
}

interface ProvinceInfoProps {
  province: Province | null;
}

const ProvinceInfo: React.FC<ProvinceInfoProps> = ({ province }) => {
  if (!province) {
    return (
      <div className="province-info">
        <div className="info-card">
          <div className="info-header">
            <h3>Province Information</h3>
          </div>
          <div className="info-content">
            <div className="placeholder">
              <div className="placeholder-icon">🗺️</div>
              <p>Hover over a province to see detailed information</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="province-info">
      <div className="info-card">
        <div className="info-header">
          <h3>{province.name}</h3>
          <span className="region-badge">{province.region}</span>
        </div>

        <div className="info-content">
          <div className="info-item">
            <div className="info-label">
              <span className="icon">🏛️</span>
              Capital
            </div>
            <div className="info-value">{province.capital}</div>
          </div>

          <div className="info-item">
            <div className="info-label">
              <span className="icon">👥</span>
              Population
            </div>
            <div className="info-value">{province.population}</div>
          </div>

          <div className="info-item">
            <div className="info-label">
              <span className="icon">📏</span>
              Area
            </div>
            <div className="info-value">{province.area}</div>
          </div>

          <div className="info-item">
            <div className="info-label">
              <span className="icon">🌍</span>
              Region
            </div>
            <div className="info-value">{province.region}</div>
          </div>
        </div>

        <div className="info-footer">
          <button className="learn-more-btn">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default ProvinceInfo;
