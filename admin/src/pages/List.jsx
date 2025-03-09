import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Remove Products From List
  const removeProduct = async (id) => {
    // Show confirmation toast
    toast.info(
      <div>
        <p>Are you sure you want to delete this item?</p>
        <div className="flex gap-2 mt-2">
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={async () => {
              try {
                const response = await axios.post(
                  backendUrl + '/api/product/remove',
                  { id },
                  { headers: { token } }
                );
                if (response.data.success) {
                  toast.success(response.data.message);
                  await fetchList();
                } else {
                  toast.error(response.data.message);
                }
              } catch (error) {
                console.log(error);
                toast.error(error.message);
              }
            }}
          >
            Delete
          </button>
          <button
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Don't auto-close the confirmation toast
        closeButton: false,
      }
    );
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Products List</h1>
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="grid grid-cols-[150px_2fr_1fr_1fr_100px] items-center bg-gray-100 py-3 px-4 rounded-t-lg text-sm font-semibold text-gray-700">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[150px_2fr_1fr_1fr_100px] items-center py-3 px-4 border-b text-sm text-gray-600"
          >
            {/* Product Image */}
            <img
              className="w-28 h-32 object-cover rounded-lg"
              src={item.image[0]}
              alt={item.name}
            />

            {/* Product Name */}
            <p className="font-medium">{item.name}</p>

            {/* Product Category */}
            <p>{item.category}</p>

            {/* Product Price */}
            <p>
              {currency}
              {item.price}
            </p>

            {/* Remove Button with Rotating Animation */}
            <div className="flex justify-center">
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 hover:text-red-700 transition-transform duration-300 hover:rotate-90 text-lg"
              >
                &#10005;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;