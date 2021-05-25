import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
  const {
    user: { uid: userId }
  } = useContext(UserContext);
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    await firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
      });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="post__footer__stats">
        <div className="">
          <FavoriteBorderIcon
            onClick={handleToggleLiked}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleToggleLiked();
              }
            }}            
            tabIndex={0}
            className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${
              toggleLiked ? <FavoriteBorderIcon /> : <FavoriteIcon />
            }`}
          />                      
          <ChatBubbleOutlineIcon
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleFocus();
              }
            }}
            className="w-8 text-black-light select-none cursor-pointer focus:outline-none"            
            tabIndex={0}
          />                              
        </div>
      </div>
      <div className="stats__count">
        <p className="font-bold">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
      </div>
    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired
};