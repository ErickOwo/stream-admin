import { useRef } from 'react'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { addObject } from '@api/requests'
import endPoinst from '@api/index';

const ModalCustomer = ({modal}) => {
  const formRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;

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

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone')
    }
    
    addObject(endPoinst.platforms.customer + '/' + id, data).then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e)
    })
    
  }

  return (
    <motion.div 
            className='fixed top-0 left-0 w-full min-h-screen bg-black/20 flex overflow-auto justify-center items-center '
            initial={{ opacity: 0.5 }}
            variants={variantsOverlay}
            animate={modal ? 'show' : 'hidde'}  >
            <motion.form 
              ref={formRef}
              onSubmit={handleSubmit}
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
              <button 
                type='submit'
                className='bg-stone-500 text-white' >
                Add
              </button>
            </motion.form>
          </motion.div>
  )
}

export default ModalCustomer