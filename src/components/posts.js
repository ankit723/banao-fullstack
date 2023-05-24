import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post2 from "./postitem"

const PostApp = ({setLoginUser, username}) => {
  const [posts, setPosts] = useState([]);
  const [otherposts, othersetPosts] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const checker = await axios.post("https://atg-backend-q7x9.onrender.com/post/item", {userId:setLoginUser})
        const response = await fetch(`https://atg-backend-q7x9.onrender.com/post?userId=${setLoginUser}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching POST items:', error);
      }
    };

    fetchPosts();
  }, []);
  
  useEffect(() => {
    const otherfetchPosts = async () => {
      try {
        const response = await fetch(`https://atg-backend-q7x9.onrender.com/otherpost?userId=${setLoginUser}`);
        const data = await response.json();
        othersetPosts(data);
      } catch (error) {
        console.error('Error fetching POST items:', error);
      }
    };

    otherfetchPosts();
  }, []);


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://atg-backend-q7x9.onrender.com/api/posts');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };


  const handleLike = async (itemId) => {
    try {
      await axios.post(`https://atg-backend-q7x9.onrender.com/api/posts/${itemId}/like`);
      fetchItems(); // Update the items list after a like
      window.location.reload()
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };


  const handleDislike = async (itemId) => {
    try {
      await axios.post(`https://atg-backend-q7x9.onrender.com/api/posts/${itemId}/dislike`);
      fetchItems(); // Update the items list after a dislike
      window.location.reload()
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };


  const handleAddPost = async () => {
    try {
      const title = prompt('Enter a new POST item:');
      if (!title) return;

      const response = await fetch('https://atg-backend-q7x9.onrender.com/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, userId : setLoginUser }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts([...posts, newPost]);
        window.location.reload()
      } else {
        console.error('Error adding POST item');
      }
    } catch (error) {
      console.error('Error adding POST item:', error);
    }
  };


  const deletePost= (id)=>{
    console.log(id)
    axios.post("https://atg-backend-q7x9.onrender.com/postdelete", {postId:id})
    window.location.reload()
  }
  

  const updatePost= (id)=>{
    console.log(id)
    let newtitle=prompt("Enter the new Post")
    axios.post("https://atg-backend-q7x9.onrender.com/postupdate", {postId:id, newtitle:newtitle})
    window.location.reload()
  }

  return (
    <div className='container'>
      <button className='btn btn-info'style={{marginLeft:"50%"}} onClick={handleAddPost}>Create New Post</button>
      <ul style={{listStyle:"none"}}>
      <h1 style={{fontSize:"3rem", color:"#27374D"}}>Your Posts</h1>
        {posts && posts.length > 0 ? (
          posts.map((post) => 
          <li key={post._id}><Post2 title={post.title} profile_name={username}/> <button className='btn btn-danger mx-2' onClick={()=>deletePost(post._id)}>Delete</button> <button className='btn btn-warning mx-2' onClick={()=>updatePost(post._id)}>Update</button> 
          <button className='btn btn-primary mx-2' onClick={() => handleLike(post._id)}>Like</button><span>Likes: {post.likes}</span>
          <button className='btn btn-secondary mx-2' onClick={() => handleDislike(post._id)}>Dislike</button> <span>Dislikes: {post.dislikes}</span> </li>)
        ) : (
          <li style={{fontSize:"2rem", display:"flex", justifyContent:"center",marginTop:"2rem"}}>No Post that you made was found.   Why Dont you Post Some !! While Check other user Post</li>
        )}
      </ul>
      
      <ul style={{listStyle:"none", marginTop:"6rem"}}>
        <h1 style={{fontSize:"3rem", color:"#27374D"}}>Other Posts</h1>
        {otherposts && otherposts.length > 0 ? (
          otherposts.map((post) => 
          <li key={post._id}><Post2 title={post.title}/>
          <button className='btn btn-primary mx-2' onClick={() => handleLike(post._id)}>Like</button><span>Likes: {post.likes}</span>
          <button className='btn btn-secondary mx-2' onClick={() => handleDislike(post._id)}>Dislike</button> <span>Dislikes: {post.dislikes}</span></li>)
        ) : (
          <li style={{fontSize:"2rem", display:"flex", justifyContent:"center",marginTop:"2rem"}}>No Post items found.Why Dont you Post Some !!</li>
        )}
      </ul>

  </div>
  );
}
export default PostApp;
