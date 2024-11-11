import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Post = (props) => (
    <tr>
        <td>{props.post.user}</td>
        <td>{props.post.amount}</td>
        <td>{props.post.provider}</td>
        <td>{props.post.currency}</td>
        <td>
            <button className="btn btn-link" onClick={() => props.deletePost(props.post._id)}>
                Delete 
            </button>
        </td>
    </tr>
);

function AdminPortal() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    // This method fetches the posts from the database
    useEffect(() => {
        async function getPosts() {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    console.error('No token found, user might not be authenticated');
                    return; // Exit if no token is found
                }

                const response = await fetch('https://localhost:3000/post/transactions', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token for authentication
                        'Content-Type': 'application/json', // Ensure the correct content type
                    },
                });

                if (!response.ok) {
                    const message = `An error occurred: ${response.status} ${response.statusText}`;
                    console.error(message); // Log the error for debugging
                    window.alert(message);
                    return;
                }

                const data = await response.json();
                console.log('Received data:', data); // Log the received data
                setPosts(data); // Set the posts to state
            } catch (error) {
                console.error('Error fetching posts:', error); // Log the fetch error
            }
        }

        getPosts(); // Call the function to fetch posts
    }, []); // Empty dependency array to run once on mount

    // This method will delete a post
    async function deletePost(id) {
        const token = localStorage.getItem("jwt");
        await fetch(`https://localhost:3000/post/transactions/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const newPosts = posts.filter((el) => el._id !== id);
        setPosts(newPosts); // Update the post list after deletion
    }

    function handleLogout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        navigate("/"); // Redirect to login page
    }

    function renderPostList() {
        if (posts.length === 0) {
            return <tr><td colSpan="5">No transactions found.</td></tr>;
        }

        return posts.map((post) => {
            return (
                <Post
                    post={post}
                    deletePost={deletePost}
                    key={post._id}
                />
            );
        });
    }

    return (
        <div className="app-container">
            <div className="login-section">
                <div className="card">
                    <div className="login-title">
                        <h1>Transaction Notice Board</h1>
                    </div>
                    <table className="payment-table" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Provider</th>
                                <th>Currency</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{renderPostList()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminPortal;
