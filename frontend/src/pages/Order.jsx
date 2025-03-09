import React, { useContext, useEffect , useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Order = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([])

  // const loadOrderData  = async () => {
  //   try {
      
  //    if(!token){
  //      return null
  //    }
     
  //     const response = await axios.post(backendUrl + '/api/order/userorders', {},{headers:{token}})
      
  //     if(response.data.success){
  //       let allOrdersItem = []
  //       response.data.orders.map ((order) => {
  //         order.items.map((item) => {
  //           item ['status'] = order.status
  //           item ['payment'] = order.payment
  //           item ['paymentMethod'] = order.paymentMethod
  //           item ['date'] = order.date
  //           allOrdersItem.push(item)
  //         })

  //       })
  //       setOrderData(allOrdersItem.reverse())
  //     }

  //   } catch (error) {
      
  //   }
  // }

  const loadOrderData  = async () => {
  try {
    if (!token) {
      return;
    }
    
    const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });

    console.log("Order API Response:", response.data); // ✅ Debugging log

    if (response.data.success) {
      let allOrdersItem = []
      response.data.orders.forEach((order) => {  // Use forEach instead of map
        order.items.forEach((item) => {
          allOrdersItem.push({
            ...item, 
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date
          });
        });
      });

      setOrderData(allOrdersItem.reverse());
      console.log("Processed Order Data:", allOrdersItem); // ✅ Debugging log
    } else {
      console.error("Order fetch failed:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};


  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <motion.div
      className='border-t pt-16 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'
      initial={{ opacity: 0, scale: 0.95 }} // Initial state for appearance
      animate={{ opacity: 1, scale: 1 }} // Animate to this state
      exit={{ opacity: 0, scale: 0.95 }} // Exit animation
      transition={{ duration: 0.5 }} // Transition duration for smooth appearance and closing
    >
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <motion.div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            initial={{ opacity: 0, y: 20 }} // Initial state for each order item
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            exit={{ opacity: 0, y: 20 }} // Exit animation
            transition={{ duration: 0.3, delay: index * 0.1 }} // Delay for staggered effect
          >
            <div className='flex items-start gap-6 text-sm'>
              {/* <img className='w-16 sm:w-20' src={item.image[0]} alt="" /> */}
              <img className='w-16 sm:w-20' src={Array.isArray(item.image) ? item.image[0] : item.image} alt="" />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1'>Payment: <span className='text-gray-400'>{(item.paymentMethod)}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'> {item.status} </p>
              </div>
              <button  onClick={loadOrderData}className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-black hover:text-white'>
                Track Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Order;