// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './HomePage.css';

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const propertyCollection = collection(db, 'properties');
      const propertySnapshot = await getDocs(propertyCollection);
      const propertyList = propertySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(propertyList);
    };

    fetchData();
  }, []);

  return (
    <div className="homepage-container">
      <h2>Property Listings</h2>
      <ul className="property-list">
        {properties.map(property => (
          <li key={property.id} className="property-item">
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            {property.imageUrls && property.imageUrls.length > 0 && (
              <img src={property.imageUrls[0]} alt={property.title} />
            )}
            <p>Price: {property.price}</p>
            <a href={`/property/${property.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
