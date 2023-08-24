import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Update() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${id}`)
      .then((res) => {
        const userData = res.data;
        setFormData({
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the specific error message when the field is changed
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    const errors = {};

    if (formData.name.trim().length === 0 || !formData.name.match(/^[A-Za-z]+( [A-Za-z]+)*$/)) {
      errors.name = 'Name must contain only alphabets';
    }

    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    if (formData.email.trim().length === 0 || !formData.email.match(emailRegex)) {
      errors.email = 'Invalid email address';
    }

    if (formData.phoneNumber.trim().length === 0 || !formData.phoneNumber.match(/^[0-9]+$/)) {
      errors.phoneNumber = 'Phone number must contain only numbers';
    }

    if (Object.keys(errors).length === 0) {
      // Perform the PUT request to update the user data
      axios
        .put(`http://localhost:8000/users/${id}`, formData)
        .then(() => navigate('/'))
        .catch((err) => console.log(err));
    } else {
      // Display form validation errors
      setFormErrors(errors);
    }
  };


  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl mb-4">Update Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-2 border rounded-md"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2 border rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              className="w-full p-2 border rounded-md"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {formErrors.phoneNumber && (
              <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>
         )}
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
             Update
          </button>
          <Link to="/" className="text-blue-500 py-2 px-4">
              Cancel
          </Link>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Update;

