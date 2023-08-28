import React from 'react';
import './App.css';
import Statics from './components/Statics table/TransactionStatistics.jsx';
import Table from './components/Table/Table.jsx';
import Barchart from './components/Bar Chart/Barchart.jsx';
import { Routes, Route } from "react-router-dom"
import Header from './components/Header/Header';
function App() {

  return (
   
    <div className="App">
   
     <Header/>
      
      <Routes>
      <Route path="/" element={   <Table />} />
        <Route path="/statics" element={ <Statics/>} />
        <Route path="/chart" element={ <Barchart/> } />
        
      </Routes>
      
    </div>
 
  );


}

export default App;
