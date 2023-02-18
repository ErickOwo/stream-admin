import React from 'react'
import { motion } from 'framer-motion';

const ModalCustomer = ({modal}) => {
  
  const variantsOverlay = {
    show: {
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 1.3,
      },
    },
    hidde: {
      opacity: 0.5,
      transition: {
        ease: 'easeOut',
        duration: .8,
      },
    },
  };
  const variantsModal = {
    show: {
      scale: 1,
      transition: {
        ease: 'easeInOut',
        duration: 1,
      },
    },
    hidde: {
      scale: 0.7,
      transition: {
        ease: 'easeOut',
        duration: 0.7,
      },
    },
  };

  return (
    <motion.div 
            className='fixed top-0 left-0 w-full min-h-screen bg-black/20 flex overflow-auto justify-center items-center '
            initial={{ opacity: 0.5 }}
            variants={variantsOverlay}
            animate={modal ? 'show' : 'hidde'}  >
            <motion.form 
              className='p-4 bg-white flex flex-col gap-2'
              initial={{ scale: 0.7 }}
              variants={variantsModal}
              animate={modal ? 'show' : 'hidde'}  >
              <h4>
                Add Customer
              </h4>
              <div className='flex gap-2'>
                <label className='w-[95px]' htmlFor='name'>Name:</label>
                <input 
                  className='border border-black outline-none'
                  name='name' 
                  id='name' ></input>
              </div>
              <div className='flex gap-2' >
                <label className='w-[95px]' htmlFor='email'>Email:</label>
                <input 
                  className='border border-black outline-none'
                  name='email' 
                  id='email' ></input>
              </div>
              <div className='flex gap-2' >
                <label className='w-[95px]' htmlFor='phone'>Phone:</label>
                <input 
                  className='border border-black outline-none'
                  name='phone' 
                  id='phone' ></input>
              </div>
            </motion.form>
          </motion.div>
  )
}

export default ModalCustomer