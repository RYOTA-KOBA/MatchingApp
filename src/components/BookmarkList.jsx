import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import BookmarkListItem from './BookmarkListItem'

export default function BookmarkList() {
    const { currentUser } = useAuth()
    const [bookmark, setBookmark] = useState([])

    useEffect(() => {
        const uid = currentUser.uid;
        let posts = [];
        db.collection('users').doc(uid).collection('bookmarks').get()
            .then(snapshots => {
                snapshots.docs.forEach(doc => {
                    const data = doc.data()
                    
                    posts.push({
                        authorName: data.authorName,
                        content: data.content,
                        createdAt: data.createdAt,
                        title: data.title,
                        id: doc.id,
                        uid: data.uid
                    })
                    
                })
                setBookmark(posts)
            })
    }, [])

    return (
        <>
            <div style={{ marginTop: "100px" }}>
            <h3>保存した投稿</h3>
            {bookmark.map(post => 
                <BookmarkListItem 
                    key={post.id}
                    authorName={post.authorName}
                    content={post.content}
                    createdAt={post.createdAt}
                    title={post.title}
                    id={post.id}
                    uid={post.uid}
                />
            )}
            </div>
        </>
    )
}
