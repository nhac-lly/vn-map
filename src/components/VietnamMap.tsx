import React from "react";
import vietnamMapData from "@svg-country-maps/vietnam";
import "./VietnamMap.css";

interface Province {
  id: string;
  name: string;
  capital: string;
  population: string;
  area: string;
  region: string;
}

interface VietnamMapProps {
  onProvinceHover: (province: Province) => void;
  onProvinceLeave: () => void;
}

const VietnamMap: React.FC<VietnamMapProps> = ({
  onProvinceHover,
  onProvinceLeave,
}) => {
  // Real Vietnam provinces data mapped to the SVG map provinces
  const provinces: Province[] = [
    // Northern Vietnam
    {
      id: "hanoi",
      name: "Hà Nội",
      capital: "Hà Nội",
      population: "8.4M",
      area: "3,359 km²",
      region: "Red River Delta",
    },
    {
      id: "haiphong",
      name: "Hải Phòng",
      capital: "Hải Phòng",
      population: "2.1M",
      area: "1,527 km²",
      region: "Red River Delta",
    },
    {
      id: "quang-ninh",
      name: "Quảng Ninh",
      capital: "Hạ Long",
      population: "1.3M",
      area: "6,178 km²",
      region: "Northeast",
    },
    {
      id: "lang-son",
      name: "Lạng Sơn",
      capital: "Lạng Sơn",
      population: "0.8M",
      area: "8,310 km²",
      region: "Northeast",
    },
    {
      id: "cao-bang",
      name: "Cao Bằng",
      capital: "Cao Bằng",
      population: "0.5M",
      area: "6,700 km²",
      region: "Northeast",
    },
    {
      id: "ha-giang",
      name: "Hà Giang",
      capital: "Hà Giang",
      population: "0.8M",
      area: "7,929 km²",
      region: "Northeast",
    },
    {
      id: "lao-cai",
      name: "Lào Cai",
      capital: "Lào Cai",
      population: "0.7M",
      area: "6,364 km²",
      region: "Northeast",
    },
    {
      id: "yen-bai",
      name: "Yên Bái",
      capital: "Yên Bái",
      population: "0.8M",
      area: "6,899 km²",
      region: "Northeast",
    },
    {
      id: "tuyen-quang",
      name: "Tuyên Quang",
      capital: "Tuyên Quang",
      population: "0.8M",
      area: "5,868 km²",
      region: "Northeast",
    },
    {
      id: "son-la",
      name: "Sơn La",
      capital: "Sơn La",
      population: "1.2M",
      area: "14,123 km²",
      region: "Northwest",
    },
    {
      id: "lai-chau",
      name: "Lai Châu",
      capital: "Lai Châu",
      population: "0.4M",
      area: "9,068 km²",
      region: "Northwest",
    },
    {
      id: "hoa-binh",
      name: "Hòa Bình",
      capital: "Hòa Bình",
      population: "0.8M",
      area: "4,591 km²",
      region: "Northwest",
    },
    {
      id: "ninh-binh",
      name: "Ninh Bình",
      capital: "Ninh Bình",
      population: "0.9M",
      area: "1,387 km²",
      region: "Red River Delta",
    },
    {
      id: "thai-binh",
      name: "Thái Bình",
      capital: "Thái Bình",
      population: "1.8M",
      area: "1,546 km²",
      region: "Red River Delta",
    },
    {
      id: "thanh-hoa",
      name: "Thanh Hóa",
      capital: "Thanh Hóa",
      population: "3.6M",
      area: "11,106 km²",
      region: "North Central Coast",
    },
    {
      id: "nghe-an",
      name: "Nghệ An",
      capital: "Vinh",
      population: "3.3M",
      area: "16,487 km²",
      region: "North Central Coast",
    },
    {
      id: "ha-tinh",
      name: "Hà Tĩnh",
      capital: "Hà Tĩnh",
      population: "1.3M",
      area: "6,026 km²",
      region: "North Central Coast",
    },
    {
      id: "quang-binh",
      name: "Quảng Bình",
      capital: "Đồng Hới",
      population: "0.9M",
      area: "8,065 km²",
      region: "North Central Coast",
    },
    {
      id: "quang-tri",
      name: "Quảng Trị",
      capital: "Đông Hà",
      population: "0.6M",
      area: "4,746 km²",
      region: "North Central Coast",
    },
    {
      id: "thua-thien-hue",
      name: "Thừa Thiên–Huế",
      capital: "Huế",
      population: "1.1M",
      area: "5,053 km²",
      region: "North Central Coast",
    },
    {
      id: "quang-nam",
      name: "Quảng Nam",
      capital: "Tam Kỳ",
      population: "1.5M",
      area: "10,438 km²",
      region: "Central Coast",
    },
    {
      id: "quang-ngai",
      name: "Quảng Ngãi",
      capital: "Quảng Ngãi",
      population: "1.2M",
      area: "5,152 km²",
      region: "Central Coast",
    },
    {
      id: "binh-dinh",
      name: "Bình Định",
      capital: "Qui Nhơn",
      population: "1.5M",
      area: "6,039 km²",
      region: "Central Coast",
    },
    {
      id: "kon-tum",
      name: "Kon Tum",
      capital: "Kon Tum",
      population: "0.5M",
      area: "9,689 km²",
      region: "Central Highlands",
    },
    {
      id: "gia-lai",
      name: "Gia Lai",
      capital: "Pleiku",
      population: "1.5M",
      area: "15,537 km²",
      region: "Central Highlands",
    },
  ];

  const handleMouseEnter = (event: React.MouseEvent<SVGPathElement>) => {
    const target = event.target as SVGPathElement;
    if (target.id) {
      const province = provinces.find((p) => p.id === target.id);
      if (province) {
        onProvinceHover(province);
      }
    }
  };

  const handleMouseLeave = () => {
    onProvinceLeave();
  };

  return (
    <div className="vietnam-map-container">
      <div className="vietnam-map">
        <svg
          viewBox={vietnamMapData.viewBox}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Province paths */}
          {vietnamMapData.locations.map((location) => (
            <path
              key={location.id}
              id={location.id}
              d={location.path}
              className="province"
              data-region={
                provinces.find((p) => p.id === location.id)?.region || "Unknown"
              }
              fill="#4dabf7"
              stroke="#1971c2"
              strokeWidth="0.5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default VietnamMap;
