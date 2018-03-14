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

export default function CheckboxChecked(props) {
	return (
		<Svg
			height={props.height}
			id="Layer_1"
			width={props.width}
			version="1.1"
			viewBox="0 0 9.753 9.749"
			x="0px"
			y="0px"
			xmlSpace="preserve">
			<Path
				d="M8.269,9.749H1.483C0.665,9.749,0,9.084,0,8.267V1.483C0,0.665,0.665,0,1.483,0h6.786&#xA;&#x9;c0.818,0,1.484,0.665,1.484,1.483v6.784C9.753,9.084,9.087,9.749,8.269,9.749z M1.483,0.5C0.941,0.5,0.5,0.941,0.5,1.483v6.784&#xA;&#x9;c0,0.542,0.441,0.982,0.983,0.982h6.786c0.543,0,0.984-0.44,0.984-0.982V1.483c0-0.542-0.441-0.983-0.984-0.983H1.483z"
				fill="#C8C8C8"
			/>
			<Polygon
				fill="#010101"
				points="1.677,5.104 2.12,4.544 3.916,6.229 7.604,2.534 8.077,3.006 3.866,7.215 "
			/>
		</Svg>
	);
}
