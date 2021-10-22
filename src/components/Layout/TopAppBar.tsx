import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';

import { setSidebarVisibility } from 'react-admin';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 36,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(4),
    padding: 2,
  },
  logo: {
    flexGrow: 1,
    height: 36,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: 48,
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      marginRight: 0,
    },
  },
}));

interface TopAppBarProps {
  sidebarVisible?: boolean;
  handleSidebarVisible: (v: boolean) => void;
}

function TopAppBar(props: TopAppBarProps) {
  const { sidebarVisible, handleSidebarVisible } = props;
  const classes = useStyles();

  const handleMenuToggle = () => {
    handleSidebarVisible(!sidebarVisible);
  };

  return (
    <AppBar position="fixed">
      <Toolbar classes={{ root: classes.root }}>
        <IconButton
          onClick={handleMenuToggle}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Waves of Fame</Typography>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state: any, ownProps: any) => ({
  sidebarVisible: state.admin.ui.sidebarOpen || false,
  ...ownProps,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleSidebarVisible: (v: boolean) => dispatch(setSidebarVisibility(v)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
