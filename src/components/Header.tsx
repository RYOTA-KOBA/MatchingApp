import React from "react";
import { Navbar } from "react-bootstrap";
// @ts-expect-error ts-migrate(6142) FIXME: Module './HeaderRight' was resolved to '/Users/ryo... Remove this comment to see the full error message
import HeaderRight from "./HeaderRight";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { useAuth } from "../contexts/AuthContext";
// import Sample from "../../sample";

export default function Header() {
  const { currentUser } = useAuth();

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div style={{ margin: "0", padding: "0", minWidth: "100vw" }}>
      {/* <Sample /> */}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Navbar expand="lg" fixed="top" className="header-nav">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Navbar.Brand href="/" style={{ fontSize: "1.5rem", color: "white" }}>
          Start
        </Navbar.Brand>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {currentUser && <HeaderRight />}
      </Navbar>
    </div>
  );
}
