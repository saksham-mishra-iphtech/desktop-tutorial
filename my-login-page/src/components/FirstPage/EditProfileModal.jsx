import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/login/LoginSlice";

const EditProfileModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.currentUser);
  
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    dob: currentUser.dob,
    gender: currentUser.gender,
    address: currentUser.address || "",
    city: currentUser.city || "",
    state: currentUser.state || "",
    country: currentUser.country || "",
    bio: currentUser.bio || "",
    phoneNo: currentUser.phoneNo || "",
    username: currentUser.username || '',
    password: currentUser.password || "",
    profileImage: currentUser.profileImage || "",
    zipCode: currentUser.zipCode || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  
    // Find the existing user and update their details
    const updatedUsers = allUsers.map(user =>
      user.email === currentUser.email ? { ...user, ...formData } : user
    );
  
    // Save updated users list in Local Storage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  
    // Update the current user in Redux and Local Storage
    const updatedUser = updatedUsers.find(user => user.email === currentUser.email);
    dispatch(signup(updatedUser));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  
    closeModal();
  };
  
  

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>


       <label className="block text-sm font-medium">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />

        <label className="block text-sm font-medium">Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />

        <label className="block text-sm font-medium">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full mb-3 rounded bg-gray-200" />

        <label className="block text-sm font-medium">DOB</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />

        <label className="block text-sm font-medium">Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 w-full mb-3 rounded">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className="block text-sm font-medium">Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />

        <label className="block text-sm font-medium">Zip Code</label>
        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />

        <label className="block text-sm font-medium">City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />

        <label className="block text-sm font-medium">State</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />

        <label className="block text-sm font-medium">Country</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />

        <label className="block text-sm font-medium">Bio</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} className="border p-2 w-full mb-3 rounded"></textarea>

        <label className="block text-sm font-medium">Phone</label>
        <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />

        <label className="block text-sm font-medium">Password</label>
        <input type="text" name="password" value={formData.password} onChange={handleChange} className="border p-2 w-full mb-3 rounded" />

    
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal}>Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
