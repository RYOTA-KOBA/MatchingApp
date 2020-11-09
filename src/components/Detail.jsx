import React from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom'

//materialUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

export default function Detail() {
    const { currentUser, logout } = useAuth()
    const classes = useStyles();
    
    return (
        <>
            <Link to="/">
                <Button>
                    一覧に戻る
                </Button>
            </Link>
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    >
                    エンジニア募集してます！！！
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    <strong>名前:</strong>{currentUser.username}
                    </Typography>
                    <Typography variant="body2" component="p">
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    ここに投稿者からのメッセージを表示
                    </Typography>
                </CardContent>
            </Card>            
        </>
    )
}
