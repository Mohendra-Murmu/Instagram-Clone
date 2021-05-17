import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { Avatar, Grid } from '@material-ui/core';
import './user.css';

export default function User({ username, fullName, avtr }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <div className="user-content">
    <Link to={`/p/${username}`}>   
    <Grid container spacing={2} pb={20}>    
       
      <Grid item>
        <Avatar
        alt={fullName} 
        src={avtr}
        onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />        
      </Grid>      
        <Grid item>
            <p className="font-bold text-sm user_name">{username}</p>
            <p className="text-sm text-grey">{fullName}</p>
        </Grid>        
    </Grid>      
    </Link>
    </div>
  );
}

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string
};