import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import UserContext from '../../context/user';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { Avatar, Container, Grid } from '@material-ui/core';
import './header.css';
import { makeStyles } from '@material-ui/core/styles';
import ImageUpload from '../ImageUpload';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Modal from '@material-ui/core/Modal';
import ProfilePic from './profilepic';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));


export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  avtr,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,    
    username: profileUsername
  }
}){  
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;
  const useractive = user?.username && user?.username === profileUsername;
  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
  };

  useEffect(() => {

    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      setIsFollowingProfile(!!isFollowing);
    };
    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [avtropen, setAvtrOpen] = React.useState(false);

  const handleavtrOpen = () => {
    setAvtrOpen(true);
  };
  const handleavtrClose = () => {
    setAvtrOpen(false);
  };
  const body = (
    <div>
      <ProfilePic />
    </div>
  );
  return (
    <Container >
      <div className={classes.root}>
        <div className="profile">
          <div className="profile-image">
            {profileUsername ? (
              <Avatar
                className={classes.large}
                alt={`${fullName}`}
                src={avtr}
                onError={(e) => {
                  e.target.src = DEFAULT_IMAGE_PATH;
                }}
              />
            ) : (
              <Skeleton circle height={150} width={150} count={1} />
            )}
          </div>
          <div className="profile-user-settings">
            <div className="profile__top">
              <h3 className="profile-user-name">{profileUsername}</h3>
              {useractive && (
                <>

                  <button
                    className="profile-edit-btn"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
            {activeBtnFollow && isFollowingProfile === null ? (
              <>

                <Skeleton count={1} width={80} height={32} />
              </>
            ) : (
              activeBtnFollow && (
                <>
                  <button
                    className=""
                    type="button"
                    onClick={handleToggleFollow}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleToggleFollow();
                      }
                    }}
                  >
                    {isFollowingProfile ? 'Unfollow' : 'Follow'}
                  </button>

                </>
              )

            )
            }

          </div>
          <div className="profile__stats">
            {!followers || !following ? (
              <Skeleton count={1} width={677} height={24} />
            ) : (
              <>
                <Grid container
                  justify="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item >
                    <span className="profile-stat-count">{photosCount}</span> posts
              </Grid>
                  <Grid item >
                    <Link>
                    <span className="profile-stat-count">{followerCount}</span>
                    {` `}
                    {followerCount === 1 ? `follower` : `followers`}
                    </Link>
                  </Grid>
                  <Grid item >
                    <span className="profile-stat-count">{following?.length}</span> following
              </Grid>
                </Grid>

              </>
            )}
          </div>
          <div className="profile-bio">
            <p>
              <span className="profile-real-name">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</span>
            </p>
          </div>
          {useractive && (
            <>
              <div className="profile_pic">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleavtrOpen}
                >
                  Update Profile Pic
                  </Button>
                <Modal
                  open={avtropen}
                  onClose={handleavtrClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  className="profile_photo_update_modal"
                >
                  {body}
                </Modal>
              </div>
              <div className="add__post">
                <Button
                  aria-describedby={id}
                  variant="contained"
                  color="primary"
                  onClick={handleClick}>
                  add New Post
                  </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <ImageUpload userId={user.userId} />
                </Popover>
              </div>
              <div className="suggestion">
                 <Link to={ROUTES.SUGGESTIONS}>
                 <Button                  
                  variant="contained"
                  color="primary"                  
                  >
                    Suggestions
                  </Button>
                  </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array
  }).isRequired
};
