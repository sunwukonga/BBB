import React, { Component } from 'react';
import {
	Container,
	Content,
	Header,
	Item,
	Left,
	Body,
	Right,
	Title,
	Button,
	Icon,
} from 'native-base';
import { Text, Platform, View, InteractionManager } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

// Styles and Theme
import { Layout, Colors } from '../../constants/';
import styles from './styles';

// Custom Components
import BBBIcon from '../BBBIcon';
/**
 *  BBB Header Component
 */
class BBBHeader extends Component {
	// Handle Back Press
	_handleBack = () => {
		const { onBack } = this.props;

		if (onBack) {
			return requestAnimationFrame(() => {
				this.props.onBack();
			});
		}

		// universal back action
		this.props.navigation.goBack();
	};

	// Handle Search Icon Press
	_handleSearchPress = () => {
		// if(this.props.onSearch) {
		//   requestAnimationFrame(() => {
		//     this.props.onSearch();
		//   });
		// }
		alert('Search Clicked');
	};

	shouldComponentUpdate() {
		return false;
	}

	_renderRightComponent = () => {
		const { rightComponent, enableSearch } = this.props;

		// Render Custom Right Component
		if (rightComponent) {
			return rightComponent;
		}

		// Render Search Icon
		if (enableSearch) {
			return (
				<Button transparent onPress={this._handleSearchPress}>
					<BBBIcon
						name="Search"
						style={{ color: '#ffffff' }}
						size={Layout.moderateScale(18)}
					/>
				</Button>
			);
		}

		return undefined;
	};

	_renderLeftComponent() {
		const { leftComponent, enableBack } = this.props;

		// if given custom left component
		if (leftComponent) {
			return leftComponent;
		}

		// if back button enabled
		if (enableBack) {
			return (
				<Button transparent onPress={this._handleBack}>
					<EvilIcons
						name="chevron-left"
						size={Layout.moderateScale(20)}
						color="#fff"
						style={{ marginLeft: -(Layout.WIDTH * 0.03) }}
					/>
				</Button>
			);
		}

		// if nothing given
		return undefined;
	}

	_renderTitleComponent() {
		const { titleComponent, title } = this.props;

		// if given custom title component
		if (titleComponent) {
			return titleComponent;
		}

		// if button enabled
		if (title) {
			return <Title style={styles.headerTitle}>{this.props.title}</Title>;
		}

		// if nothing given
		return undefined;
	}

	render() {
		var headerStyle = this.props.headerStyle;
		if (this.props.search) {
			return this._renderSearchHeader();
		}

		return (
			<Header
				androidStatusBarColor={Colors.mainheaderbg}
				style={[styles.header, headerStyle]}>
				{/* Take up the space */}
				<Left style={styles.left}>{this._renderLeftComponent()}</Left>

				{/* Title */}
				<Body style={styles.body}>{this._renderTitleComponent()}</Body>

				{/* Right Icon */}
				<Right style={styles.right}>{this._renderRightComponent()}</Right>
			</Header>
		);
	}
}

export default BBBHeader;
