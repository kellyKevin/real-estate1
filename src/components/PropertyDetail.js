// src/components/PropertyDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import './PropertyDetail.css';
import firebase from 'firebase/app';
import 'firebase/firestore'; // Import other Firebase services as needed



const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const doc = await db.collection('properties').doc(id).get();
      setProperty(doc.data());
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-detail">
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      {property.imageUrls.map(url => (
        <img key={url} src={url} alt={property.title} />
      ))}
      {property.videoUrls.map(url => (
        <video key={url} controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
      <p className="price">Price: {property.price}</p>
      <p className="location">Location: {property.location}</p>
    </div>
  );
};

export default PropertyDetail;
