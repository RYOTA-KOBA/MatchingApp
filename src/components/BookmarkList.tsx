import React, { useState, useEffect } from 'react'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../contexts/AuthContext' was resolved to '... Remove this comment to see the full error message
import { useAuth } from '../contexts/AuthContext'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import { db } from '../firebase'
// @ts-expect-error ts-migrate(6142) FIXME: Module './BookmarkListItem' was resolved to '/User... Remove this comment to see the full error message
import BookmarkListItem from './BookmarkListItem'

export default function BookmarkList() {
    const { currentUser } = useAuth()
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        const uid = currentUser.uid;
        let posts: any = [];
        db.collection('users').doc(uid).collection('bookmarks').get()
            .then((snapshots: any) => {
                snapshots.docs.forEach((doc: any) => {
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
    }, [currentUser.uid])

    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div style={{ marginTop: "100px" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <h3>保存した投稿</h3>
            {bookmarks.map(bookmark => 
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <BookmarkListItem 
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveId' does not exist on type 'never'.
                    key={bookmark.saveId}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'authorName' does not exist on type 'neve... Remove this comment to see the full error message
                    authorName={bookmark.authorName}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type 'never'.
                    content={bookmark.content}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'createdAt' does not exist on type 'never... Remove this comment to see the full error message
                    createdAt={bookmark.createdAt}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'never'.
                    title={bookmark.title}
                    // bookmarkのid
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveId' does not exist on type 'never'.
                    id={bookmark.saveId}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'post_id' does not exist on type 'never'.
                    post_id={bookmark.post_id}
                />
            )}
            </div>
        </>
    )
}
