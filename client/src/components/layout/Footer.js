import React from 'react';

const Footer = () => (
  <div>
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      &copy; {new Date().getFullYear()} DevLink
    </footer>
  </div>
);

export default Footer;
