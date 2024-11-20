import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from "../../redux/user/userSlice";
import PropTypes from 'prop-types';
import { RiCloseLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { showTooltip, hideTooltip } from "../../redux/ui/uiSlice"; 
import { deleteUser } from '../../api/userApi';

export default function DeleteUserModal({ currentUser, error, setShowModal, showModal }) {
   const { t } = useTranslation();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleDeleteUser = async () => {
      setShowModal(false);
      dispatch(deleteUserStart());
      const { success, data, error } = await deleteUser(currentUser._id);
      if (success) {
         dispatch(deleteUserSuccess(data));
         console.log("Dispatching Tooltip: Пользователь успешно удален!");
         dispatch(showTooltip("Пользователь успешно удален!"));
         navigate("/");
         setTimeout(() => {
            dispatch(hideTooltip());
         }, 5000);
      } else {
         dispatch(deleteUserFailure(data?.message || error));
      }
   };

   return (
      <>
         {error && (
            <Alert color="failure" className="mt-5">
               {error}
            </Alert>
         )}
         {showModal && (
            <div
               className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
               onClick={() => setShowModal(false)}
            >
               <div
                  className="relative border border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-[400px] w-full"
                  onClick={(e) => e.stopPropagation()}
               >
                  <button
                     className="absolute top-3 right-3 text-3xl hover:bg-gray-500 rounded text-gray-500 dark:text-gray-300 transition-transform transform hover:translate-y-[-4px]"
                     onClick={() => setShowModal(false)}
                  >
                     <RiCloseLine className="h-6 w-6" />
                  </button>
                  <div className="text-center">
                     <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                     <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                        {t("profile:sure_delete_your_account")}
                     </h3>
                     <div className="flex justify-between w-full gap-4">
                        <button
                           className="px-4 py-2 bg-red-600 hover:bg-red-800 shadow-md rounded-lg flex-grow"
                           onClick={handleDeleteUser}
                        >
                           {t("yes_sure")}
                        </button>
                        <button
                           className="px-4 py-2 bg-gray-600 hover:bg-gray-700 shadow-md text-white rounded-lg flex-grow"
                           onClick={() => setShowModal(false)}
                        >
                           {t("no_cancel")}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );   
}

DeleteUserModal.propTypes = {
   currentUser: PropTypes.object.isRequired, 
   error: PropTypes.string,
   setShowModal: PropTypes.func.isRequired,
   showModal: PropTypes.bool.isRequired,
};
