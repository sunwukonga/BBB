import React from 'react';
import {
	Svg,
	Circle,
	Ellipse,
	G,
	LinearGradient,
	RadialGradient,
	Line,
	Path,
	Polygon,
	Polyline,
	Rect,
	Symbol,
	Text,
	Use,
	Defs,
	Stop,
} from 'react-native-svg';

export default function SearchBtn(props) {
	return (

        <Svg
    height={props.height}
    width={props.width}
    x="0px"
    y="0px"
    viewBox="0 0 50 50"
    	xmlSpace="preserve"
       >
      <Path
      id="path4746"
      style={{
        display: 'inline',
        fill: '#1fa6a4',
        fillOpacity: '1',
        stroke: 'none',
        strokeWidth: '1.92816639',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1',
      }}
          d="M 7 4 C 5.35 4 4 5.35 4 7 L 4 43 C 4 44.65 5.35 46 7 46 L 43 46 C 44.65 46 46 44.65 46 43 L 46 7 C 46 5.35 44.65 4 43 4 L 7 4 z M 22.5 13 C 27.74 13 32 17.26 32 22.5 C 32 24.76 31.210625 26.840703 29.890625 28.470703 L 37.710938 36.289062 L 36.289062 37.710938 L 28.470703 29.890625 C 26.840703 31.210625 24.76 32 22.5 32 C 17.26 32 13 27.74 13 22.5 C 13 17.26 17.26 13 22.5 13 z M 22.5 15 A 7.5 7.5 0 0 0 15 22.5 A 7.5 7.5 0 0 0 22.5 30 A 7.5 7.5 0 0 0 30 22.5 A 7.5 7.5 0 0 0 22.5 15 z"


      />
  </Svg>
	);
}
