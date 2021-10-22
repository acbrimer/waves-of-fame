/* eslint-disable jsx-a11y/aria-props */
import * as React from 'react';
import {
  SelectInput,
  ReferenceInput,
  useInput,
  InputProps,
  NumberInput,
  FormDataConsumer,
} from 'react-admin';
import {
  Box,
  Slider,
  SliderProps,
  Portal,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ColorInput } from 'react-admin-color-input';
import handColorPalette from './handColorPalette';

type HandEditProps = {
  facing: 'left' | 'right';
  refSliderY?: React.RefObject<HTMLDivElement>;
  refSliderX?: React.RefObject<HTMLDivElement>;
};

const SliderInput = (props: InputProps<SliderProps>) => {
  const {
    input: { name, onChange, value, ...rest },
  } = useInput(props);
  const { orientation } = props;
  return (
    <Slider
      value={value}
      min={-300}
      max={300}
      step={1}
      onChange={(e, v) => onChange(v)}
      orientation={orientation}
      {...rest}
    />
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  handSelectInput: {
    minWidth: 80,
  },
  fillColorInput: {
    marginTop: 8,
    '& label.MuiFormLabel-root': {
      width: 48,
    },
    '& div.MuiInputBase-root': {
      width: 48,
      color: 'transparent',
    },
    '& div.MuiInputBase-root.Mui-focused': {
      width: 74,
      color: '#000',
      backgroundColor: '#FFF',
      borderRadius: 2,
      paddingLeft: 4,
    },
    '& + .ColorInput-popup': {
      left: 0,
      width: '100%',
    },
  },
  fillInputDisplay: {
    width: 22,
    height: 22,
    borderRadius: 2,
    position: 'absolute',
    top: 24,
    left: 12,
  },
  zoomInput: {
    textAlign: 'center',
    '& label.MuiInputLabel-formControl': {
      textAlign: 'center',
      width: '100%',
      '& span': {
        paddingLeft: theme.spacing(2),
      },
    },
  },
}));
const HandEdit = (props: HandEditProps) => {
  const { facing, refSliderY, refSliderX } = props;
  const classes = useStyles();
  const facingLable = facing.charAt(0).toUpperCase() + facing.slice(1);
  return (
    <>
      <Box
        flexGrow={1}
        flexShrink={0}
        mr={1}
        mt={-4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <Box display="inline-flex">
          <Box
            display="inline-block"
            flexGrow={1}
            flexShrink={0}
            maxWidth={180}
            pl={1}
          >
            <ReferenceInput
              allowEmpty
              classes={{ input: classes.handSelectInput }}
              helperText={false}
              variant="standard"
              label={`${facingLable}`}
              source={`${facing}_hand.id`}
              reference="hands"
              perPage={100}
              margin="dense"
            >
              <SelectInput optionText="name" />
            </ReferenceInput>
          </Box>
          <Box ml={1} textAlign="center">
            <Box
              mt={-0.5}
              p={0}
              position="relative"
              width="100%"
              height={0}
              overflow="show"
            >
              <FormDataConsumer>
                {({ formData, ...rest }) =>
                  formData &&
                  formData[`${facing}_hand`] &&
                  formData[`${facing}_hand`].fill && (
                    <div
                      className={classes.fillInputDisplay}
                      style={{
                        backgroundColor: formData[`${facing}_hand`].fill,
                      }}
                    ></div>
                  )
                }
              </FormDataConsumer>
            </Box>
            <ColorInput
              options={{
                colors: handColorPalette,
              }}
              picker="Compact"
              className={classes.fillColorInput}
              mt={0}
              label="Color"
              source={`${facing}_hand.fill`}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Box ml={1} width={60} textAlign="center">
            <NumberInput
              fullWidth
              min={0.5}
              max={1.5}
              step={0.1}
              defaultValue={1}
              label="Zoom"
              variant="standard"
              source={`${facing}_hand.zoom`}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Box mr={1} width="25%">
            <NumberInput
              fullWidth
              min={0.5}
              max={10}
              step={0.5}
              defaultValue={2}
              label="Freq."
              variant="standard"
              source={`${facing}_hand.frequency`}
            />
          </Box>
          <Box mr={1} width="25%">
            <NumberInput
              fullWidth
              min={0}
              max={180}
              step={0.5}
              defaultValue={15}
              label="Swing Left"
              variant="standard"
              source={`${facing}_hand.amplitudeLeft`}
            />
          </Box>
          <Box width="25%">
            <NumberInput
              fullWidth
              min={1}
              max={10}
              step={0.5}
              defaultValue={2}
              label="Swing Right"
              variant="standard"
              source={`${facing}_hand.amplitudeRight`}
            />
          </Box>
        </Box>
        <Box display="flex" width="100%"></Box>
        {refSliderY && refSliderY.current && (
          <Portal container={refSliderY.current}>
            <SliderInput orientation="vertical" source={`${facing}_hand.y`} />
          </Portal>
        )}
        {refSliderX && refSliderX.current && (
          <Portal container={refSliderX.current}>
            <SliderInput source={`${facing}_hand.x`} />
          </Portal>
        )}
      </Box>
    </>
  );
};

export default HandEdit;
