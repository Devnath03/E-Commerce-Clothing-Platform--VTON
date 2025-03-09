// import React, { useContext, useState } from 'react';
// import { motion } from 'framer-motion'; // Import motion
// import Title from '../components/Title';
// import CartTotal from '../components/CartTotal';
// import { assets } from '../assets/assets';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const PlaceOrder = () => {
//   const [method, setMethod] = useState('cod');
//   const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: ''
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setFormData(data => ({...data, [name]: value}));
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       let orderItems = [];

//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             const itemInfo = structuredClone(products.find(product => product._id === items));
//             if (itemInfo) {
//               itemInfo.size = item;
//               itemInfo.quantity = cartItems[items][item];
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee
//       };

//       switch (method) {
//         // API Call for COD
//         case 'cod': 
//           const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}});
//           if (response.data.success) {
//             setCartItems({});
//             navigate('/orders');
//           } else {
//             toast.error(response.data.message);
//           }
//           break;
        
//         case 'stripe': 
//           const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: {token}});
//           if (responseStripe.data.success) {
//             const {session_url} = responseStripe.data
//             window.location.replace(session_url)
//           } else {
//             toast.error(responseStripe.data.message);
//           }
//           break;
        
//         default:
//           break;
//       }

//       console.log(orderItems);

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <motion.div
//       className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'
//       initial={{ opacity: 0, y: 20 }} // Initial state for appearance
//       animate={{ opacity: 1, y: 0 }} // Animate to this state
//       exit={{ opacity: 0, y: 20 }} // Exit animation
//       transition={{ duration: 0.5 }} // Transition duration for smooth appearance and closing
//     >
//       {/* Left Side - Delivery Information Form */}
//       <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
//         <div className='text-xl sm:text-2xl my-3'>
//           <Title text1={'DELIVERY'} text2={'INFORMATION'} />
//         </div>
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
//           <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
//         </div>
//         <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
//         <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
//           <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
//         </div>
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
//           <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
//         </div>
//         <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />

//         {/* Submit Button */}
//         <div className='w-full text-end mt-8'>
//           <motion.button
//             type='submit'
//             className='bg-black text-white px-16 py-3 text-sm'
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 300, damping: 10 }}
//           >
//             PLACE ORDER
//           </motion.button>
//         </div>
//       </form>

//       {/* Right Side - Cart Total and Payment Method */}
//       <div className='mt-8 sm:mt-0'>
//         <div className='min-w-80'>
//           <CartTotal />
//         </div>

//         {/* Payment Method Section */}
//         <div className='mt-8'>
//           <Title text1={'PAYMENT'} text2={'METHOD'} />
//           <div className='flex gap-3 flex-col lg:flex-row'>

//             {/* Stripe Payment Method */}
//             <motion.div
//               onClick={() => setMethod('stripe')}
//               className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 300, damping: 10 }}
//             >
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
//             </motion.div>

//             {/* Razorpay Payment Method */}
//             <motion.div
//               onClick={() => setMethod('razorpay')}
//               className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 300, damping: 10 }}
//             >
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
//             </motion.div>

//             {/* Cash On Delivery Payment Method */}
//             <motion.div
//               onClick={() => setMethod('cod')}
//               className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 300, damping: 10 }}
//             >
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//               <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default PlaceOrder;



 import React, { useContext, useState } from 'react';
 import { motion } from 'framer-motion'; // Import motion
 import Title from '../components/Title';
 import CartTotal from '../components/CartTotal';
 import { assets } from '../assets/assets';
 import { ShopContext } from '../context/ShopContext';
 import axios from 'axios';
 import { toast } from 'react-toastify';

 const PlaceOrder = () => {
   const [method, setMethod] = useState('cod');
   const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
   const [formData, setFormData] = useState({
     firstName: '',
     lastName: '',
     email: '',
     street: '',
     city: '',
     state: '',
     zipcode: '',
     country: '',
     phone: ''
   });

   const onChangeHandler = (event) => {
     const name = event.target.name;
     const value = event.target.value;
     setFormData(data => ({...data, [name]: value}));
   };

   const onSubmitHandler = async (event) => {
     event.preventDefault();
     try {
       let orderItems = [];

       for (const items in cartItems) {
         for (const item in cartItems[items]) {
           if (cartItems[items][item] > 0) {
             const itemInfo = structuredClone(products.find(product => product._id === items));
             if (itemInfo) {
              itemInfo.size = item;
               itemInfo.quantity = cartItems[items][item];
               orderItems.push(itemInfo);
             }
           }
         }
       }

       let orderData = {
         address: formData,
         items: orderItems,
         amount: getCartAmount() + delivery_fee
       };

       switch (method) {
         // API Call for COD
         case 'cod': 
           const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}});
           if (response.data.success) {
             setCartItems({});
             navigate('/orders');
           } else {
             toast.error(response.data.message);
           }
           break;
        
           case 'stripe': {
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
            console.log("Stripe Response:", responseStripe.data); // Log the response
          
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              console.log("Session URL:", session_url); // Log the session URL
              window.location.href = session_url; // Use href instead of replace
            } else {
              toast.error(responseStripe.data.message);
            }
            break;
          }
         
         default:
           break;
       }

      console.log(orderItems);

     } catch (error) {
       console.log(error);
       toast.error(error.message);
     }
   };

   return (
     <motion.div
       className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'
       initial={{ opacity: 0, y: 20 }} // Initial state for appearance
       animate={{ opacity: 1, y: 0 }} // Animate to this state
       exit={{ acity: 0, y: 20 }} // Exit animation
       transition={{ duration: 0.5 }} // Transition duration for smooth appearance and closing
     >
       <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
         <div className='text-xl sm:text-2xl my-3'>
           <Title text1={'DELIVERY'} text2={'INFORMATION'} />
         </div>
         <div className='flex gap-3'>
           <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
           <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
         </div>
         <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
         <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
         <div className='flex gap-3'>
           <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
           <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
         </div>
         <div className='flex gap-3'>
           <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
           <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
         </div>
         <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />





         {/*---------------Payment Method Selection-------------- */}
         <div className='mt-12'>
           <Title text1={'PAYMENT'} text2={'METHOD'} />
           <div className='flex gap-3 flex-col lg:flex-row'>

             {/* <motion.div
            onClick={() => setMethod('master')}
               className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
               whileTap={{ scale: 0.95 }}
               transition={{ type: "spring", stiffness: 300, damping: 10 }}
             >
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'master' ? 'bg-green-400' : ''}`}></p>
               <img className='h-5 mx-4' src={assets.master_logo} alt="" />
             </motion.div> */}

             {/* Stripe Payemnt Method */}
             <motion.div
               onClick={() => setMethod('stripe')}
               className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
               whileTap={{ scale: 0.95 }}
               transition={{ type: "spring", stiffness: 300, damping: 10 }}
             >
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
               <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
             </motion.div>

             {/* <motion.div
               onClick={() => setMethod('koko')}
               className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
               whileTap={{ scale: 0.95 }}
               transition={{ type: "spring", stiffness: 300, damping: 10 }}
             >
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'koko/mint' ? 'bg-green-400' : ''}`}></p>
               <img className='h-5 mx-1' src={assets.koko_logo} alt="" />
             </motion.div> */}

            
             {/* Razorpay Payment method */}
             <motion.div
               onClick={() => setMethod('razorpay')}
               className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
               whileTap={{ scale: 0.95 }}
               transition={{ type: "spring", stiffness: 300, damping: 10 }}
             >
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
               <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
             </motion.div>

             {/* Cash On Delivery Payment Method */}
             <motion.div
               onClick={() => setMethod('cod')}
               className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
               whileTap={{ scale: 0.95 }}
               transition={{ type: "spring", stiffness: 300, damping: 10 }}
             >
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
               <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
             </motion.div>
           </div>
         </div>



         {/* Submit Button */}
         <div className='w-full text-end mt-8'>
           <motion.button
             type='submit'
             className='bg-black text-white px-16 py-3 text-sm'
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             transition={{ type: "spring", stiffness: 300, damping: 10 }}
           >
             PLACE ORDER
           </motion.button>
         </div>
       </form>

       {/*---------------Right Side--------------- */}
       <div className='mt-8'>
         <div className='mt-8 min-w-80'>
           <CartTotal />
         </div>
       </div>
     </motion.div>
   );
 };

 export default PlaceOrder;
