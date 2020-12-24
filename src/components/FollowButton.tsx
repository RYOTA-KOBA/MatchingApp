import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// material ui
import Button from "@material-ui/core/Button";

export default function FollowButton({ uid }: any) {
  const { currentUser }: any = useAuth();
  const [following, setFollowing] = useState(false);

  // 確認用(後で消す!)
  const handleClick = () => {
    setFollowing(!following);
  };

  return (
    <div className="follow_btn-wrapper">
      {currentUser.uid !== uid && (
        <Button
          className={
            "follow_btn-same" +
            " " +
            (following ? "following_btn" : "follow_btn")
          }
          variant="outlined"
          onClick={handleClick}
        >
          {following ? "FOLLOWING" : "FOLLOW"}
        </Button>
      )}
    </div>
  );
}
