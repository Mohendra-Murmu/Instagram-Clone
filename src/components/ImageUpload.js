import React, {useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { db, storage } from '../lib/firebase';
import UserContext from '../context/user';
import useUser from '../hooks/use-user';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function ImageUpload(userId) {  
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);  
   
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
    uploadTask.on(
      "state_changed",
      (snapshot) => {        
        const progress = Math.round(
        (snapshot.bytesTransfereed / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {            
            
            db.collection('photos').add({                            
              userId:user.userId,
              imageSrc: url,
              caption: caption,
              likes: [],
              comments: [],
              dateCreated: Date.now()
            });
            setCaption("");
            setProgress(0);
            setImage(null);

          });
      }
    );
  };

  return (
    <div className={classes.root}>
      <progress className="imageupload__progress"
      value={progress} 
      max="100"
      />
      <input
        type="text"
        placeholder='Caption...'
        onChange={event => setCaption(event.target.value)}
        value={caption}
      />
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>

      <Button
        variant="contained"
        color="primary"
        component="span"
        onClick={handleUpload}
      >
        Upload
        </Button>
    </div>
  );
}