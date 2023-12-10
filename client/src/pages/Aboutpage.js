// src/App.js
import React from 'react';


const creatorsData = [
  {
    id: 1,
    name: 'Yogesh S Patil',
    email: 'yogeshpatil892000@gmail.com',
    bio: '',
    imageUrl: 'https://example.com/john-doe.jpg', // Add the URL of the image
  },
  {
    id: 2,
    name: 'Prasad Hodgar',
    email: 'prasad@gmail.com',
    bio: '',
    imageUrl: 'https://example.com/jane-smith.jpg', // Add the URL of the image
  },
  {
    id: 3,
    name: 'Akash Tomar',
    email: 'akash@gmail.com',
    bio: '',
    imageUrl: 'https://example.com/bob-johnson.jpg', // Add the URL of the image
  },
];

const CreatorCard = ({ id, name, email, bio, imageUrl }) => (
  <div className="creator-card" key={id}>
    <img src={imageUrl} alt={name} className="creator-image" />
    <h2>{name}</h2>
    <p>{email}</p>
    <p>{bio}</p>
  </div>
);

const AboutPage = () => (
  <div className="about-page">
    <h1>Team Members</h1>
    <div className="creators-container">
      {creatorsData.map(creator => (
        <CreatorCard key={creator.id} {...creator} />
      ))}
    </div>
  </div>
);

export default AboutPage;
