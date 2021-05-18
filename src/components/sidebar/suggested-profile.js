import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './suggested-profile.css';
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
  getUserByUserId
} from '../../services/firebase';
import LoggedInUserContext from '../../context/logged-in-user';
import { Avatar, Button } from '@material-ui/core';

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  profileAvtr,
  userId,
  loggedInUserDocId
}) {
  const [followed, setFollowed] = useState(false);
  const { setActiveUser } = useContext(LoggedInUserContext);

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
    const [user] = await getUserByUserId(userId);
    setActiveUser(user);
  }

  return !followed ? (
    <div className="sidebar-sugestions">
      <div className="suggestions__content">
        <Avatar                  
          src={profileAvtr}
          alt=""
          className="users-avtr"
          onError={(e) => {
            e.target.src = `/images/avatars/default.png`;
          }}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>      
      <Button
        color="primary"
        size="small"
        className="text-xs font-bold text-blue-medium follow-btn"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </Button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
};