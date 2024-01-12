import PropTypes from 'prop-types';
import '../styles/dice.scss';

const Dice = ({ value, onClick, isSelected }) => {
    return (
        <li className={isSelected ? 'selected' : ''} onClick={onClick}>
            <img src={value} alt={`dé`} />
        </li>   
    )
};

Dice.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
}

export default Dice;
