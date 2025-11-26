import React, {useRef} from "react";
import type {ObjectInputProps} from "sanity";
import {set} from "sanity";
import {Card, Stack,} from '@sanity/ui'

const VIEWBOX_WIDTH = 1482;
const VIEWBOX_HEIGHT = 1763;

export function MapPositionInput(props: ObjectInputProps) {
  const {value, onChange} = props;
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    const svgX = Math.round((relativeX / rect.width) * VIEWBOX_WIDTH);
    const svgY = Math.round((relativeY / rect.height) * VIEWBOX_HEIGHT);

    onChange(
      set({
        ...(value || {}),
        x: svgX,
        y: svgY,
      }),
    );
  };

  return (
    <Stack space={3}>
      <Card padding={2} shadow={1} radius={2} tone="transparent">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          style={{width: "100%", height: "auto", cursor: "crosshair", display: "block"}}
          onClick={handleClick}
        >
          <image
            href="/images/NorwayMap.svg"
            x={0}
            y={0}
            width={VIEWBOX_WIDTH}
            height={VIEWBOX_HEIGHT}
            preserveAspectRatio="xMidYMid meet"
          />

          {value?.x != null && value?.y != null && (
            <circle
              cx={value.x}
              cy={value.y}
              r={25}
              fill="red"
              strokeWidth={6}
            />
          )}
        </svg>
      </Card>
    </Stack>
  );
}