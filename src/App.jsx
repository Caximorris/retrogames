import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/homePage';
import Footer from './components/Footer';
import './styles/App.css';
import TicTacToe from './games/TicTacToe/TicTacToe';
import Pong from './games/Pong/Pong';
import Snake from './games/Snake/Snake';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
            <Route path="/pong" element={<Pong />} />
            <Route path="/snake" element={<Snake />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;