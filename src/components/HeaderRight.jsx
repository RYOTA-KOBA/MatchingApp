import React from 'react'
import { Link } from 'react-router-dom'

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

export default function HeaderRight() {
    const classes = useStyles();

    return (
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
    )
}
