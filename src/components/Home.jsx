import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

export default function Home() {
    const { currentUser, logout } = useAuth()


    return (
        <>
            {/* <Link to="/dashboard" className="btn btn-sm btn-primary ">
                プロフィールを表示
            </Link> */}
            <h1>ここにJob一覧を表示</h1>
            <Card className="mb-3" style={{ width: '30rem' }} href="#">
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><strong>名前:</strong>{currentUser.username}</Card.Subtitle>
                    <Card.Text>
                        ここに投稿者からのメッセージを表示
                    </Card.Text>
                    <Card.Link className="btn btn-primary" href="#">詳細を表示</Card.Link>
                </Card.Body>
            </Card>
        </>
    )
}
