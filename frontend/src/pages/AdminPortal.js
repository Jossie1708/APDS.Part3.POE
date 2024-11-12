import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Post = ({ post, verifyPost, isVerified }) => (
    <tr>
        <td>{post.user}</td>
        <td>{post.amount}</td>
        <td>{post.provider}</td>
        <td>{post.currency}</td>
        <td>
            <button
                className={`btn ${isVerified ? 'btn-success' : 'btn-link'}`}
                onClick={() => verifyPost(post._id)}
            >
                {isVerified ? 'Verified' : 'Verify'}
            </button>
        </td>
    </tr>
);

function AdminPortal() {
    const [posts, setPosts] = useState([]);
    const [verifiedPosts, setVerifiedPosts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await fetch('https://localhost:3000/post/transactions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const message = `An error occurred: ${response.status} ${response.statusText}`;
                    console.error(message);
                    window.alert(message);
                    return;
                }

                const data = await response.json();
                console.log('Received data:', data);
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        getPosts();
    }, []);

    const verifyPost = (id) => {
        setVerifiedPosts((prev) => ({
            ...prev,
            [id]: !prev[id],  // Toggle verification status
        }));
    };

    async function submitVerifiedPosts() {
        const token = localStorage.getItem("jwt");
        const verifiedIds = Object.keys(verifiedPosts).filter(id => verifiedPosts[id]);

        for (let id of verifiedIds) {
            await fetch(`https://localhost:3000//post/transactions/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
        }

        const newPosts = posts.filter((post) => !verifiedIds.includes(post._id));
        setPosts(newPosts);
        setVerifiedPosts({});
    }

    function handleLogout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        navigate("/");
    }

    function renderPostList() {
        if (posts.length === 0) {
            return <tr><td colSpan="5">No transactions found.</td></tr>;
        }

        return posts.map((post) => (
            <Post
                post={post}
                verifyPost={verifyPost}
                isVerified={!!verifiedPosts[post._id]}
                key={post._id}
            />
        ));
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
                    <button
                        className="btn btn-primary"
                        onClick={submitVerifiedPosts}
                        style={{ marginTop: 20 }}
                    >
                        Submit Verified
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminPortal;
