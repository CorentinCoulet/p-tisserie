import PropTypes from 'prop-types';

const SearchPastry = ({ setSearchTerm }) => {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher..."
        onChange={handleInputChange}
      />
    </div>
  );
};

SearchPastry.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
}

export default SearchPastry;
