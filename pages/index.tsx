import { Canvas, ThreeEvent } from "@react-three/fiber";
import {
  AccumulativeShadows,
  CameraControls,
  RandomizedLight,
  Stars,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import Timeline from "../components/timeline";
import NavigationTip from "../components/navigationTip";
import HoverInfo from "../components/hoverInfo";

export interface Keyword {
  Name: string;
  "Start Year": number;
  "End Year": number;
  "Usage Rating": number;
}

export default function Home() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const controls = useRef<CameraControls | null>(null);
  const [isPressing, setIsPressing] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [hoveredKeyword, setHoveredKeyword] = useState<Keyword | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("/api/keywords")
      .then((response) => response.json())
      .then((data) => setKeywords(data));
  }, []);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsPressing(true);
      if (event.clientX < window.innerWidth / 2) {
        setDirection("left");
      } else {
        setDirection("right");
      }
    };

    const handleMouseUp = () => {
      setIsPressing(false);
      setDirection(null);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPressing && direction) {
      interval = setInterval(() => {
        if (direction === "left") {
          controls.current?.truck(-4, 0.0, true);
        } else if (direction === "right") {
          controls.current?.truck(4, 0.0, true);
        }
      }, 16);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPressing, direction]);

  const handlePointerOver = (keyword: Keyword, event: React.PointerEvent) => {
    setHoveredKeyword(keyword);
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handlePointerOut = () => {
    setHoveredKeyword(null);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (hoveredKeyword) {
      setMousePos({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <>
      <Canvas
        camera={{ position: [0, -100, 100.0] as [number, number, number] }}
      >
        <Timeline
          keywords={keywords}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onPointerMove={handlePointerMove}
        />
        <CameraControls ref={controls} />
        <AccumulativeShadows temporal frames={100} scale={10}>
          <RandomizedLight amount={8} position={[5, 5, -10]} />
        </AccumulativeShadows>
        <Stars
          radius={300}
          depth={100}
          count={50000}
          factor={8}
          saturation={5}
          fade
          speed={1}
        />
      </Canvas>
      {hoveredKeyword && (
        <HoverInfo mousePos={mousePos} keyword={hoveredKeyword}></HoverInfo>
      )}
      <NavigationTip></NavigationTip>
    </>
  );
}
