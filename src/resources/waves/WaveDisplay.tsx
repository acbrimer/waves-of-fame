/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Hand, { HandProps } from '../hands/Hand';

interface ImageStyleProps {
  zoom: number;
  xOffset: number;
  yOffset: number;
  orientation: 'landscape' | 'portrait';
}
interface ImageDisplayProps {
  url: string;
}

interface WaveDisplayProps {
  image: ImageDisplayProps & ImageStyleProps;
  left_hand?: HandProps;
  right_hand?: HandProps;
}

const useStyles = makeStyles<Theme>((theme) => ({
  waveSvg: {
    maxWidth: 600,
    maxHeight: 600,
    position: 'relative',
    border: '1px solid gray',
    overflow: 'hidden',
  },
  imageLandscape: {
    position: 'absolute',
    width: 'auto',
  },
  imagePortrait: {
    position: 'absolute',
    width: '100%',
    height: 'auto',
  },
}));
const WaveDisplay = (props: WaveDisplayProps) => {
  const { image, left_hand, right_hand } = props;
  const { url, zoom, xOffset, yOffset, orientation } = image;
  const classes = useStyles();
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [imageOffsetX, setImageOffsetX] = React.useState<number>(0);
  const [imageOffsetY, setImageOffsetY] = React.useState<number>(0);
  const [imageZoom, setImageZoom] = React.useState<number>(1);
  const [leftHand, setLeftHand] = React.useState<HandProps>();
  const [rightHand, setRightHand] = React.useState<HandProps>();

  React.useEffect(() => {
    xOffset && setImageOffsetX(xOffset);
    yOffset && setImageOffsetY(yOffset);
    zoom && setImageZoom(zoom);
    url && setImageUrl(url);
    setLeftHand(left_hand);
    setRightHand(right_hand);
  }, [url, left_hand, right_hand, xOffset, yOffset, zoom, orientation]);

  return (
    <svg viewBox="0 0 600 600" className={classes.waveSvg}>
      {imageUrl && (
        <image
          id="mainImage"
          x={`${-100 * imageOffsetX}%`}
          y={`${-100 * imageOffsetY}%`}
          height={`${100 * imageZoom}%`}
          className={clsx({
            [classes.imageLandscape]: orientation === 'landscape',
            [classes.imagePortrait]: orientation === 'portrait',
          })}
          href={url}
        />
      )}
      {leftHand && leftHand.id && <Hand {...{ ...leftHand, facing: 'left' }} />}
      {rightHand && rightHand.id && (
        <Hand {...{ ...rightHand, facing: 'right' }} />
      )}
    </svg>
  );
};

export default WaveDisplay;
