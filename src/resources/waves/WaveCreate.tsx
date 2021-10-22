/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  CreateProps,
  FormDataConsumer,
  NumberInput,
} from 'react-admin';
import {
  IconButton,
  Button,
  Box,
  Collapse,
  makeStyles,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import { withSize, SizeMeProps } from 'react-sizeme';
import WaveDisplay from './WaveDisplay';
import WaveImageCrop from './WaveImageCrop';

import HandTabs from './HandTabs';

const useStyles = makeStyles(() => ({
  createRoot: {
    height: '100%',
  },
  createMain: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formRoot: {
    width: '100%',
    height: '100%',
  },
  createCard: {
    width: '100%',
    maxWidth: 800,
  },
  ySliderRoot: {
    position: 'absolute',
    width: 20,
    height: '100%',
    left: -21,
    alignItems: 'center',
    zIndex: 10,
  },
  xSliderRoot: {
    position: 'absolute',
    height: 20,
    width: '100%',
    textAlign: 'center',
    top: -22,
    zIndex: 10,
  },
}));

const WaveToolbar = () => <div></div>;

const WaveCreate = (props: CreateProps & SizeMeProps) => {
  const { size } = props;
  const classes = useStyles();
  const [cropView, setCropView] = React.useState<boolean>(true);
  const [width, setWidth] = React.useState<number>();
  const handleCropSave = () => setCropView(false);
  const handleCropView = () => setCropView(true);
  const refSliderX = React.useRef<HTMLDivElement>(null);
  const refSliderY = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    size.width && setWidth(size.width > 800 ? 800 : size.width);
  }, [size]);
  return (
    <Create
      classes={{
        root: classes.createRoot,
        main: classes.createMain,
        card: classes.createCard,
      }}
      {...props}
    >
      <SimpleForm margin="none" toolbar={<WaveToolbar />}>
        <Box className={classes.formRoot} display="flex" flexDirection="column">
          <Collapse in={cropView}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              zIndex={2}
            >
              <Box flexGrow={1}>
                <TextInput
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  source="image.url"
                />
              </Box>
              <Box flexGrow={0} ml={1} pb={3} zIndex={2}>
                <IconButton size="small" onClick={handleCropSave}>
                  <CheckCircleIcon color="action" />
                </IconButton>
              </Box>
              <Box display="none">
                <NumberInput source="image.zoom" />
                <NumberInput source="image.xOffset" />
                <NumberInput source="image.yOffset" />
                <NumberInput source="image.cropX" />
                <NumberInput source="image.cropY" />
              </Box>
            </Box>
          </Collapse>

          <Box
            position="relative"
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <div
              ref={refSliderX}
              id="xSliderRoot"
              className={classes.xSliderRoot}
            ></div>
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData.image &&
                formData.image.url &&
                (cropView ? (
                  <WaveImageCrop width={width} {...formData.image} />
                ) : (
                  <>
                    <Box
                      position="absolute"
                      top={0}
                      right={0}
                      left="auto"
                      zIndex={10}
                    >
                      <IconButton size="small" onClick={handleCropView}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                    <WaveDisplay {...formData} />
                  </>
                ))
              }
            </FormDataConsumer>

            <div
              ref={refSliderY}
              id="ySliderRoot"
              className={classes.ySliderRoot}
            ></div>
          </Box>

          <FormDataConsumer>
            {({ formData, ...rest }) => (
              <Collapse in={formData.image && formData.image.url && !cropView}>
                <Box display="flex" flexDirection="row" flexWrap="wrap">
                  <HandTabs
                    refSliderX={
                      formData.image && formData.image.url && !cropView
                        ? refSliderX
                        : undefined
                    }
                    refSliderY={
                      formData.image && formData.image.url && !cropView
                        ? refSliderY
                        : undefined
                    }
                  />
                </Box>
              </Collapse>
            )}
          </FormDataConsumer>

        </Box>
      </SimpleForm>
    </Create>
  );
};

export default withSize({ refreshMode: 'debounce' })(WaveCreate);
