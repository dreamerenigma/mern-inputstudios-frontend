import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Divider = ({ className = '', style = {}, lightColor = 'black', darkColor = 'white' }) => {
  const { theme } = useSelector((state) => state.theme);
  const color = theme === 'dark' ? darkColor : lightColor;

  return (
    <div
      className={`h-0.5 w-full ${className}`}
      style={{ backgroundColor: color, ...style }}
    ></div>
  );
};

Divider.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  lightColor: PropTypes.string,
  darkColor: PropTypes.string,
};

export default Divider;
