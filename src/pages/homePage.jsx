import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleGameSelection = (game) => {
        navigate(`/${game.toLowerCase().replace(/\s/g, '-')}`);
    };

    return (
        <div>
            <h1>Welcome to the Game Selection Page</h1>
            <p>Please select a game to play:</p>
            <button onClick={() => handleGameSelection('Tic Tac Toe')}>Tic Tac Toe</button>
            <button onClick={() => handleGameSelection('Pong')}>Pong</button>
            {/* Add more game buttons here */}
        </div>
    );
};

export default HomePage;