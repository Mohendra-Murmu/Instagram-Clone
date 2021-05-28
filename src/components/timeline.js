import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);    
  return (
    <div>
      {!photos ? (
        <Skeleton count={2} width={450} height={450} />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)        
      )}
    </div>
  );
}