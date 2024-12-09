import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">Your Brand</h2>
            <p className="text-sm">© 2024 All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400">About Us</a>
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms & Conditions</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
