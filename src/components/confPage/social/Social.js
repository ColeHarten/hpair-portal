import { Box, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const LinkedInGroupPosts = () => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(
            `https://api.linkedin.com/v2/ugcPosts?q=group&groupID=12935124&count=10`, 
            {
              headers: {
                Authorization: `Bearer YOUR_ACCESS_TOKEN`,
              },
            }
          );
  
          // Assuming the response data has a 'elements' property containing an array of posts
          setPosts(response.data.elements);
        } catch (error) {
          console.error('Error fetching LinkedIn group posts:', error);
        }
      };
  
      fetchPosts();
    }, []); // Run this effect only once on component mount
  
    return (
      <div>
        <h2>LinkedIn Group Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {/* Render post content */}
              {post.text}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
export default function Social(user){

    return(
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Align items in the center horizontally
            justifyContent: 'center', // Center content vertically
            padding: '20px',
        }}
    >
        <Typography variant="h4">Connect with other delegates!</Typography>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Arrange items in a column
                alignItems: 'center', // Align items in the center horizontally
                padding: '20px',
            }}
        >
            <a href="https://www.linkedin.com/groups/12935124/">
                <img src="/art/linkedin.png" width="50px" alt="LinkedIn Icon" target="_blank" />
            </a>
            <LinkedInGroupPosts />
        </Box>
    </Box>
    )
}