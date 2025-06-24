import React, { useRef, useState, useEffect, useMemo } from "react";
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

const MIN_SCALE = 0.5;
const MAX_SCALE = 8;

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

  // Zoom and pan state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Touch state for pinch zoom
  const lastTouch = useRef<{
    touches: [number, number, number, number] | null;
    scale: number;
    translate: { x: number; y: number };
  }>({ touches: null, scale: 1, translate: { x: 0, y: 0 } });

  // Ref for the map container
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse wheel for zoom (manual event listener)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      let newScale = scale - e.deltaY * 0.001;
      newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
      setScale(newScale);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [scale]);

  // Touchmove for pan/pinch (manual event listener)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleTouchMove = (e: TouchEvent) => {
      // Adapted from handleTouchMove React handler
      if (e.touches.length === 1 && lastPos.current) {
        const dx = e.touches[0].clientX - lastPos.current.x;
        const dy = e.touches[0].clientY - lastPos.current.y;
        setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2 && lastTouch.current.touches) {
        const [x1, y1, x2, y2] = lastTouch.current.touches;
        const [t1, t2] = Array.from(e.touches);
        const prevDist = Math.hypot(x2 - x1, y2 - y1);
        const newDist = Math.hypot(
          t2.clientX - t1.clientX,
          t2.clientY - t1.clientY
        );
        let newScale = (lastTouch.current.scale * newDist) / prevDist;
        newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
        setScale(newScale);
        const prevMid = { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
        const newMid = {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2,
        };
        setTranslate({
          x: lastTouch.current.translate.x + (newMid.x - prevMid.x),
          y: lastTouch.current.translate.y + (newMid.y - prevMid.y),
        });
      }
      e.preventDefault();
    };
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    return () => {
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Touchstart for pan/pinch (manual event listener)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const [t1, t2] = Array.from(e.touches);
        lastTouch.current = {
          touches: [t1.clientX, t1.clientY, t2.clientX, t2.clientY],
          scale,
          translate,
        };
      }
      e.preventDefault();
    };
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
    };
  }, [scale, translate]);

  // Mouse down to start pan
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  // Mouse move to pan
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !lastPos.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  // Mouse up to stop pan
  const handleMouseUp = () => {
    setDragging(false);
    lastPos.current = null;
  };

  const handleMouseLeavePan = () => {
    setDragging(false);
    lastPos.current = null;
  };

  // Touch handlers for pan and pinch zoom
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      lastPos.current = null;
      lastTouch.current.touches = null;
    }
    e.preventDefault();
  };

  // Track hovered or tapped province
  const [hoveredProvinceId, setHoveredProvinceId] = useState<string | null>(
    null
  );
  // Track mouse position in SVG coordinates for transform-origin
  // const [hoveredMousePos, setHoveredMousePos] = useState<{
  //   x: number;
  //   y: number;
  // } | null>(null);

  // Helper to get SVG coordinates from mouse event
  const getSVGCoords = (evt: React.MouseEvent<SVGPathElement>) => {
    const svg = evt.currentTarget.ownerSVGElement;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const transformed = pt.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
  };

  // Update handlers to set hoveredProvinceId and mouse position
  const handleProvinceMouseEnter = (
    event: React.MouseEvent<SVGPathElement>
  ) => {
    const target = event.target as SVGPathElement;
    if (target.id) {
      setHoveredProvinceId(target.id);
      const province = provinces.find((p) => p.id === target.id);
      if (province) {
        onProvinceHover(province);
      }
    }
  };

  const handleProvinceMouseLeave = () => {
    setHoveredProvinceId(null);
    onProvinceLeave();
  };

  const handleProvinceClick = (event: React.MouseEvent<SVGPathElement>) => {
    const target = event.target as SVGPathElement;
    if (target.id) {
      setHoveredProvinceId(target.id);
      const province = provinces.find((p) => p.id === target.id);
      if (province) {
        onProvinceHover(province);
      }
    }
  };

  const handleProvinceTouchEnd = (event: React.TouchEvent<SVGPathElement>) => {
    if (event.changedTouches.length === 1 && event.touches.length === 0) {
      const target = event.target as SVGPathElement;
      if (target.id) {
        // For touch, use the centroid of the path as fallback
        setHoveredProvinceId(target.id);
        const province = provinces.find((p) => p.id === target.id);
        if (province) {
          onProvinceHover(province);
        }
      }
    }
  };

  // Deselect on background click
  const handleMapBackgroundClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (event.target === event.currentTarget) {
      setHoveredProvinceId(null);
      onProvinceLeave();
    }
  };

  // Generate a random pastel color for each province, memoized for consistency
  const provinceColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    vietnamMapData.locations.forEach((location) => {
      const hue = Math.floor(Math.random() * 360);
      const sat = 60 + Math.random() * 20;
      const light = 60 + Math.random() * 15;
      map[location.id] = `hsl(${hue}, ${sat}%, ${light}%)`;
    });
    return map;
  }, []);

  // Refs and state for bounding boxes
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});

  return (
    <div
      ref={containerRef}
      className="vietnam-map-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeavePan}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "none" }}
    >
      <div className="vietnam-map">
        <svg
          viewBox={vietnamMapData.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          style={{ userSelect: "none" }}
          onClick={handleMapBackgroundClick}
        >
          <defs>
            {/* Drop shadow filter for 3D effect */}
            <filter
              id="province-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="4"
                floodColor="#1971c2"
                floodOpacity="0.25"
              />
            </filter>
          </defs>
          <g
            transform={`translate(${translate.x},${translate.y}) scale(${scale})`}
          >
            {/* Render all extrusions first */}
            {vietnamMapData.locations.map((location) => (
              <path
                key={location.id + "-extrude"}
                d={location.path}
                transform="translate(0, 4)"
                fill="#274472"
                opacity="0.85"
                style={{ filter: "none", pointerEvents: "none" }}
              />
            ))}
            {/* Render all main province paths on top */}
            {vietnamMapData.locations.map((location) => [
              // Base shadow path (visual only)
              <path
                key={location.id + "-base"}
                d={location.path}
                fill="#111827"
                opacity="0.1"
                style={{ filter: "none" }}
              />,
              // Main path (interactive)
              <path
                key={location.id}
                id={location.id}
                d={location.path}
                className="province"
                data-region={
                  provinces.find((p) => p.id === location.id)?.region ||
                  "Unknown"
                }
                fill={provinceColorMap[location.id]}
                stroke="#fff"
                strokeWidth="1.5"
                filter="url(#province-shadow)"
                onMouseEnter={handleProvinceMouseEnter}
                onMouseLeave={handleProvinceMouseLeave}
                onClick={handleProvinceClick}
                onTouchEnd={handleProvinceTouchEnd}
                ref={(el) => {
                  pathRefs.current[location.id] = el;
                }}
                style={
                  hoveredProvinceId === location.id
                    ? { opacity: 0.1 }
                    : { transition: "transform 0.3s" }
                }
              />,
              // Scaled-up path (only if hovered/tapped)
              hoveredProvinceId === location.id && (
                <path
                  key={location.id + "-scaled"}
                  d={location.path}
                  fill={provinceColorMap[location.id]}
                  stroke="#fff"
                  strokeWidth="1.5"
                  filter="url(#province-shadow)"
                  style={{
                    transform: "translateY(-5px)",
                    transition: "transform 0.3s",
                    pointerEvents: "none",
                  }}
                />
              ),
            ])}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default VietnamMap;
