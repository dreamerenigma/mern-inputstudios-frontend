import { useSelector } from 'react-redux';

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

export default Divider;
