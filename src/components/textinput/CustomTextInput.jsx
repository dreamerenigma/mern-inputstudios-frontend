
const CustomTextInput = ({ type, placeholder, leftIcon, value, onChange }) => {
    return (
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-12 pr-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 bg-transparent"
            />
            {leftIcon && (
                <span className="absolute inset-y-0 left-2 flex items-center pr-3 text-gray-400">
                    {leftIcon}
                </span>
            )}
        </div>
    );
};

export default CustomTextInput;
