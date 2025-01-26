import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Tagline */}
        <div>
          <Link to="/" className="text-white font-bold text-2xl">
            Film<span className="text-blue-600">Hunt</span>
          </Link>
          <p className="mt-2">Discover your next cinematic adventure.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="" className="hover:text-white">Movies</Link></li>

            <li><Link to="" className="hover:text-white">Actors</Link></li>
            <li><Link to="" className="hover:text-white">About</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Github size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} CineSeeker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;