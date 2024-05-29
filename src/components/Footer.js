import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 EventLink. All rights reserved.</p>
        <p>
          <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a> | 
          <a href="/terms" className="text-gray-400 hover:text-white"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;