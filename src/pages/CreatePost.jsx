import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
   getDownloadURL, 
   getStorage,
   ref,
   uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

export default function CreatePost() {
   const [file, setFile] = useState(null);
   const [fileUploadProgress, setFileUploadProgress] = useState(null);
   const [fileUploadError, setFileUploadError] = useState(null); 
   const [formData, setFormData] = useState({});
   const [publishError, setPublishError] = useState(null);
   const navigate = useNavigate();

   const handleUploadFile = async () => {
   try {
      if (!file) {
         setFileUploadError('Please select a file');
         return;
      }
      setFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFileUploadProgress(progress.toFixed(0));
         },
         (error) => {
            setFileUploadError("File upload failed");
            setFileUploadProgress(null);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setFileUploadProgress(null);
               setFileUploadError(null);
               // Проверяем, является ли загруженный файл видео
               if (file.type.includes('video')) {
                  // Если да, устанавливаем URL только для видео
                  setFormData({ ...formData, video: downloadURL, previewImage: downloadURL });
               } else {
                  // Иначе устанавливаем URL только для изображения
                  setFormData({ ...formData, image: downloadURL });
               }
            });
         }
      );

   } catch (error) {
      setFileUploadError("File upload failed");
      setFileUploadProgress(null);
      console.log(error);
   }
};

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await fetch("/api/post/create", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         if (!res.ok) {
            setPublishError(data.message);
            return;
         }
         if (res.ok) {
            setPublishError(null);
            navigate(`/post/${data.slug}`);
         }
      } catch {
         setPublishError("Something went wrong");
      }
   };

   const getFileName = (url) => {
      const lastSlashIndex = url.lastIndexOf('/');
      return url.substring(lastSlashIndex + 1);
   };
   return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
         <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
               <TextInput
                  type="text"
                  placeholder="Title"
                  required id="title"
                  className="flex-1"
                  onChange={(e) =>
                     setFormData({ ...formData, title: e.target.value })
                  }
               />
               <Select
                  onChange={(e) => 
                     setFormData({ ...formData, category: e.target.value })
                  }
               >
                  <option value="uncategorized">Select a category</option>
                  <option value="javascript">JavaScript</option>
                  <option value="reactjs">React.js</option>
                  <option value="nextjs">Next.js</option>
                  <option value="nextjs">Unreal Engine</option>
               </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
               <FileInput
                  type="file"
                  accept="image/*, video/*"
                  onChange={(e) => setFile(e.target.files[0])}
               />
               <Button
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  size="sm"
                  outline
                  onClick={handleUploadFile}
                  disabled={fileUploadProgress}
               >
                  {fileUploadProgress ? (
                     <div className="w-16 h-16">
                        <CircularProgressbar
                           value={fileUploadProgress}
                           text={`${fileUploadProgress || 0}%`}
                        />
                     </div>
                  ) : (
                     "Upload Files"
                  )}
               </Button>
            </div>
            {fileUploadError && <Alert color="failure">{fileUploadError}</Alert>}
            {formData.image && (
               <div className="w-full h-72 mb-4">
                  <img
                     src={formData.image}
                     alt="upload"
                     className="w-full h-full object-cover"
                  />
               </div>
            )}
            {formData.video && (
               <div className="w-full h-72 mb-4">
                  <VideoPlayer
                     src={formData.video}
                     alt={getFileName(formData.video)}
                     previewImage={formData.previewImage}
                  />
               </div>
            )}
            <ReactQuill
               theme="snow"
               placeholder="Write something..."
               className="h-72 mb-12"
               required
               onChange={(value) => {
                  setFormData({ ...formData, content: value });
               }}
            />
            <Button type="submit" gradientDuoTone="purpleToPink">
               Publish
            </Button>
            {publishError && (
               <Alert className="mt-5" color="failure">
                  {publishError}
               </Alert>
            )}
         </form>
      </div>
   );
}
