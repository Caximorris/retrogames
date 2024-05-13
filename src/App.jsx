import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import Footer from './components/Footer';
import './styles/App.css';
import TicTacToe from './games/TicTacToe/TicTacToe';
import Pong from './games/Pong/Pong';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/pong" element={<Pong />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;