import React from 'react';
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
  alpha,
} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HandEdit from './HandEdit';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`hand-tabpanel-${index}`}
      aria-labelledby={`hand-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `hand-tab-${index}`,
    'aria-controls': `hand-tabpanel-${index}`,
  };
}

interface StyledHandTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledHandTabs = withStyles({
  root: {
    minHeight: 'unset',
  },
  flexContainer: {
    justifyContent: 'space-between',
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})((props: StyledHandTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

interface HandTabProps {
  label: string;
}

const HandTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      color: '#fff',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      marginTop: 0,
      marginBottom: 0,
      minHeight: 'unset',
      lineHeight: 'unset',
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&:focus': {
        opacity: 1,
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  })
)((props: HandTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  wrapper: {
    backgroundColor: alpha(theme.palette.background.default, 0.2),
    borderRadius: 4,
  },
}));

interface HandTabsProps {
  refSliderY?: React.RefObject<HTMLDivElement>;
  refSliderX?: React.RefObject<HTMLDivElement>;
}

export default function HandTabs(props: HandTabsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <StyledHandTabs
          value={value}
          onChange={handleChange}
          aria-label="hand tabs (left/right)"
        >
          <HandTab label="L" {...a11yProps(0)} />
          <HandTab label="R" {...a11yProps(1)} />
        </StyledHandTabs>
        <TabPanel value={value} index={0}>
          {value === 0 && <HandEdit {...props} facing="left" />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {value === 1 && <HandEdit {...props} facing="right" />}
        </TabPanel>
      </div>
    </div>
  );
}
