import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { postInfo, updatePost } from '../services/api';


function ViewPost() {
   
    const [content, setContent] = useState([]);
    const [userType, setUserType] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editPostContent, setEditPostContent] = useState('');
    const myuserId = localStorage.getItem('loggedInUserId');


    useEffect(() => {
        postInfo()
            .then((response) => {
                const { data } = response;
                setContent(data.reverse());
            })
            .catch((error) => {
                console.error(error);
            });

        const loggedInUserRole = localStorage.getItem('loggedInUserRole');
        setUserType(loggedInUserRole);
    }, []);

    const handleEdit = (postId) => {
        setEditingPostId(postId);
        const postToEdit = content.find((post) => post._id === postId);
        setEditPostContent(postToEdit.content);
    };

    const handleSave = (postId) => {
        if (editPostContent.trim() === '') {
            return;
        }
        if (postId !== null) {
            if (content.find((post) => post._id === postId).userId === myuserId || userType === 'admin') {
                updatePost(postId, { content: editPostContent })
                    .then((res) => {
                        setContent((prevContent) =>
                            prevContent.map((post) =>
                                post._id === postId ? { ...post, content: editPostContent } : post
                            )
                        );
                        setEditingPostId(null);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                alert('You are not authorized to edit this post');
            }
        }
    };

    const handleCancel = () => {
        setEditingPostId(null);
        setEditPostContent('');
    };

    return (
        <>
       
      
            <div>
                <h1>Posts</h1>

                {content.map((post) => {
                    const isAdmin = userType === 'admin';
                    const isEditable = isAdmin || post.userId === myuserId;
                    return (
                        <div key={post._id}>

                            <strong style={{ fontWeight: 'bold', color: '#333' }}>
                                {post.userName}
                            </strong>
                            <br></br>


                            {editingPostId === post._id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editPostContent}
                                        onChange={(e) => setEditPostContent(e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleSave(post._id)}
                                        style={{ margin: '0 10px' }}
                                    >Save</button>
                                    <button onClick={() => handleCancel()}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    {post.content}
                                    {isEditable && (
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            onClick={() => handleEdit(post._id)}
                                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                                        />
                                    )}
                                </div>
                            )}
                            <br></br><br></br>
                        </div>
                    );
                })}
            </div>
 
        </>
    );
}

export default ViewPost;
