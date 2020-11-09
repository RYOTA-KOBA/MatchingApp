import React from 'react'
// import { Card, Button } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom'

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
        marginTop: "15px"
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
        marginBottom: 12
    }
});

export default function Home() {
    const { currentUser, logout } = useAuth()
    const classes = useStyles();

    return (
        <>
            {/* <Link to="/dashboard" className="btn btn-sm btn-primary ">
                プロフィールを表示
            </Link> */}
            <h3 className="mb-3">Posts</h3>
            {/* <Card className="mb-3" style={{ width: '100%' }} href="#">
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><strong>名前:</strong>{currentUser.username}</Card.Subtitle>
                    <Card.Text>
                        ここに投稿者からのメッセージを表示
                    </Card.Text>
                    <Card.Link className="btn btn-primary" href="#">詳細を表示</Card.Link>
                </Card.Body>
            </Card> */}
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    >
                    Card Title
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    <strong>名前:</strong>{currentUser.username}
                    </Typography>
                    <Typography variant="body2" component="p">
                    ここに投稿者からのメッセージを表示
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large">
                        <Link to="/detail">
                            詳細を表示
                        </Link>
                    </Button>
                </CardActions>
            </Card>
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    >
                    Card Title
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    <strong>名前:</strong>{currentUser.username}
                    </Typography>
                    <Typography variant="body2" component="p">
                    ここに投稿者からのメッセージを表示
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/detail">
                        <Button size="large">
                            詳細を表示
                        </Button>
                    </Link>
                </CardActions>
            </Card>
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    >
                    Card Title
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    <strong>名前:</strong>{currentUser.username}
                    </Typography>
                    <Typography variant="body2" component="p">
                    ここに投稿者からのメッセージを表示
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large">
                        <Link to="/detail">
                            詳細を表示
                        </Link>
                    </Button>
                </CardActions>
            </Card>
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    >
                    Card Title
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    <strong>名前:</strong>{currentUser.username}
                    </Typography>
                    <Typography variant="body2" component="p">
                    ここに投稿者からのメッセージを表示
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large">
                        <Link to="/detail">
                            詳細を表示
                        </Link>
                    </Button>
                </CardActions>
            </Card>
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    >
                    Card Title
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    <strong>名前:</strong>{currentUser.username}
                    </Typography>
                    <Typography variant="body2" component="p">
                    ここに投稿者からのメッセージを表示
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large">
                        <Link to="/detail">
                            詳細を表示
                        </Link>
                    </Button>
                </CardActions>
            </Card>
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    >
                    Card Title
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    <strong>名前:</strong>{currentUser.username}
                    </Typography>
                    <Typography variant="body2" component="p">
                    ここに投稿者からのメッセージを表示
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large">
                        <Link to="/detail">
                            詳細を表示
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}
