import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <Link to="/dashboard" className="btn btn-sm btn-primary ">
                プロフィールを表示
            </Link>
            <h1>ここにJob一覧を表示</h1>
        </>
    )
}
