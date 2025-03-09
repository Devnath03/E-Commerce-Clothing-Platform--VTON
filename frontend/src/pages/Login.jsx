import React, { useContext, useState , useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion
import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
//import { use } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {token,setToken,navigate,backendUrl} = useContext(ShopContext);

  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    try{
     if(currentState === 'Sign Up'){
       const response = await axios.post(backendUrl + '/api/user/register',{name,email,password});
         if(response.data.success){
           setToken(response.data.token)
           localStorage.setItem('token',response.data.token)
            }else{
           toast.error(response.data.message)
         }
        }else{
          const response = await axios.post(backendUrl + '/api/user/login',{email,password});
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
        }else{
            toast.error(response.data.message)
        }
      }
  }    catch(error){
        console.log(error)
        toast.error(error.message)
    }
  
  };

  useEffect(()=>{
   if(token){
     navigate('/');
   }
  },[token]);

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      initial={{ opacity: 0, scale: 0.95 }} // Initial state for appearance
      animate={{ opacity: 1, scale: 1 }} // Animate to this state
      exit={{ opacity: 0, scale: 0.95 }} // Exit animation
      transition={{ duration: 0.5 }} // Transition duration for smooth appearance and closing
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <motion.p
          className='prata-regular text-3xl'
          initial={{ opacity: 0, y: -20 }} // Initial state for title
          animate={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ duration: 0.5 }} // Transition duration for smooth appearance
        >
          {currentState}
        </motion.p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : (
        <motion.input onChange={(e)=>setName(e.target.value)} value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
          initial={{ opacity: 0, y: 10 }} // Initial state for input
          animate={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ duration: 0.3 }} // Transition duration for smooth appearance
        />
      )}
      <motion.input onChange={(e)=>setEmail(e.target.value)} value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
        initial={{ opacity: 0, y: 10 }} // Initial state for input
        animate={{ opacity: 1, y: 0 }} // Animate to visible
        transition={{ duration: 0.3, delay: 0.1 }} // Delay for staggered effect
      />
      <motion.input onChange={(e)=>setPassword(e.target.value)} value={password}
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
        initial={{ opacity: 0, y: 10 }} // Initial state for input
        animate={{ opacity: 1, y: 0 }} // Animate to visible
        transition={{ duration: 0.3, delay: 0.2 }} // Delay for staggered effect
      />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        )}
      </div>
      <motion.button
        className='bg-black text-white font-light px-8 py-2 mt-4 border hover:bg-white hover:text-black hover:border-black'
        whileHover={{ scale: 1.05 }} // Scale up on hover
        whileTap={{ scale: 0.95 }} // Scale down on click
        transition={{ type: "spring", stiffness: 300, damping: 10 }} // Smooth spring transition
      >
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </motion.button>
    </motion.form>
  );
};

export default Login;