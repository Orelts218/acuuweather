import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Favorites from './pages/Favorites';

function App() {
  return (
   <BrowserRouter>
      <Header />
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/home/:id" element={<Home />}></Route>
      <Route path="/favorites" element={<Favorites />}></Route>
      <Route path="*" element={<Navigate to='/home'/>}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
