import React, { useContext, useState } from 'react'
import Card from '@material-ui/core/Card';
import './profilepic.css';
import { Button, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';
import { db, storage } from '../../lib/firebase';
import { PhotoCamera } from '@material-ui/icons';


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

export default function ProfilePic() {   
  const classes = useStyles();  
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);    
  const [image, setImage] = useState(null);   
  
const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
    uploadTask.on(
      "state_changed",
      snapshot => {},
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {     
            console.log(user.uid);
            
            db.collection("users").doc(user.docId).update({
              ...user,
              profileAvtr: url             
            });            
            setImage(null);

          });
      }
    );
  };
    console.log("image: ", image);

    return (
         <Card className={classes.root}>      
        <div className="card-title" >
          Change Profile Photo
        </div>
          <Divider />
          <div className="card__upload_button" >
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
        
        <Divider />
        <div className="card__remove_button">
          Remove Currnet Photo
        </div>
        <Divider />
        <div className="card__cancel_button">
          Cancel
        </div>
    </Card>
    )
}

