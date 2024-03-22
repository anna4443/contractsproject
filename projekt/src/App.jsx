import { useEffect, useState } from 'react'


import './App.css'
import ContractList from './ContractList';
import ContractForm from './components/ContractForm';
import ContractDetails from './components/ContractDetails';
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from 'react-router-dom';
import EditContract from './components/EditContract';

function App() {

  return (
    <>
    <Router>
    <Routes>
      <Route path="/" exact element={<ContractList/>} />
      <Route path="/ugovori/:id" element={<ContractDetails/>} />
      <Route path="/edit/:id" element={<EditContract/>} />
    </Routes>
    </Router>
    </>
  )
}

export default App
