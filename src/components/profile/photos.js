import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import './photos.css';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const AntTabs = withStyles({
  root: {
    borderTop: '1px solid #e8e8e8',
  },
  indicator: {
    top : "0px",
    backgroundColor: 'lightgrey',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#222',
      opacity: 1,
    },
    '&$selected': {
      color: '#222',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#222',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.grey,
  },  
}));

export default function Photos({ photos }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" centered>
          <AntTab label="POSTS" {...a11yProps(0)} />
          <AntTab label="IGTV" {...a11yProps(1)} />
          <AntTab label="SAVED" {...a11yProps(2)} />
          <AntTab label="TAGGED" {...a11yProps(3)} />
        </AntTabs>
        <Typography className={classes.padding} />
      </div>         
      <TabPanel value={value} index={0}>        
        <div className="gallery">
          {!photos
          ? new Array(12).fill(0).map((_, i) => <Skeleton key={i} width={320} height={400} />)
          : photos.length > 0
          ? photos.map((photo) => (       
			<div className="gallery-item" key={photo.docId} tabIndex="0">
				<img  className="gallery-image"
        src={photo.imageSrc} alt={photo.caption}
        />				
				<div className="gallery-item-info">
					<ul as="article">
						<li className="gallery-item-likes">              
              <FavoriteIcon /> {photo.likes.length}
            </li>
						<li className="gallery-item-comments">
              <ChatBubbleIcon /> {photo.comments.length}
            </li>
					</ul>
				</div>
			</div>
       ))
          : null}
          
           {!photos || (photos.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}
		</div>        
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    
    
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.array
};