import React, { Key } from 'react'
import { Keyword } from '../pages/index';

interface MousePos {
  x: number;
  y: number;
}
type HoverInfoProps = {
  mousePos: MousePos;
  keyword: Keyword;
};


const HoverInfo = ({mousePos, keyword}: HoverInfoProps) => {
  return (
    <div
        style={{
          position: "absolute",
          bottom: mousePos.y,
          left: mousePos.x,
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateX(-50%)",
          gap: 5,
          backgroundColor: "rgba(255, 255, 255, 0.2)", 
          backdropFilter: "blur(10px)",
          borderRadius: "10px", 
          padding: "10px", 
          color: "white",
          fontSize: 12
        }}
        >
          <p style={{ margin: 0 }}>{keyword["Name"]}</p>
          <p style={{ margin: 0, color: "lightgray" }}>
            {keyword["Start Year"]} - {keyword["End Year"]}
          </p>
        </div>
  )
}

export default HoverInfo