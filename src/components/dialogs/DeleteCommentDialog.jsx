import { HiOutlineExclamationCircle } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const DeleteCommentDialog = ({ show, onClose, onConfirm }) => {
  const { t } = useTranslation();
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 shadow-sm">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 border-dialog border-gray-700">
                <div className="text-center">
                    <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                    <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                      {t("dialogs:sure_want_delete_comment")}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <button
                          className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 shadow-md"
                          onClick={onConfirm}
                        >
                          {t("dialogs:yes_im_sure")}
                        </button>
                        <button
                          className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 shadow-md"
                          onClick={onClose}
                        >
                          {t("dialogs:no_cancel")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

DeleteCommentDialog.propTypes = {
  show: PropTypes.string.isRequired,
  onClose: PropTypes.string.isRequired,
  onConfirm: PropTypes.string.isRequired,
};

export default DeleteCommentDialog;
