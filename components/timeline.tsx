import React from 'react';
import Blob from './blob';
import { Keyword } from '../pages/index';
import { ThreeEvent } from '@react-three/fiber';
import { Vector3 } from "three";

interface TimelineProps {
  keywords: Keyword[];
  onPointerOver: (keyword: Keyword, event: any) => void;
  onPointerOut: () => void;
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void;
}

const Timeline: React.FC<TimelineProps> = ({ keywords, onPointerOver, onPointerOut, onPointerMove }) => {
  if (keywords.length === 0) {
    return null; // or return some placeholder content
  }

  // Sort keywords by Start Year in ascending order
  const sortedKeywords = [...keywords].sort((a, b) => a['Start Year'] - b['Start Year']);

  // Find the earliest Start Year
  const earliestStartYear = sortedKeywords[0]['Start Year'];


  return (
    <group>
      {sortedKeywords.map((keyword, index) => {
        const positionX = (keyword['Start Year'] - earliestStartYear) * 5;
        return (
          <Blob
            key={index}
            position={new Vector3(positionX, 0,0)}
            scale={new Vector3((keyword['End Year'] - keyword['Start Year']) , keyword['Usage Rating'], keyword['Usage Rating'])}
            onPointerOver={(event: any) => onPointerOver(keyword, event)}
            onPointerOut={onPointerOut}
            onPointerMove={onPointerMove}
          />
        );
      })}
    </group>
  );
};

export default Timeline;