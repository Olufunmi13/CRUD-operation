import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
      if(confirm){
        // Perform the DELETE request to remove the user data
    axios
    .delete(`http://localhost:8000/users/${id}`)
    .then((res) => {
      // To refresh page
      window.location.reload();
    })
    .catch((err) => console.log(err));
      }
    
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/users')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='flex flex-col items-center justify-center bg-blue-200 gap-5'>
      <h1 className='font-bold mt-3'>LIST OF USERS</h1>
      <div className='bg-white shadow-lg rounded-md w-4/5 m-auto text-center overflow-x-auto'>
        <button className='flex justify-start ml-4 mt-4 bg-green-400 rounded-md p-1'>
          <Link to='/create'>Add User</Link>
        </button>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='p-2'>ID</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Email</th>
                <th className='p-2'>Phone Number</th>
                <th className='p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td className='p-2'>{d.id}</td>
                  <td className='p-2'>{d.name}</td>
                  <td className='p-2'>{d.email}</td>
                  <td className='p-2'>{d.phoneNumber}</td>
                  <td className='p-2 flex'>
                    <button className='bg-green-300 p-1 rounded'><Link to={`/read/${d.id}`}>Read</Link></button>
                    <button className='bg-blue-500 gap-1 p-1 rounded ml-1 mr-1'><Link to={`/update/${d.id}`}>Edit</Link></button>
                    <button className='bg-red-400 gap-1 rounded p-1' onClick={e => handleDelete(d.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
