
import PropTypes from 'prop-types';

const GameCard = ({ game, handleGameSelection }) => {
    return (
        <button onClick={() => handleGameSelection(game)}>{game}</button>
    );
};

GameCard.propTypes = {
    game: PropTypes.string.isRequired,
    handleGameSelection: PropTypes.func.isRequired
};

export default GameCard;