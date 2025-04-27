import React from 'react'

function Footer() {
  return (
    <footer className="h-[8vh] bg-gray-800 text-gray-400 flex items-center justify-center">
      <p className="text-sm font-poppins">
        © {new Date().getFullYear()} My Blog App. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer;


