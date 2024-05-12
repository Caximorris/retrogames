import PropTypes from "prop-types";

const Ball = ({position, diameter}) => {
    return (
        <div
            className="ball"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'absolute',
                width: `${diameter}px`,
                height: `${diameter}px`,
                borderRadius: '50%',
                backgroundColor: 'white'
            }}
        />
    );
};

Ball.propTypes = {
    diameter: PropTypes.number.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    })
}

export default Ball;
