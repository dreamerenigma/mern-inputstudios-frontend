import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate('/dashboard?tab=profile');
  };

  return (
    <div className="ml-6">
      <div className="ml-6 pt-6">
        <p className="text-3xl mb-6">Change your password</p>
        <p className="text-md">A strong password helps prevent unauthorized access to your email account.</p>
      </div>
      <div className="ml-6">
        <div className="text-left mb-4 mt-6">
          <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">Current password</p>
          <input 
            type="text" 
            placeholder="Current password" 
            className={`border ${theme === 'dark' ? 'bg-transparent' : 'bg-white'} border-gray-300 dark:border-gray-600 rounded-md p-2 w-1/3 mt-1`} 
          />
          <Link to="/password/reset" className="text-blue-500 block">
            Forgot your password?
          </Link>
        </div>
      </div>
      <div className="ml-6">
        <div className="text-left mb-4">
        <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">New password</p>
        <input 
          type="text" 
          placeholder="New password" 
          className={`border ${theme === 'dark' ? 'bg-transparent' : 'bg-white'} border-gray-300 dark:border-gray-600 rounded-md p-2 w-1/3 mt-1`} 
        />
          <p className="text-sm">8-character minimum; case sensitive</p>
        </div>
      </div>
      <div className="ml-6">
        <div className="text-left mb-2">
          <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">Reenter password</p>
          <input 
            type="text" 
            placeholder="Reenter password" 
            className={`border ${theme === 'dark' ? 'bg-transparent' : 'bg-white'} border-gray-300 dark:border-gray-600 rounded-md p-2 w-1/3 mt-1`} 
          />
        </div>
        <div className="flex items-center mt-1">
          <input type="checkbox" id="change-password" className="mr-2" />
          <label htmlFor="change-password" className="font-semibold text-gray-700 dark:text-gray-200">Make me change my password every 72 days</label>
        </div>
      </div>
      <div className="flex justify-left gap-2 ml-6 mt-16 mb-20">
        <Button color="blue">
          Save
        </Button>
        <Button color="gray"  onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
