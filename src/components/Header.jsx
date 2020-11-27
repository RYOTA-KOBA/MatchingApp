import React from 'react'
import { Navbar } from "react-bootstrap"
import HeaderRight from './HeaderRight'
import { useAuth } from "../contexts/AuthContext"

export default function Header() {
    const { currentUser } = useAuth()

    return (
        <div style={{ margin: "0", padding: "0", minWidth: "100vw" }} >
            <Navbar expand="lg" fixed="top" className="header-nav">
                <Navbar.Brand href="/" style={{ fontSize: "1.5rem", color: "white" }}>Start</Navbar.Brand>
                { currentUser && <HeaderRight /> }
            </Navbar>
        </div>
    )
}
