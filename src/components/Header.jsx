import React from 'react'
import { Container, Navbar } from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'


//material ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    headerRightButton: {
        "&:hover": {
            textDecoration: "none"
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
                
                {
                    history.location.pathname === '/dashboard' ? (
                        <p></p> 
                    ) : ( 
                        <Link to="/dashboard" className={classes.headerRightButton}>
                            <Button size="large" color="primary" variant="contained">
                                プロフィールを表示
                            </Button>
                        </Link>
                    )
                }
                
            </Navbar>
        </Container>
    )
}
