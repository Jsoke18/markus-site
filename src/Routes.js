import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Work from './pages/Work';
import Home from './pages/Home'; // Import your Home component
import Contact from './pages/Contact'; // Import your Home component
import Press from './pages/Press'; // Import your Home component

const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/press" element={<Press />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
);

export default AppRoutes;