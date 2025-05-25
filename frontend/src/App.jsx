import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main></main>
      <footer>

      </footer>
    </BrowserRouter>
  )
}

export default App;
