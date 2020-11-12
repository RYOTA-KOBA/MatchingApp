import React from 'react'
import { Container, Navbar } from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'
import PostForm from './PostForm'

//material ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    headerRightButton: {
        "&:hover": {
            textDecoration: "none"
        }
    },
    avatar: {
        backgroundColor: red[500],
    },
    headerRight: {
        display: "flex",
        alignItems: "center"
    },
    postFormButton: {
        marginRight: "20px",
    },
    postFormLink: {
        color: "#ffffff",
        "&:hover": {
            textDecoration: "none",
            color: "#ffffff"
        }
    },
    avatarLink: {
        color: "white",
        "&:hover": {
            textDecoration: "none",
            color: "white"
        }
    }
}));

export default function Header() {
    const classes = useStyles();
    const history = useHistory()

    return (
        <Container style={{ margin: "0", padding: "0", minWidth: "100vw" }} >
            <Navbar expand="lg" variant="light" bg="light" fixed="top" style={{ justifyContent: "space-between", padding: "1% 8%" }}>
                <Navbar.Brand href="/" style={{ fontSize: "1.5rem" }}>Start</Navbar.Brand>
                {/* {
                    history.location.pathname === '/dashboard' ? (
                        <p></p> 
                    ) : ( 
                        <Link to="/dashboard" className={classes.headerRightButton}>
                            <Button size="large" color="primary" variant="contained">
                                プロフィールを表示
                            </Button>
                        </Link>
                    )
                } */}
                <div className={classes.headerRight}>
                <Button variant="contained" color="primary" className={classes.postFormButton}>
                    <Link to="/postform" className={classes.postFormLink}>新規投稿</Link>
                </Button>
                <Link to="/dashboard" className={classes.avatarLink}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        T
                    </Avatar>
                </Link>
                </div>
            </Navbar>
        </Container>
    )
}
