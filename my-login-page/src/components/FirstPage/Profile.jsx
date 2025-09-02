import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  logout,
  uploadProfileImage,
  deleteProfileImage,
} from "../../features/login/LoginSlice";
import { FiEdit, FiLogOut, FiTrash2, FiMenu } from "react-icons/fi";
import EditProfileModal from "./EditProfileModal";
import AvatarEditor from "react-avatar-editor";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteUser } from "../../features/login/LoginSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.login.currentUser);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleteImageConfirmOpen, setIsDeleteImageConfirmOpen] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editor, setEditor] = useState(null);

  const userProfile = currentUser || {};


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleDeleteAccount = () => {
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteAccount = () => {
    dispatch(deleteUser());
    navigate("/");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsEditing(true);
    }
  };

  const handleSaveImage = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas().toDataURL();
      dispatch(uploadProfileImage(canvas));
      setSelectedImage(canvas);
      setIsEditing(false);
    }
  };

  const handleDeleteImage = () => {
    setIsDeleteImageConfirmOpen(true);
  };

  const confirmDeleteImage = () => {
    dispatch(deleteProfileImage());
    setIsDeleteImageConfirmOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f0f4fc] text-black ">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="w-full md:w-4/5 md:ml-[20%] p-6 flex flex-col relative ">
        <div className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-3 md:hidden shadow-md bg-[#f0f4fc]">
          <button
            className="text-2xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiMenu />
          </button>
        </div>

        <div className="fixed top-3 right-7">
          <button
            className="text-blue-900 px-4 py-2 rounded hover:bg-blue-100 flex items-center"
            onClick={() => setIsEditOpen(true)}
          >
            <FiEdit className="mr-2" /> Edit
          </button>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-6 p-4 pt-16">
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
            <div className="flex flex-col items-center mb-4">
              <img
                src={
                  userProfile.profileImage || "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border border-gray-300 object-cover"
              />

              <div className=" flex justify-center items-center gap-4 mt-2  ">
                <label className="cursor-pointer text-gray-600 text-xl  rounded-md">
                  <FaRegPenToSquare />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                {userProfile.profileImage && (
                  <button
                    onClick={handleDeleteImage}
                    className=" text-gray-6 rounded-md cursor-pointer text-2xl"
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                )}
              </div>
            </div>

            <div className="mt- space-y-2 text-left">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span>{" "}
                {userProfile.name || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                {userProfile.email || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">DOB:</span>{" "}
                {userProfile.dob || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Gender:</span>{" "}
                {userProfile.gender || "N/A"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 w-full">
              <button
                className="w-full sm:w-auto text-blue-900 px-4 py-2 rounded hover:bg-blue-100 flex items-center justify-center"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
              <button
                className="w-full sm:w-auto text-gray-500 px-4 py-2 rounded hover:bg-gray-100 flex items-center justify-center"
                onClick={handleDeleteAccount}
              >
                <FiTrash2 className="mr-2" /> Delete Account
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-rows-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Address</h3>
              <p className="text-gray-600">
                <span className="font-semibold">Address:</span>{" "}
                {userProfile.address || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Zip Code:</span>{" "}
                {userProfile.zipCode || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">City:</span>{" "}
                {userProfile.city || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">State:</span>{" "}
                {userProfile.state || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Country:</span>{" "}
                {userProfile.country || "N/A"}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Other Details</h3>
              <p className="text-gray-600">
                <span className="font-semibold">Bio:</span>{" "}
                {userProfile.bio || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Phone:</span>{" "}
                {userProfile.phoneNo || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Username:</span>{" "}
                {userProfile.username || "N/A"}
              </p>
              <tr>
                <td className="font-semibold text-gray-600">Password: </td>
                <td className="flex items-center text-gray-600 gap-2">
                  <span>
                    {showPassword
                      ? userProfile.password
                      : "*".repeat((userProfile.password || "N/A").length)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-600 hover:text-black"
                  >
                    {showPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </button>
                </td>
              </tr>
            </div>
          </div>
        </div>

        {isEditing && selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Adjust Image</h2>
              <AvatarEditor
                ref={(ref) => setEditor(ref)}
                image={selectedImage}
                width={200}
                height={200}
                border={50}
                borderRadius={100}
                scale={1.2}
              />
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveImage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditOpen && (
          <EditProfileModal closeModal={() => setIsEditOpen(false)} />
        )}

        {isDeleteConfirmOpen && (
          <div className="fixed md:top-2 md:left-150 left-0 top-12 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={confirmDeleteAccount}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setIsDeleteConfirmOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteImageConfirmOpen && (
          <div className="fixed md:top-2 md:left-150 left-0 top-13 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to delete your image?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={confirmDeleteImage}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setIsDeleteImageConfirmOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
