import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import BookmarkListItem from './BookmarkListItem'

export default function BookmarkList() {
    const { currentUser } = useAuth()
    const [bookmarks, setBookmarks] = useState([])

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
                        saveId: doc.id,
                        uid: data.uid,
                        post_id: data.id
                    })
                    
                })
                setBookmarks(posts)
            })
    }, [])

    return (
        <>
            <div style={{ marginTop: "100px" }}>
            <h3>保存した投稿</h3>
            {bookmarks.map(bookmark => 
                <BookmarkListItem 
                    key={bookmark.saveId}
                    authorName={bookmark.authorName}
                    content={bookmark.content}
                    createdAt={bookmark.createdAt}
                    title={bookmark.title}
                    // bookmarkのid
                    id={bookmark.saveId}
                    uid={bookmark.uid}
                    post_id={bookmark.post_id}
                />
            )}
            </div>
        </>
    )
}
