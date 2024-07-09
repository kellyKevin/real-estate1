import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './AddProperty.css';

const AddProperty = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [userId, setUserId] = useState('kelly'); // Replace with actual user ID from your auth system

  const handleFileChange = (e, setFiles) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        return getDownloadURL(storageRef);
      })
    );

    const videoUrls = await Promise.all(
      videos.map(async (video) => {
        const storageRef = ref(storage, `videos/${video.name}`);
        await uploadBytes(storageRef, video);
        return getDownloadURL(storageRef);
      })
    );

    try {
      await addDoc(collection(db, 'properties'), {
        title,
        description,
        price: Number(price),
        location,
        imageUrls, // Store as array
        videoUrls, // Store as array
        createdAt: serverTimestamp(),
        createdBy: userId,
      });

      // Clear form fields and file inputs after submission
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
      setImages([]);
      setVideos([]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form className="add-property-form" onSubmit={handleSubmit}>
      <h2>Add Property</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </label>
      <label>
        Images:
        <input type="file" multiple onChange={(e) => handleFileChange(e, setImages)} required />
      </label>
      <label>
        Videos:
        <input type="file" multiple onChange={(e) => handleFileChange(e, setVideos)} required />
      </label>
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddProperty;
