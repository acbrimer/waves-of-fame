import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Layout as RALayout, Notification } from 'react-admin';
import TopAppBar from './TopAppBar';

const useStyles = makeStyles((theme) => ({
  appFrame: {
    marginTop: 0,
  },
  contentWithSidebar: {
    paddingTop: 54,
  },
}));
const Layout = (props: any) => {
  const classes = useStyles();
  return (
    <RALayout
      {...props}
      classes={{
        contentWithSidebar: classes.contentWithSidebar,
        appFrame: classes.appFrame,
      }}
      appBar={TopAppBar}
      notification={Notification}
    />
  );
};

export default Layout;
