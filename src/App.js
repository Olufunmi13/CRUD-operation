import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './assets/Home';
import Create from './assets/Create';
import Update from './assets/Update';
import Read from './assets/Read';

function App() {
  
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/create' element={<Create />}></Route>
      <Route path='/update/:id' element={<Update />}></Route>
      <Route path='/read/:id' element={<Read />}></Route>
    </Routes> 
  </BrowserRouter>  
  );
}

export default App;
