import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Coin from './components/Coin';
import CoinDetails from './components/CoinDetails';
import Exchanges from './components/Exchanges';

function App() {
  return <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/coins' element={<Coin/>}/>
      <Route path='/exchanges' element={<Exchanges/>}/>
      <Route path="/coin/:id" element={<CoinDetails />} />
    </Routes>
    <Footer />
  </Router>
}

export default App;
