// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import your CSS file
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PropertyDetail from './components/PropertyDetail';
import AddProperty from './components/AddProperty';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <div className="main-content">
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/add" element={<AddProperty />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
