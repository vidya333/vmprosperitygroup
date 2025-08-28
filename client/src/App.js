import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PropertyTypePage from './pages/PropertyTypePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AddProperty from './components/AddProperty';
import AboutUsPage from './pages/AboutUsPage';
import AddProject from './components/AddProject';
import GalleryPage from './pages/GalleryPage';
import LoanServices from './pages/LoanServices';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties/type/:typeSlug" element={<PropertyTypePage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/about-us" element={<AboutUsPage/>} />
        <Route path="/gallery" element={<GalleryPage/>} />
        <Route path="/loan" element={<LoanServices/>}/>
        <Route
                path="/add-property"
                element={
                  <ProtectedRoute requireAdmin>
                    <AddProperty />
                  </ProtectedRoute>
                }
              />   
              <Route
                path="/add-project"
                element={
                  <ProtectedRoute requireAdmin>
                    <AddProject />
                  </ProtectedRoute>
                }
              />   
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
