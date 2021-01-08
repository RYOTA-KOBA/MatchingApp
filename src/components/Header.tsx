import React from "react";
import { Navbar } from "react-bootstrap";
import HeaderRight from "./HeaderRight";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser }: any = useAuth();

  return (
    <div className="header-wrapper">
      <Navbar expand="lg" fixed="top" className="header-nav">
        <Link to="/" className="header-logo">
          Start
        </Link>
        {currentUser && <HeaderRight />}
      </Navbar>
    </div>
  );
}
