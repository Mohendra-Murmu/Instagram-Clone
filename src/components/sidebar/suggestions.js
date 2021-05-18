import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import './suggestions.css';
import SuggestedProfile from './suggested-profile';
import { getSuggestedProfiles } from '../../services/firebase';

export default function Suggestions({ userId, following, loggedInUserDocId }) {
     const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="sidebar_suggestions">
            <div className="sidebar__suggestions__header">                
                <h5 className="suggestions_title ">Suggestions For You</h5>                
                <h6>See All</h6>                
            </div>
            <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            profileAvtr={profile.profileAvtr}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
        </div>
    ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
};





