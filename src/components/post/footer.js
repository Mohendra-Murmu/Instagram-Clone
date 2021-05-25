import PropTypes from 'prop-types';
import './style.css';

export default function Footer({ caption, username, userAvtr }) {
  return (
    <div className="post__footer">      
          <span className="footer__user__name"><strong>{username}</strong></span>
      <span className="footer__user__caption">{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};