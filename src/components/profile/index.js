import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import {getUserPhotosByUserId } from '../../services/firebase';
import { Container} from '@material-ui/core';


export default function Profile({ user }) {  

  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {     
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);      
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });              
      const userNAME = user.fullName;
      document.title = `${userNAME}-Instagram`;
    }
    getProfileInfoAndPhotos();    
  }, [user, user.username]);

  
  return (
    <>
    <Container maxWidth="md">
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        avtr={user.profileAvtr}
      />
      
      <Photos photos={photosCollection} />
      </Container>
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    profileAvtr: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};