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

export default function RedioSelected(props) {
	return (
		<Svg
			height={props.height}
			width={props.width}
			id="Layer_1"
			version="1.1"
			viewBox="0 0 9.75 9.75"
			x="0px"
			y="0px"
			xmlSpace="preserve">
			<Path
				d="M4.875,9.75C2.187,9.75,0,7.563,0,4.875S2.187,0,4.875,0S9.75,2.187,9.75,4.875S7.563,9.75,4.875,9.75z&#xA;&#x9; M4.875,0.5C2.462,0.5,0.5,2.462,0.5,4.875S2.462,9.25,4.875,9.25S9.25,7.288,9.25,4.875S7.288,0.5,4.875,0.5z"
				fill="#C8C8C8"
			/>
			<Path
				d="M4.875,2.5c1.312,0,2.375,1.063,2.375,2.375&#xA;&#x9;c0,1.311-1.064,2.375-2.375,2.375S2.5,6.186,2.5,4.875C2.5,3.563,3.563,2.5,4.875,2.5z"
				fill="#2D2D2D"
				fillRule="evenodd"
			/>
		</Svg>
	);
}
