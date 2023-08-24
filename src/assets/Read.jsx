import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl mb-4">User Details</h2>
        <div className='mb-2'>
          <strong>Name: {data.name}</strong>
        </div>
        <div className='mb-2'>
          <strong>Email: {data.email}</strong>
        </div>
        <div className='mb-2'>
          <strong>Phone Number: {data.phoneNumber}</strong>
        </div>
        <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
              <Link to={`/update/${id}`}>
              Edit
              </Link>
            </button>
            <Link to="/" className="text-blue-500 py-2 px-4">
              Back to Home
            </Link>
          </div>
      </div>
    </div>
  )
}

export default Read;