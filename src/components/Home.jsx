import React, { useEffect, useState } from 'react'
import { db } from "../firebase"
import Post from './Post'

const Home = () => {
    const [currentPost, setCurrentPost] = useState([])

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async() => {
        let posts = []
        await db.collection('posts').orderBy('createdAt', 'desc').get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
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
        <>
            <div style={{ marginTop: "100px" }}>
            <h3>Posts</h3>
            {currentPost.map(post => 
                <Post 
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
export default Home