// src/components/PropertyList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import './PropertyList.css';


const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snapshot = await db.collection('properties').get();
        const propertyList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(propertyList);
      } catch (error) {
        console.error('Error fetching properties: ', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="property-list">
      <h2>Properties List</h2>
      {properties.map(property => (
        <div key={property.id} className="property-item">
          <h3>{property.title}</h3>
          <p>{property.description}</p>
          <p>Price: ${property.price}</p>
          <p>Location: {property.location}</p>
          {/* Additional details or actions */}
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
