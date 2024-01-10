import PropTypes from 'prop-types';

const ImageComponent = ({ filename }) => {

  const imagePath = `../../public/images/${filename}`;

  return (
    <img src={imagePath} alt={filename} />
  );
};

ImageComponent.propTypes = {
    filename: PropTypes.string.isRequired,
}

export default ImageComponent;
