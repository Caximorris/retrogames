import PropTypes from 'prop-types';

const Paddle = ({position, size}) => {

    return (
        <div
            className="paddle"
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                position: 'absolute',
                width: `${size.width}px`,
                height: `${size.height}px`,
                backgroundColor: 'white',
            }}
        />
    );
}

Paddle.propTypes = {
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }),
    size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    })
};

export default Paddle;
