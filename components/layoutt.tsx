import React from 'react'

import Header from './headerr'
import Footer from './footerr'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col h-screen justify-between font-content antialiased">
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
