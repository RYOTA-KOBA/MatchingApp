import React, { useEffect, useState } from 'react'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../firebase' was resolved to '/Users/ryota... Remove this comment to see the full error message
import { db } from "../firebase"
// @ts-expect-error ts-migrate(6142) FIXME: Module './Post' was resolved to '/Users/ryota/Libr... Remove this comment to see the full error message
import Post from './Post'

const Home = () => {
    const [currentPost, setCurrentPost] = useState([])

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async() => {
        let posts: any = []
        await db.collection('posts').orderBy('createdAt', 'desc').get()
        .then((snapshot: any) => {
            snapshot.docs.forEach((doc: any) => {
                const data = doc.data()
                
                const date = new Date(data.createdAt.seconds*1000)
                const Day = date.toLocaleDateString("ja-JP")
                const Time = date.toLocaleTimeString("ja-JP")                

                posts.push({
                    authorName: data.authorName,
                    content: data.content,
                    createdAt: Day + " " + Time,
                    title: data.title,
                    id: doc.id,
                    uid: data.uid
                })
            })
            
            setCurrentPost(posts)
        })
    }

    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div style={{ marginTop: "100px" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <h3>Posts</h3>
            {currentPost.map(post => 
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Post 
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
                    key={post.id}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'authorName' does not exist on type 'neve... Remove this comment to see the full error message
                    authorName={post.authorName}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type 'never'.
                    content={post.content}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'createdAt' does not exist on type 'never... Remove this comment to see the full error message
                    createdAt={post.createdAt}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'never'.
                    title={post.title}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
                    id={post.id}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'uid' does not exist on type 'never'.
                    uid={post.uid}
                />
            )}
            </div>
        </>
    )
}
export default Home