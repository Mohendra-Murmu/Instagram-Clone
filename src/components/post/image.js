import PropTypes from 'prop-types';
import './style.css';

export default function Image({ src, caption }) {
  return <img 
  className="post__image"
  src={src}
  alt={caption
  } />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired
};