import React, { useRef, useState } from "react";
import { IoAddOutline, IoClose } from "react-icons/io5";
import Loading from './Loading';
import api from "../services/api";
import { toast } from "react-toastify";
import { updateAvatar, updateCoverImage } from "../store/UserSlice";
import { useDispatch } from "react-redux";

function EditImageModal({ type, close }) {
  const isAvatar = type === "avatar";

  const dispatch = useDispatch()
  
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectImage = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // basic validation
    if (!selected.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setFile(selected)
    setPreview(URL.createObjectURL(selected));
  };


  const handleSave = async () =>{
    if(!file) return;

    try{
      // formData.append("image", file);
      // formData.append("type", type)
      setLoading(true)
      
      const formData = new FormData();
        // HANDLE API HERE
        if(isAvatar){
          formData.append("avatar", file)
          const response = await api.patch("users/update-avatar", formData);
          const avatar = response.data?.data?.user?.avatar
          dispatch(updateAvatar(avatar))
        }else{
          formData.append("coverImage", file)
          const response = await api.patch("users/update-coverImage", formData);
          const coverImage = response.data?.data?.user?.coverImage
          dispatch(updateCoverImage(coverImage))
        }
        close()
    }catch(err){
      console.log(err)
      toast.error(err.response?.data?.message)
    } finally{
      setLoading(false)
    }
  }

  return (
    <>
    {loading && <Loading />}
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-2xl h-[80%] bg-[#222227] rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-between">

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <IoClose size={24} />
        </button>

        {/* Title */}
        <h2 className="text-white text-2xl font-semibold">
          {isAvatar ? "Edit Avatar" : "Edit Cover Image"}
        </h2>

        {/* Upload area */}
        <div
          onClick={handleSelectImage}
          className={`group flex items-center justify-center border-2 border-dashed border-gray-500 
          cursor-pointer transition hover:border-blue-500 bg-gray-400/20 overflow-hidden
          ${
            isAvatar
              ? "w-64 h-64 rounded-full"
              : "w-full max-w-xl aspect-[16/9] rounded-lg"
          }`}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-300 group-hover:text-white">
              <IoAddOutline size={isAvatar ? 48 : 40} />
              <span className="mt-2 text-sm">
                {isAvatar ? "Upload avatar" : "Upload cover image"}
              </span>
            </div>
          )}
        </div>

        {/* Hidden input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={close}
            className="px-8 py-3 rounded-md bg-gray-600 text-white hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            disabled={!preview}
            onClick={handleSave}
            className={`px-10 py-3 rounded-md font-medium text-white transition
              ${
                preview
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-500/40 cursor-not-allowed"
              }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditImageModal;
