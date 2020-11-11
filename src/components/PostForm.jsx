import React from 'react'
// materialUI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '500px',
    },
  },
}));

export default function PostForm() {
    const classes = useStyles();
    
    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="title" label="タイトル" />
                <TextField id="content" label="内容" multiline rows={4}/>
            </form>            
        </>
    )
}
