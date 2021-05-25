import { Grid } from '@material-ui/core';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Sidebar from '../components/sidebar/';
import Timeline from '../components/timeline';
import {Container, Hidden } from '@material-ui/core';
import './dashboard.css';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';

export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = 'Instagram';
  }, []);

        return (
           <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
        <div className="dashboard">
            <Header />
            <Container maxWidth="md" className="home__body">
                <Grid container>
                <Grid item xs={12} lg={8} md={8} className="articles">
                        <Timeline />                                                
                </Grid>
                <Hidden smDown>                
                <Grid item  lg={4} md={4} className="sidebar_content">
                        <Sidebar />
                </Grid>
                </Hidden>
            </Grid>                                    
            </Container>            
        </div>
        </LoggedInUserContext.Provider>
    );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};