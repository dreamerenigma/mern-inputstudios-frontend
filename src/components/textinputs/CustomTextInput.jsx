import PropTypes from 'prop-types';

const CustomTextInput = ({ type, placeholder, leftIcon, value, onChange }) => {
    return (
        <div className="relative w-full">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-12 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-0 focus:border-teal-500 bg-transparent w-full"
            />
            {leftIcon && (
                <span className="absolute inset-y-0 left-2 flex items-center pr-3 text-gray-400">
                    {leftIcon}
                </span>
            )}
        </div>
    );
};

CustomTextInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    leftIcon: PropTypes.node,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

CustomTextInput.defaultProps = {
    type: 'text',
    placeholder: '',
    leftIcon: null,
};

export default CustomTextInput;
