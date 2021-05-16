import {useState, useContext, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from '../context/firebase';
import './login.css'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Container, Hidden, Input, MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import * as ROUTES from '../constants/routes';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3897f0',
      dark: '#3897f0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function Login() {
     const classes = useStyles();

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
      event.preventDefault();
      
      try {
        await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
        history.push(ROUTES.DASHBOARD);                
      } catch (error) {
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    };
    
    useEffect(() => {
        document.title = 'Login - Instagram';
    }, []);
    return (
        <Container className="login__wrapper">
            <div className={classes.root}>
      <Grid container layout={'row'} >   
        <Hidden smDown>
          <Grid item lg={6} md={6}>          
              <img
              className="iphone__logo"
              src="/images/iphone-with-profile.jpg"
              alt=""
              />             
        </Grid>
          </Hidden>             
        <Grid item xs={12} sm={12} md={6} lg={6}>
          
            <div id="wrapper">
            <div className="main-content">
                <div className="header">
                <img src="https://i.imgur.com/zqpwkLQ.png" alt="" />
                </div>
                {error && <p className="error__tect" >{error}</p>}
                <form onSubmit={handleLogin} method="POST">
                <div className="l-part">

                <Input 
                type="text"
                placeholder="Email" 
                className="input-1"
                onChange={({target}) => setEmailAddress(target.value)}                                
                value={emailAddress}
                />
                <div className="overlap-text">
                <Input                 
                type="password" 
                placeholder="Password" 
                className="input-2"
                onChange={({target}) => setPassword(target.value)}
                value={password}
                />                    
                </div>
                <MuiThemeProvider theme={theme}>
                <Button
                disabled={isInvalid}
                 variant="contained"
                  color="primary"
                  type="submit"
                  className="btn"                                    
                  >
                  Log In
                </Button>
                </MuiThemeProvider>
                </div>
                </form>
                <div className="b-part">
                    <p>OR</p>
                </div>
            </div>
            <div className="sub-content">
                <div className="s-part">
                Don't have an account?
                <Link to={ROUTES.SIGN_UP} className="sign-up-text" >
                   Sign up
                  </Link>
                </div>                
            </div>
            </div>
          
        </Grid>        
      </Grid>
    </div>   
        </Container>     
    )
}

export default Login

