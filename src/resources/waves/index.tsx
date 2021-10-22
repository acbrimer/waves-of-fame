/* eslint-disable import/no-anonymous-default-export */
// src/resources/waves/index.tsx
import WavesList from './WavesList';
import WaveShow from './WaveShow';
import WaveCreate from './WaveCreate';
import PanToolIcon from '@material-ui/icons/PanTool';

export default {
  list: WavesList,
  show: WaveShow,
  create: WaveCreate,
  icon: PanToolIcon,
};
