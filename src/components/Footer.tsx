import React from 'react'
import { Container } from "react-bootstrap"

export default function Footer() {
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Container className="mt-5 bg-light mx-0" style={{ margin: "0", padding: "0", minWidth: "100vw", height: "80px", lineHeight: "80px" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <p className="text-center mb-0">Copyright 2020 Ryota Kobayashi - All Rights Reserved.</p>
            </Container>
        </>
    )
}
