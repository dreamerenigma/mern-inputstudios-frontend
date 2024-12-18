import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function ListItem({ children, icon = faCheck, iconClass = "text-blue-500", bold = true, size = "2x" }) {
  return (
    <li className="flex items-start mt-8">
      <FontAwesomeIcon icon={icon} className={`${iconClass} mt-1 mr-4 md:mr-6`} size={size} />
      <span className={bold ? "font-bold" : "font-normal"}>{children}</span>
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.object,
  iconClass: PropTypes.string,
  bold: PropTypes.bool,
  size: PropTypes.string,
};
