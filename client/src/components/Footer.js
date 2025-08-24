import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 " id='contact'>
      <footer className="bg-dark text-white text-center">
            <p className="mb-0 mt-3 h5">&copy; {new Date().getFullYear()} VM Prosperity Group. All rights reserved.</p>
            <small>Created & Designed by Vidya Tandel</small>

      </footer>
    </footer>
  );
};

export default Footer;
