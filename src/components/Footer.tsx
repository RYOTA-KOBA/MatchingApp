import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <>
      <Container
        className="mt-5 bg-light mx-0"
        style={{
          margin: "0",
          padding: "0",
          minWidth: "100vw",
          height: "80px",
          lineHeight: "80px",
        }}
      >
        <p className="text-center mb-0">
          Copyright 2020 Ryota Kobayashi - All Rights Reserved.
        </p>
      </Container>
    </>
  );
}
