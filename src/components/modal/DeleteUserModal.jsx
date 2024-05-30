import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal, Button, Alert } from 'flowbite-react';
import {
   deleteUserStart,
   deleteUserSuccess,
   deleteUserFailure,
} from "../../redux/user/userSlice";
import PropTypes from 'prop-types';

DeleteUserModal.propTypes = {
   currentUser: PropTypes.object.isRequired, 
   error: PropTypes.string,
   setShowModal: PropTypes.func.isRequired,
   showModal: PropTypes.bool.isRequired,
};

export default function DeleteUserModal({ currentUser, error, setShowModal, showModal }) {
   const dispatch = useDispatch();
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;

   const handleDeleteUser = async () => {
      setShowModal(false);
      try {
         dispatch(deleteUserStart());
         const res = await fetch(`${SERVER_URL}/api/user/delete/${currentUser._id}`, {
            method: "DELETE",
         });
         const data = await res.json();
         if (!res.ok) {
            dispatch(deleteUserFailure(data.message));
         } else {
            dispatch(deleteUserSuccess(data));
         }
      } catch (error) {
         dispatch(deleteUserFailure(error.message));
      }
   };

   return (
      <>
         {error && (
         <Alert color="failure" className="mt-5">
            {error}
         </Alert>
         )}
         <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
            <Modal.Header />
            <Modal.Body>
               <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                  <h3 className="mb-5 text-lg text-gray-500 dark:text-fray-400">
                     Are you sure you want to delete your account?
                  </h3>
                  <div className="flex justify-center gap-4">
                     <Button color="failure" onClick={handleDeleteUser}>
                        Yes, I&apos;m sure
                     </Button>
                     <Button color="gray" onClick={() => setShowModal(false)}>
                        No, cancel
                     </Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
}
