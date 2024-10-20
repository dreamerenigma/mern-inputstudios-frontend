import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal, Button } from 'flowbite-react';

export default function DownloadModal({ setShowModal, showModal }) {

   return (
      <>
         <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
            <Modal.Header />
            <Modal.Body>
               <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                  <h3 className="mb-5 text-lg text-gray-500 dark:text-fray-400">
                     Are you sure you want to delete your account?
                  </h3>
                  <div className="flex justify-center gap-4">
                     <Button color="gray" onClick={() => setShowModal(false)}>
                        Accept and download
                     </Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
}
