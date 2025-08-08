import { useState } from 'react';
import { UserPlus, User, Mail, Loader, Phone, BadgeCheck, FileText } from 'lucide-react';
import { registerUser } from '../api/registerApi.js';
import govermentId from '../tools/governmentIdCategories.js';

function RegisterSellerForm() {
  const { loading, registerAsSeller } = registerUser();

  const [formData, setFormData] = useState({
    titleStore: '',
    businessEmail: '',
    businessNumber: '',
    governmentIdType: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registerAsSeller(formData);
    if (success) {
      setFormData({
        titleStore: '',
        businessEmail: '',
        businessNumber: '',
        governmentIdType: '',
        description: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-6">Become a Seller</h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Store Name */}
          <div>
            <label htmlFor="titleStore" className="block text-sm text-gray-300 mb-1">Store / Company Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="titleStore"
                required
                value={formData.titleStore}
                onChange={(e) => setFormData({ ...formData, titleStore: e.target.value })}
                placeholder="e.g., Juan's Hardware"
                className="pl-10 py-2 w-full rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Business Email */}
          <div>
            <label htmlFor="businessEmail" className="block text-sm text-gray-300 mb-1">Business Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="businessEmail"
                required
                value={formData.businessEmail}
                onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                placeholder="store@example.com"
                className="pl-10 py-2 w-full rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Business Number */}
          <div>
            <label htmlFor="businessNumber" className="block text-sm text-gray-300 mb-1">Business Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="businessNumber"
                required
                value={formData.businessNumber}
                onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
                placeholder="+63 912 345 6789"
                className="pl-10 py-2 w-full rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Government ID Type */}
          <div>
            <label htmlFor="governmentIdType" className="block text-sm text-gray-300 mb-1">Government ID Type</label>
            <div className="relative">
              <BadgeCheck className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <select
                id="governmentIdType"
                required
                value={formData.governmentIdType}
                onChange={(e) => setFormData({ ...formData, governmentIdType: e.target.value })}
                className="pl-10 py-2 w-full rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Select ID</option>
                {govermentId.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Business Description */}
          <div>
            <label htmlFor="description" className="block text-sm text-gray-300 mb-1">Business Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your business briefly..."
                className="pl-10 py-2 w-full h-28 resize-none rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 mr-2" />
                Register as Seller
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterSellerForm;
