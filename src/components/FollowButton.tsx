import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

// material ui
import Button from "@material-ui/core/Button";

export default function FollowButton({ uid, isFollowing, followsId }: any) {
  const { currentUser, follow, unFollow }: any = useAuth();
  const [following, setFollowing] = useState(false);

  // 確認用(後で消す!)
  const handleClick = () => {
    if (isFollowing === true) {
      return unFollow(followsId);
    } else {
      return follow(currentUser.uid, uid);
    }
  };

  return (
    <div className="follow_btn-wrapper">
      {currentUser.uid !== uid && (
        <Button
          className={
            "follow_btn-same" +
            " " +
            (isFollowing ? "following_btn" : "follow_btn")
          }
          variant="outlined"
          onClick={handleClick}
        >
          {isFollowing ? "FOLLOWING" : "FOLLOW"}
        </Button>
      )}
    </div>
  );
}
