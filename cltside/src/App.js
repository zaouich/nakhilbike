import logo from './logo.svg';
import './App.css';
import AllSales from './components/AllSales';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditSale from './components/EditSale';
import AddSale from './components/AddSale';
import Nav from './components/addones/Nav'
import ShowSale from './components/ShowSale';
import StatShoose from './components/StatShoose';
function App() {
  return (
    <BrowserRouter>
    
    <div className="App" >
      <Nav/>
      <Routes>
        <Route path='/' element={<AllSales/>} />
        <Route path='/store' element={<AddSale/>} />
        <Route path='/select' element={<StatShoose/>} />
        <Route path='edit/:id' element={<EditSale/>} />
        <Route path='show/:id' element={<ShowSale/>} />

        </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
