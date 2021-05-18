import { useContext } from 'react';
import User from './user';
import Suggestions from './suggestions';
import LoggedInUserContext from '../../context/logged-in-user';
import { Divider } from '@material-ui/core';

export default function Sidebar() {
  const { user: { docId = '', fullName, username, userId, following, profileAvtr } = {} } = useContext(
    LoggedInUserContext
  );

  return (
    <div style={{margin : 2}}>
      <User username={username} fullName={fullName} avtr={profileAvtr}/>
        <Divider pb={20}/>
      <Suggestions  userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
}