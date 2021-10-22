/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useQueryWithStore, Loading } from 'react-admin';
import { Box, makeStyles } from '@material-ui/core';


export interface HandProps {
  id: number;
  facing: 'left' | 'right';
  x?: number;
  y?: number;
  zoom?: number;
  fill?: string;
  frequency?: number;
  amplitudeLeft?: number;
  amplitudeRight?: number;
}

const useStyles = makeStyles(() => ({
  hand: {},
  wave1: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
    transformOrigin: '50% 90%',
    animationName: `$wave-1`,
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'ease-in-out',
  },
  '@keyframes wave-1': {
    '0%': {
      transform: 'rotate(var(--amplitudeLeft))',
    },
    '100%': {
      transform: 'rotate(var(--amplitudeRight))',
    },
  },
}));



const Hand = (props: HandProps) => {
  const {
    id,
    facing,
    x,
    y,
    zoom,
    fill,
    frequency,
    amplitudeLeft,
    amplitudeRight,
  } = props;
  const classes = useStyles();
  const { loaded, error, data } = useQueryWithStore({
    type: 'getOne',
    resource: 'hands',
    payload: { id: id },
  });

  if (!loaded) {
    return <Loading />;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <>
    
      <g
        transform={`translate(${x || 0} ${(y || 0) * -1}) scale(${zoom || 1})`}
      >
        <path
          style={{
            ['--amplitudeLeft' as string]: `${(amplitudeLeft || 20) * -1}deg`,
            ['--amplitudeRight' as string]: `${amplitudeRight || 20}deg`,
            animationDuration: `${frequency || 3}s`,
          }}
          className={classes.wave1}
          fill={fill || '#000'}
          d={data[facing].hand}
        />

      </g>

    </>
  );
};

export default Hand;
