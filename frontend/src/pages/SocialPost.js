import React from "react";
import { addPost } from '../services/api';


function SocialPost() {
  const myuserId = localStorage.getItem('loggedInUserId');
  


  const [formData, setFormData] = React.useState({
    content: '',
    userId: myuserId,
  });

  function handleSubmit(event) {
    event.preventDefault();

    
 
    addPost(formData).then(() => {
      console.log('Post added successfully');
      setFormData({ content: '', userId: myuserId });
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Post something
          <br />
          <textarea
            type="text"
            value={formData.content}
            onChange={(event) =>
              setFormData({ ...formData, content: event.target.value })
            }
          />
          <br />
          
          <button type="submit">Submit</button>
        </label>
      </form>
    
    </div>
  );
}

export default SocialPost;
