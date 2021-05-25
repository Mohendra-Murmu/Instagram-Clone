import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import './style.css';

export default function Header({ username, userAvtr }) {  
  return (
    <div>      
        <Link to={`/p/${username}`} className="post__header">
          <Avatar
            className="post__avatar"
            src={userAvtr}
            alt={`${username}`}
          />
          <h3 className="post__header__user__name">{username}</h3>
        </Link>
    </div>    
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};