import React, { useState } from "react";

// material ui
import Button from "@material-ui/core/Button";

export default function FollowButton() {
  const [following, setFollowing] = useState(false);

  // 確認用(後で消す)
  const handleClick = () => {
    setFollowing(!following);
  };

  return (
    <div className="follow_btn-wrapper">
      <Button
        className={
          "follow_btn-same" + " " + (following ? "following_btn" : "follow_btn")
        }
        variant="outlined"
        onClick={handleClick}
      >
        {following ? "FOLLOWING" : "FOLLOW"}
      </Button>
    </div>
  );
}
