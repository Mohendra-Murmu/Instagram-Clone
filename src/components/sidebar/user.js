import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { Avatar, Grid } from '@material-ui/core';

export default function User({ username, fullName }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Grid container className="user__header">    
    <Link to={`/p/${username}`}>      
      <Grid item>
        <Avatar
        alt={fullName} 
        src="/static/images/avatar/1.jpg" 
        onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />        
      </Grid>
      
        <Grid item>
            <p className="font-bold text-sm">{username}</p>
        </Grid>
        <Grid item>
            <p className="text-sm">{fullName}</p>
        </Grid>
      
    </Link>
    </Grid>      
  );
}

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string
};