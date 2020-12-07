import React from "react";
import { Navbar } from "react-bootstrap";
import HeaderRight from "./HeaderRight";
import { useAuth } from "../contexts/AuthContext";
// import Sample from "../../sample";

export default function Header() {
  const { currentUser }: any = useAuth();

  return (
    <div style={{ margin: "0", padding: "0", minWidth: "100vw" }}>
      {/* <Sample /> */}
      <Navbar expand="lg" fixed="top" className="header-nav">
        <Navbar.Brand href="/" style={{ fontSize: "1.5rem", color: "white" }}>
          Start
        </Navbar.Brand>
        {currentUser && <HeaderRight />}
      </Navbar>
    </div>
  );
}
