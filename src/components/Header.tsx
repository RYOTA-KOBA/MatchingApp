import React from "react";
import { Navbar } from "react-bootstrap";
import HeaderRight from "./HeaderRight";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { currentUser }: any = useAuth();

  return (
    <div className="header-wrapper">
      <Navbar expand="lg" fixed="top" className="header-nav">
        <Navbar.Brand href="/" style={{ fontSize: "1.5rem", color: "white" }}>
          Start
        </Navbar.Brand>
        {currentUser && <HeaderRight />}
      </Navbar>
    </div>
  );
}
