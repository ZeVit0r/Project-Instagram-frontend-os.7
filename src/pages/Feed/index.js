import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import io from 'socket.io-client';

import './style.css'

import more from '../../assets/more.svg'
import like from '../../assets/like.svg'
import comment from '../../assets/comment.svg'
import send from '../../assets/send.svg'

const socket = io('http://localhost:3333', { transports : ['websocket'] })



/* socket.on('like', likedPost => {
    setFeed(
        feed.map(post => {
            return post._id === likedPost._id ? likedPost : post
        })
    )
}) */

export default () => {
    const [feed, setFeed] = useState([])


    socket.on('post', newPost => {
        setFeed([newPost, ...feed])
    })

    socket.on('like', likedPost => {
        setFeed(
            feed.map(post => {
                return post._id === likedPost._id ? post=likedPost : post
            })
        )
    })

    useEffect(()=>{    
        api
          .get(`posts`)
          .then(async (response) => {
            await setFeed(response.data.posts)
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    },[])
      
    const handleLike = id => {
        api.post(`/posts/${id}/like`)
    }

    return (
        <section id="post-list">
            { feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>

                        <img src={more} alt="Mais" />
                    </header>
                    <img src={`http://localhost:3333/files/${post.image}`} alt="" />
                        
                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => handleLike(post._id)}>
                                <img src={like} alt="" />
                            </button>
                            <img src={comment} alt="" />
                            <img src={send} alt="" />
                        </div>

                        <strong>{post.likes} Curtidas</strong>
                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
            )) }
        </section>
    )
}