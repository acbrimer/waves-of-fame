import React from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { makeStyles, Slider, Theme } from '@material-ui/core';
import { useForm } from 'react-final-form';

const useStyles = makeStyles<Theme>((theme) => ({
  cropRoot: {
    width: '100%',
  },
  cropContainer: {
    width: '100%',
    position: 'relative',
    '& .reactEasyCrop_Container': {
      zIndex: 1,
    },
  },
  cropControls: {},
  cropVals: {
    width: '100%',
  },
}));

interface WaveImageCropProps {
  width: number;
  url: string;
  zoom?: number;
  cropX?: number;
  cropY?: number;
}

const WaveImageCrop = (props: WaveImageCropProps) => {
  const { url, width, cropX, cropY, zoom } = props;
  const classes = useStyles();
  const form = useForm();
  const [crop, setCrop] = React.useState<Point>({
    x: cropX || 0,
    y: cropY || 0,
  });
  const [currentZoom, setZoom] = React.useState(zoom || 1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    const image = document.querySelector(
      'div.reactEasyCrop_Container img'
    ) as HTMLImageElement;
    const w = croppedAreaPixels.width;
    const h = croppedAreaPixels.height;
    const { x, y } = croppedAreaPixels;
    const xOffset = x / w;
    const yOffset = y / h;
    form.change('image.zoom', currentZoom);
    form.change('image.xOffset', xOffset);
    form.change('image.yOffset', yOffset);
    form.change('image.cropX', crop.x);
    form.change('image.cropY', crop.y);
    form.change(
      'image.orientation',
      ((image && image.width) || 1) > ((image && image.height) || 0)
        ? 'landscape'
        : 'portrait'
    );
  };
  return (
    <div className={classes.cropRoot}>
      <div className={classes.cropControls}>
        <Slider
          value={currentZoom}
          min={1}
          max={2}
          step={0.05}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(Number(zoom))}
          classes={{ root: 'slider' }}
        />
      </div>
      <div className={classes.cropContainer} style={{ height: width }}>
        <Cropper
          image={url}
          aspect={600 / 600}
          crop={crop}
          zoom={currentZoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </div>
  );
};

export default WaveImageCrop;
