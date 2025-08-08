import { useEffect, useRef, useState } from 'react';
import defaultAvatar from "../../public/images/proxy-image.jpg";
import { authUser } from '../api/authApi.js';

function ProfilePages() {
  const fileInputRef = useRef();
  const { user: authUserData, loading, updateProfileImage, EditProfileInfo } = authUser();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    birthday: '',
    country: '',
    city: '',
    zipCode: '',
  });

  useEffect(() => {
    if (authUserData) {
      setUser(authUserData);
      setFormData({
        name: authUserData.name || '',
        email: authUserData.email || '',
        mobile: authUserData.mobile || '',
        gender: authUserData.gender || '',
        birthday: authUserData.birthday || '',
        country: authUserData.country || '',
        city: authUserData.city || '',
        zipCode: authUserData.zipCode || '',
      });
    }
  }, [authUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedUser = await updateProfileImage(file);
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  };

  const handleSave = async () => {
    const updated = await EditProfileInfo(user._id, formData);
    if (updated) {
      setUser(updated);
      setEditMode(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-800">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* LEFT COLUMN - PROFILE IMAGE */}
          <div className="md:w-1/3 bg-cyan-100 flex flex-col items-center justify-center p-8">
            <div className="relative cursor-pointer group" onClick={handleImageClick}>
              <img
                src={user.profileImage || defaultAvatar}
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-cyan-400 object-cover shadow-md group-hover:scale-105 transition-transform"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {loading && <p className="text-xs mt-2 text-cyan-600">Uploading...</p>}
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <p className="text-gray-600 text-sm capitalize">{user.role}</p>
            <p className="text-xs text-gray-500 mt-1">
              Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>

          {/* RIGHT COLUMN - PROFILE FORM */}
          <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-cyan-500">Profile Details</h3>
              <button
                onClick={editMode ? handleSave : () => setEditMode(true)}
                className="text-sm bg-cyan-500 text-white px-3 py-1 rounded shadow hover:bg-cyan-600 transition"
              >
                {editMode ? "Save" : "Edit"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileInput label="Full Name" name="name" value={formData.name} onChange={handleChange} disabled={!editMode} />
              <ProfileInput label="Email" name="email" value={formData.email} disabled />
              <ProfileInput label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} disabled={!editMode} />
              <ProfileInput label="Gender" name="gender" value={formData.gender} onChange={handleChange} disabled={!editMode} />
              <ProfileInput label="Birthday" name="birthday" type="date" value={formData.birthday} onChange={handleChange} disabled={!editMode} />
              <ProfileInput label="Country" name="country" value={formData.country} onChange={handleChange} disabled={!editMode} />
              <ProfileInput label="City" name="city" value={formData.city} onChange={handleChange} disabled={!editMode} />
              <ProfileInput label="Zip Code" name="zipCode" type="number" value={formData.zipCode} onChange={handleChange} disabled={!editMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileInput({ label, name, value, onChange, type = "text", disabled = false }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`border px-3 py-2 rounded-md text-sm ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        }`}
      />
    </div>
  );
}

export default ProfilePages;
