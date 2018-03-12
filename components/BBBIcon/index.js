

/**
 *  Custom Icon Pack
 */

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';
import { Platform } from 'react-native';

const Icon = (
  Platform.OS === "android" ?
  createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf') :
  createIconSetFromIcoMoon(icoMoonConfig)
);

module.exports = Icon;
