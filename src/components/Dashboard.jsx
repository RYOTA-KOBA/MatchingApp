import React, { useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
      width: "100%",
      marginTop: "130px"
  },
  bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
  },
  title: {
      fontSize: 20,
      color: "#000"
  },
  pos: {
      marginBottom: 12,
      marginTop: 30
  },
  edit_btn: {
    "&:hover": {
      textDecoration: "none"
    }
  }
});

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const classes = useStyles();

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card className={classes.root}>
          <CardContent>
            <h2 className="text-center mb-4">プロフィール</h2>
            {error && <Alert variant="danger">{error}</Alert>}
              <Typography className={classes.pos} color="textSecondary">
                <strong>Email:</strong> {currentUser.email}
                <br />
                <strong>名前:</strong> {currentUser.username}
              </Typography>
          </CardContent>
          <CardActions>
            <Link to="/update-profile"  className={classes.edit_btn}>
              <Button variant="contained" >
                プロフィールの編集
              </Button>
            </Link>
          </CardActions>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button size="small" variant="contained" color="secondary" onClick={handleLogout}>
          ログアウト
        </Button>
      </div>
      <div className="w-100 text-center mt-2">
        <Link to="/" variant="link">
          Job一覧へ
        </Link>
      </div>

    </>
  )
}
