/* eslint-disable linebreak-style */
/* eslint-disable indent */

// eslint-disable-next-line no-unused-vars
import Button from "@material-ui/core/Button";

import { followUser, unfollowUser } from "../../lib/api";
const FollowUser = ( { isFollowing, toggleFollow } ) => {
  const request = isFollowing ? unfollowUser:followUser;
  return (
    <Button 
      variant="contained" 
      color="primary"
      onClick={()=>toggleFollow( request )}
      color={isFollowing ? "secondary":"primary"}
    >
      {isFollowing ? "Unfollow" :"Follow"}
    </Button>
  );
};

export default FollowUser;
