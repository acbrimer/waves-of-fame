import React from 'react';
import { Show, ShowProps, SimpleShowLayout, TextField } from 'react-admin';

const WaveShow = (props: ShowProps) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
      </SimpleShowLayout>
    </Show>
  );
};

export default WaveShow;
