import { Avatar, Button, Container, Divider, InputBase} from '@material-ui/core';
import React, { useContext } from 'react'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/user';
import './header.css';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import useUser from '../hooks/use-user';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
   small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  search: {
    position: 'relative',    
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {    
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
        
  },
  inputInput: {
    padding: theme.spacing(0, 1, 1 , 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Header() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);  
  const { firebase } = useContext(FirebaseContext);
  
  const history = useHistory();   
  
     const classes = useStyles();
     
    return (
      <div className={classes.root}>
    <div className="main-header">
      <Container maxWidth="md">
        <div className="main__header">
        <div className="main__logo">
          <Link to={ROUTES.DASHBOARD}>
          <img 
          className="logo__image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""/>
          </Link>
        </div>
        <div className="main__search">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
          <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </div>
        </div>
        <div className="main__header__links">

           {loggedInUser ? (
            <>
            <Link to={ROUTES.DASHBOARD}>
              <div className="header_links">
                <HomeIcon />
              </div>
            </Link>
              <Link to={ROUTES.DASHBOARD}  >
                <div className="header_links"> <ExploreIcon /></div>
            </Link>                        
            
              <div className="header_links">
              <FavoriteBorderIcon />
            </div>
             {user && (
              <div className="header_links">
                                          
        <Avatar         
        alt={`${user?.fullName} profile`}
        src={`/images/avatars/${user?.username}.jpg`}
        aria-controls="customized-menu"
        aria-haspopup="true"        
        color="primary"
        onClick={handleClick}
        className={classes.small}
        />                          
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to={`/p/${user?.username}`}>
        <StyledMenuItem>
          <ListItemIcon>
            <AccountCircleRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>
        </Link>
        <StyledMenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
          primary="Log Out"
           onClick={() => {
                    firebase.auth().signOut();
                    history.push(ROUTES.LOGIN);
                  }}
          onKeyDown={(event) =>{
            if(event.key === 'Enter') {
              firebase.auth().signOut();
              history.push(ROUTES.LOGIN);
            }
          }}
          />
        </StyledMenuItem>
      </StyledMenu>
                        
              </div>        
                )}          
               
            </>
            
          ) : (
            <div className="login__buttons">
            <Link to={ROUTES.LOGIN}>
            <Button variant="contained" color="primary" size="small">
              Login
            </Button>
            </Link>            
            <Link to={ROUTES.SIGN_UP}>
            <Button variant="contained" color="primary" size="small">
              Sign Up
            </Button>
            </Link>            
            </div>            
          )}                        
        </div>      
        </div>
      </Container>
    </div>       
    </div>
    );
}

export default Header



