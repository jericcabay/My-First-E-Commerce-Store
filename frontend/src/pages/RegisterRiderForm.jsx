import { useState } from "react";
import { authUser } from "../api/authApi.js";
import { registerRiderApi } from "../api/registerRiderApi.js";

const RegisterRiderForm = () => {
  const { user } = authUser();
  const { loading, registerAsRider } = registerRiderApi();

  const [formData, setFormData] = useState({
    mobile: '',
    gender: '',
    birthday: '',
    age: '',
    vehicleType: '',
    plateNumber: '',
    country: '',
    city: '',
    address: '',
    zipCode: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const success = await registerAsRider(formData);
    if(success) {
      setFormData({
        mobile: '',
        gender: '',
        birthday: '',
        age: '',
        vehicleType: '',
        plateNumber: '',
        country: '',
        city: '',
        address: '',
        zipCode: '',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Complete Rider Registration</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className="p-3 border rounded-lg text-gray-600"
            placeholder="Add Contact Number"
            disabled={user?.mobile !== ""}
            required/>

          <select
            name="gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value})}
            className="p-3 border rounded-lg text-gray-600"
            disabled={user?.gender !== ""}
            required>

            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={(e) => setFormData({ ...formData, birthday: e.target.value})}
            className="p-3 border rounded-lg text-gray-600"
            disabled={user?.birthday !== ""}
            required/>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value})}
            className="p-3 border rounded-lg text-gray-600"
            disabled={user?.age === ""}
            placeholder="Age"
            required/>

          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value})}
            className="p-3 border rounded-lg text-gray-600"
            required>

            <option value="">Vehicle Type</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="bicycle">Bicycle</option>
            <option value="car">Car</option>
          </select>

          <input
            type="text"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value})}
            className="p-3 border rounded-lg text-gray-600"
            disabled={user?.plateNumber === ""}
            placeholder="Add Plate Number"
            required/>

          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value})}
            className="p-3 border rounded-lg text-gray-600"
            disabled={user?.country !== ""}
            placeholder="Add Country"
            required/>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value})}
            className="p-3 border rounded-lg text-gray-600"
            disabled={user?.city !== ""}
            placeholder="Add City"
            required/>

          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value})}
            className="p-3 border rounded-lg text-gray-600"
            disabled={user?.zipCode !== ""}
            placeholder="Add Zip Code"
            required
          />

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-sm   text-gray-300">Upload Licence ID</label>
            <input
              type="file"
              name="validID"
              accept=".jpg,.jpeg,.png,.pdf"
              className="w-full p-3 border rounded-lg text-gray-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-sm text-gray-300">Upload Profile Photo</label>
            <input
              type="file"
              name="profilePhoto"
              accept=".jpg,.jpeg,.png"
              className="w-full p-3 border rounded-lg text-gray-600"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button type="submit" className="w-full text-white text-lg py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
              Submit Rider Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterRiderForm;
