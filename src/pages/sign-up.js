import {useState, useContext, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from '../context/firebase';
import './sign-up.css'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Container, Hidden, Input, MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';


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


function SignUp() {
     const classes = useStyles();

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('')
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleSignUp = async (event) => {
      event.preventDefault();

      const usernameExists = await doesUsernameExist(username);
      if (!usernameExists) {
        try{          
          const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

          await createdUserResult.user.updateProfile({
            displayName: username
          });
          
          await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now()
          });

          history.push(ROUTES.DASHBOARD);
        }
        catch (error){
          setFullName('');
          setEmailAddress('');
          setPassword('');
          setError(error.message);
        }
      }else {
      setUsername('');
      setError('That username is already taken, please try another.');
    }
          
    };
    
    useEffect(() => {
        document.title = 'Sign Up - Instagram';
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
                <form onSubmit={handleSignUp} method="POST">
                <div className="l-part">
                  <Input 
                type="text"
                placeholder="Username" 
                className="input-1"
                onChange={({ target }) => setUsername(target.value)}                
                value={username}
                />
                <Input 
                type="text"
                placeholder="Full Name" 
                className="input-2"
                onChange={({ target }) => setFullName(target.value)}                
                value={fullName}
                />
                <Input 
                type="text"
                placeholder="Email" 
                className="input-3"
                onChange={({target}) => setEmailAddress(target.value)}                
                value={emailAddress}
                />
                <div className="overlap-text">
                <Input                 
                type="password" 
                placeholder="Password" 
                className="input-4"
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
                  Sign Up
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
                Already have an account?
                <Link to={ROUTES.LOGIN} className="sign-up-text" >
                   Login
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

export default SignUp

