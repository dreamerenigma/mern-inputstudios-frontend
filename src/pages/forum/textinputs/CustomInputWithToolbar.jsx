import { AiOutlineBold } from "react-icons/ai";
import { FiItalic } from "react-icons/fi";
import { AiOutlineUnderline } from "react-icons/ai";
import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { PiTextAa } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsTextLeft } from "react-icons/bs";
import { BsTextCenter } from "react-icons/bs";
import { BsTextRight } from "react-icons/bs";
import { CiTextAlignJustify } from "react-icons/ci";
import { FaListOl } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { MdOutlineFormatIndentIncrease, MdOutlineFormatIndentDecrease } from "react-icons/md";
import { IoLinkSharp, IoUnlink } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import ImageUploadModal from "../dialogs/ImageUploadDialog";
import InsertLinkDialog from "../dialogs/InsertLinkDialog";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function CustomInputWithToolbar ({ value = '', onChange }) {
   const { t } = useTranslation();
   const dropdownRef = useRef(null);
   const dropdownFontRef = useRef(null);
   const editableRef = useRef(null);
   const [isDropdownOpen, setDropdownOpen] = useState(false);
   const [isFontDropdownOpen, setFontDropdownOpen] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [content, setContent] = useState("");
   const [isBold, setIsBold] = useState(false);
   const [isItalic, setIsItalic] = useState(false);
   const [isUnderline, setIsUnderline] = useState(false);
   const [isDialogOpen, setDialogOpen] = useState(false);
   const [textAlign, setTextAlign] = useState('');
   const [hasIndent, setHasIndent] = useState(false);
   const [isLinkSelected, setIsLinkSelected] = useState(false);
   const [hasList, setHasList] = useState(false);
   const [containerHeight, setContainerHeight] = useState('400px');
   const [selectedColor, setSelectedColor] = useState('#FFFFFF');
   const [selectedFontSize, setSelectedFontSize] = useState('Стандартный');
   const [fontSize, setFontSize] = useState('16px');
   const colors = ['#FF0000', '#00FF00', '#0000FF'];

   useEffect(() => {
      const handleSelectionChange = () => {
         const selection = window.getSelection();
         if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let parentLink = null;
            if (range.startContainer.nodeType === Node.TEXT_NODE) {
               parentLink = range.startContainer.parentElement.closest('a');
            } else {
               parentLink = range.startContainer.closest('a');
            }
            const isInsideLink = parentLink !== null;
            const isTextSelected = range.toString().trim().length > 0;
            console.log("Selected Node:", range.startContainer);
            console.log("Parent Link:", parentLink);
            console.log("Is link selected:", isInsideLink);
            console.log("Is text selected:", isTextSelected);
            setIsLinkSelected(isInsideLink && isTextSelected);
         } else {
            setIsLinkSelected(false);
         }
      };
   
      document.addEventListener("selectionchange", handleSelectionChange);
      return () => {
         document.removeEventListener("selectionchange", handleSelectionChange);
      };
   }, []);
   
   const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setDropdownOpen(false);
      }
      if (dropdownFontRef.current && !dropdownFontRef.current.contains(event.target)) {
         setFontDropdownOpen(false);
      }
   };
   
   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, []);

   useEffect(() => {
      if (editableRef.current && editableRef.current.innerText !== value) {
      editableRef.current.innerText = value;
      setContent(value);
      }
   }, [value]);

   const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
   };

   const toggleFontDropdown = () => {
      setFontDropdownOpen(!isFontDropdownOpen);
   };

   const handleColorSelect = (color) => {
      setSelectedColor(color);
      setDropdownOpen(false);
   };

   const handleFontSizeSelect = (fontSizeOption) => {
      setSelectedFontSize(fontSizeOption);
      let newFontSize;
      switch (fontSizeOption) {
         case 'Заголовок 1':
            newFontSize = '32px';
            break;
         case 'Заголовок 2':
            newFontSize = '24px';
            break;
         case 'Заголовок 3':
            newFontSize = '20px';
            break;
         case 'Стандартный':
            newFontSize = '16px';
            break;
         case 'Блок кода':
            newFontSize = '14px';
            break;
         default:
            newFontSize = '16px';
      }
      setFontSize(newFontSize);
      setTimeout(() => {
         const selection = window.getSelection();
         const range = document.createRange();
         range.selectNodeContents(editableRef.current);
         range.collapse(false);
         selection.removeAllRanges();
         selection.addRange(range);
         editableRef.current.focus();
      }, 0);
      setFontDropdownOpen(false);
   };

   const handleOpenModal = () => {
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
   };

   const handleInput = (e) => {
      const editableElement = e.target;
      const currentText = editableElement.innerText;
      setContent(currentText);
      setContainerHeight(editableElement.scrollHeight);
      const indentExists = checkIndent();
      setHasIndent(indentExists);
      const listExists = editableElement.querySelector('ul') !== null || editableElement.querySelector('ol') !== null;
      setHasList(listExists);
      if (onChange) {
         onChange(currentText);
      }
   };

   const adjustHeight = () => {
      const container = editableRef.current;
      if (container) {
         container.style.height = 'auto';
         const newHeight = container.scrollHeight;
         setContainerHeight(newHeight < 400 ? '400px' : `${newHeight}px`);
      }
   };

   useEffect(() => {
      adjustHeight();
   }, [content]);

   const handleImageUpload = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
         const img = new Image();
         img.src = e.target.result;

         img.onload = () => {
            const imgHeight = img.height;
            const container = editableRef.current;

            if (imgHeight > container.offsetHeight) {
               setContainerHeight(imgHeight);
            }

            const newContent = `${content}<img src="${e.target.result}" alt="uploaded" style="max-width: 100%;" />`;
            setContent(newContent);
            container.innerHTML = newContent;

            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(container);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
         };
      };
      reader.readAsDataURL(file);
   };

   const toggleBold = () => {
      setIsBold((prev) => !prev);
      document.execCommand('bold', false, null);
   };

   const toggleItalic = () => {
      setIsItalic(!isItalic);
      document.execCommand('italic', false, null);
   };

   const toggleUnderline = () => {
      setIsUnderline(!isUnderline);
      document.execCommand('underline');
   };

   const handleTextAlign = (align) => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
         const range = selection.getRangeAt(0);
         setTextAlign((prevAlign) => {
            if (prevAlign === align) {
               editableRef.current.style.textAlign = '';
               return '';
            } else {
               editableRef.current.style.textAlign = align;
               return align;
            }
         });
         range.collapse(false);
         selection.removeAllRanges();
         selection.addRange(range);
      }
   };

   const handleInsert = (url, text) => {
      if (editableRef.current) {
         editableRef.current.focus();
         document.execCommand(
            "insertHTML",
            false,
            `<a href="${url}" target="_blank" contenteditable="false" class="underline text-black dark:text-white">${text}</a>`
         );
      }
   };

   const checkIndent = () => {
      if (editableRef.current) {
         const text = editableRef.current.innerHTML;
         return text.includes('padding') || text.includes('margin') || text.includes('block');
      }
      return false;
   };

   const increaseIndent = () => {
      if (editableRef.current) {
         document.execCommand('indent');
         setHasIndent(true);
      }
   };

   const decreaseIndent = () => {
      if (editableRef.current) {
         document.execCommand('outdent');
         setHasIndent(checkIndent());
      }
   };

   const handleUnlink = () => {
      if (isLinkSelected && editableRef.current) {
         document.execCommand("unlink");
         setIsLinkSelected(false);
      }
   };

   const handlePaste = (event) => {
      event.preventDefault();
      const text = event.clipboardData.getData('text');
      document.execCommand('insertText', false, text);
   };

   const addListItem = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
         const range = selection.getRangeAt(0);
         const listItem = document.createElement('li');
         const bulletPoint = document.createElement('span');
         bulletPoint.textContent = '· ';
         bulletPoint.style.fontSize = '22px';
         bulletPoint.style.marginLeft= '30px';
         listItem.appendChild(bulletPoint);
         let list = range.startContainer.closest('ul');
         if (!list) {
            list = document.createElement('ul');
            range.insertNode(list);
         }
         list.appendChild(listItem);
         range.setStartAfter(listItem);
         range.collapse(true);
         selection.removeAllRanges();
         selection.addRange(range);
      }
   };

   return (
      <div className="w-full border border-gray-300 dark:border-gray-700 rounded-md">
         <div className="bg-gray-200 dark:bg-gray-800 rounded-t-md flex flex-wrap items-center border-b dark:border-gray-700 px-4 py-2">
            <div className="flex flex-wrap gap-3">
               <div className="flex items-stretch border-button rounded-lg border-gray-500">
                  <button className="flex items-center p-2 border-gray-500 last:border-0 hover:bg-gray-600 focus:outline-none">
                     <IoIosUndo className="w-4 h-4 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
                  <div className="border-r border-gray-500 h-full" />
                  <button className="flex items-center p-2 hover:bg-gray-600 focus:outline-none">
                     <IoIosRedo className="w-4 h-4 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
               </div>
               <div className="flex items-stretch border-button rounded-lg border-gray-500">
                  <button
                     className={`flex items-center p-2 border-gray-600 last:border-0 focus:outline-none ${isBold ? 'bg-teal-500 rounded-tl-md rounded-bl-md' : ''}`}
                     onClick={toggleBold}
                  >
                     <AiOutlineBold className="w-4 h-4 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
                  <div className="border-r border-gray-500 h-full" />
                  <button
                     className={`flex items-center p-2 border-gray-600 last:border-0 ${isItalic ? 'bg-teal-500 italic' : 'hover:bg-gray-600'}`}
                     onClick={toggleItalic}
                  >
                     <FiItalic className="w-4 h-4 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
                  <div className="border-r border-gray-500 h-full" />
                  <button
                     className={`flex items-center p-2  ${isUnderline ? 'bg-teal-500 underline rounded-tr-md rounded-br-md' : 'hover:bg-gray-600'}`}
                     onClick={toggleUnderline}
                  >
                     <AiOutlineUnderline className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
               </div>
               <div className="relative inline-block" ref={dropdownRef}>
                  <div className="border-button rounded-lg border-gray-500">
                     <button
                        className="flex flex-col items-center p-2 hover:bg-gray-600 focus:outline-none"
                        onClick={toggleDropdown}
                     >
                        <div className="flex items-center">
                           <PiTextAa className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                           <IoMdArrowDropdown className="ml-4 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                        </div>
                        <div
                           className="mt-1 h-0.5 rounded-md w-full mr-8"
                           style={{
                              backgroundColor: selectedColor,
                              width: 'calc(100% - 1.9rem)',
                           }}
                        ></div>
                     </button>
                  </div>
                  {isDropdownOpen && (
                     <div
                        className="absolute left-0 mt-2 w-24 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50"
                     >
                        <div className="flex justify-around p-2">
                           {colors.map((color) => (
                              <div
                                 key={color}
                                 className="w-5 h-5 cursor-pointer rounded-md"
                                 style={{ backgroundColor: color }}
                                 onClick={() => handleColorSelect(color)}
                              ></div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
               <div className="flex items-stretch border-button rounded-lg border-gray-500">
                  <button
                     className={`flex items-center p-2 border-gray-600 last:border-0 focus:outline-none ${textAlign === 'left' ? 'bg-teal-500 rounded-tl-md rounded-bl-md' : 'hover:bg-gray-600 '}`}
                     onClick={() => handleTextAlign('left')}
                  >
                     <BsTextLeft className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
                  <div className="border-r border-gray-500 h-full" />
                  <button
                     className={`flex items-center p-2 border-gray-600 last:border-0 focus:outline-none ${textAlign === 'center' ? 'bg-teal-500' : 'hover:bg-gray-600 '}`}
                     onClick={() => handleTextAlign('center')}
                  >
                     <BsTextCenter className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
                  <div className="border-r border-gray-500 h-full" />
                  <button
                     className={`flex items-center p-2 border-gray-600 last:border-0 focus:outline-none ${textAlign === 'right' ? 'bg-teal-500' : 'hover:bg-gray-600 '}`}
                     onClick={() => handleTextAlign('right')}
                  >
                     <BsTextRight className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
                  <div className="border-r border-gray-500 h-full" />
                  <button
                     className={`flex items-center p-2 border-gray-600 last:border-0 focus:outline-none ${textAlign === 'justify' ? 'bg-teal-500 rounded-tr-md rounded-br-md' : 'hover:bg-gray-600 '}`}
                     onClick={() => handleTextAlign('justify')}
                  >
                     <CiTextAlignJustify className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
               </div>
               <div className="relative inline-block" ref={dropdownFontRef}>
                  <div className="border-button rounded-md border-gray-500">
                     <button
                        className="flex flex-col items-center p-2 hover:bg-gray-600 focus:outline-none"
                        onClick={toggleFontDropdown}
                     >
                        <div className="flex items-center">
                              <span>{selectedFontSize}</span>
                              <IoMdArrowDropdown className="ml-4 text-gray-200 hover:text-gray-100" />
                        </div>
                     </button>
                  </div>
                  {isFontDropdownOpen && (
                     <div className="absolute left-0 mt-1 w-full bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50">
                        <div className="flex flex-col">
                           <span className="text-2xl text-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100 px-4 py-2 rounded-t-md" onClick={() => handleFontSizeSelect('Заголовок 1')}>
                              {t("forum:heading_1")}
                           </span>
                           <span className="text-lg text-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100 px-4 py-2" onClick={() => handleFontSizeSelect('Заголовок 2')}>
                              {t("forum:heading_2")}
                           </span>
                           <span className="text-base text-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100 px-4 py-2" onClick={() => handleFontSizeSelect('Заголовок 3')}>
                              {t("forum:heading_3")}
                           </span>
                           <span className="text-base text-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100 px-4 py-2" onClick={() => handleFontSizeSelect('Стандартный')}>
                              {t("forum:standard")}
                           </span>
                           <span className="text-base text-gray-200 cursor-pointer hover:bg-gray-700 hover:text-gray-100 px-4 py-2 rounded-b-md" onClick={() => handleFontSizeSelect('Блок кода')}>
                              {t("forum:code_block")}
                           </span>
                        </div>
                     </div>
                  )}
               </div>
               <div className="flex items-stretch border-button rounded-lg border-gray-500">
                  <button className="flex items-center p-2 border-gray-600 last:border-0 hover:bg-gray-600 focus:outline-none">
                     <FaListOl className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
                  <div className="border-r border-gray-500 h-full" />
                  <button 
                     onClick={addListItem}
                     className="flex items-center p-2 border-gray-600 last:border-0 hover:bg-gray-600 focus:outline-none"
                  >
                     <FaListUl className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
                  <div className="border-r border-gray-500 h-full" />
                  <button
                     className="flex items-center p-2 hover:bg-gray-600 focus:outline-none"
                     onClick={increaseIndent}
                  >
                     <MdOutlineFormatIndentIncrease className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
                  <div className="border-r border-gray-500 h-full" />
                  <button
                     className={`flex items-center p-2 focus:outline-none ${
                        !hasIndent ? 'opacity-50 cursor-default' : 'hover:bg-gray-600 cursor-pointer'
                     }`}
                     onClick={decreaseIndent}
                     disabled={!hasIndent}
                  >
                     <MdOutlineFormatIndentDecrease
                        className={`w-5 h-5 ${!hasIndent ? 'text-gray-400' : 'text-white'}`}
                     />
                  </button>
               </div>
               <div className="flex items-stretch border-button rounded-lg border-gray-500 mr-3">
                  <button
                     className="flex items-center p-2 border-gray-600 last:border-0 hover:bg-gray-600 focus:outline-none"
                     onClick={() => setDialogOpen(true)}
                  >
                     <IoLinkSharp className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
                  {isDialogOpen && (
                     <InsertLinkDialog
                        onClose={() => setDialogOpen(false)}
                        onInsert={handleInsert}
                     />
                  )}
                  <div className="border-r border-gray-500 h-full" />
                  <button
                     onClick={handleUnlink}
                     disabled={!isLinkSelected}
                     className={`flex items-center p-2 border-gray-600 last:border-0 focus:outline-none ${
                        isLinkSelected ? "hover:bg-gray-600" : "opacity-50"
                     }`}
                  >
                     <IoUnlink
                        className={`w-5 h-5 ${isLinkSelected ? "text-gray-100 dark:text-gray-200" : "text-gray-400"}`}
                     />
                  </button>
                  <div className="border-r border-gray-500 h-full" />
                  <button className="flex items-center p-2 hover:bg-gray-600 focus:outline-none" onClick={handleOpenModal}>
                     <AiFillPicture className="w-5 h-5 text-gray-600 dark:text-gray-200 hover:text-gray-100" />
                  </button>
               </div>
               {isModalOpen && (
                  <ImageUploadModal onClose={handleCloseModal} onImageUpload={handleImageUpload} />
               )}
            </div>
         </div>
         <div className="relative w-full">
            <div
               ref={editableRef}
               id="editableContainer"
               className="editableField w-full p-4  bg-gray-200 dark:bg-gray-800 rounded-b-md outline-none border-none ring-0 focus:outline-none resize-none"
               contentEditable
               suppressContentEditableWarning
               onInput={handleInput}
               onPaste={handlePaste}
               style={{
                  height: 'auto',
                  minHeight: containerHeight,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  textAlign: textAlign,
                  fontSize: fontSize,
               }}
            />
            {!editableRef.current?.innerText && !hasList && (
               <div className="absolute left-4 top-4 text-gray-500 pointer-events-none">
                  {t("forum:enter_text")}
               </div>
            )}
         </div>
      </div>
   );
}

CustomInputWithToolbar.propTypes = {
   value: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
};
