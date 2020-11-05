import React from 'react'
import { Container, Navbar } from "react-bootstrap"
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <Container style={{ margin: "0", padding: "0", minWidth: "100vw" }} >
            <Navbar expand="lg" variant="light" bg="light" fixed="top" style={{ justifyContent: "space-between", padding: "1% 8%" }}>
                <Navbar.Brand href="/" style={{ fontSize: "1.5rem" }}>Start</Navbar.Brand>
                <Link to="/dashboard" className="btn btn-sm btn-primary">
                    プロフィールを表示
                </Link>
            </Navbar>
        </Container>
    )
}
