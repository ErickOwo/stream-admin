import { addObject, putObject } from '@api/requests';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import endPoinst from '@api/index';

const Form = ({ formData, formNewMovie = true, }) => {
  const formRef = useRef(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const  handleSubmit = e =>{
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      title: formData.get('title'),
      email: formData.get('email'),
      password: formData.get('password'),
    }
    if(formNewMovie) {
      addObject(endPoinst.platforms.api, data).then(res =>{
        router.push("/dashboard");
      }).catch(e=>{
        setError(Object.entries(e.response.data.error.errors)[0][1].message)
      });
    } else {
      putObject(`${endPoinst.platforms.api}/${id}`, data).then(res =>{
        router.push("/dashboard");
      }).catch(e=>{
        setError(Object.entries(e.response.data.error.errors)[0][1].message)
      });
    }
  }

  return (
    <form ref={formRef} className='md:w-4/6 w-11/12 pt-9 pb-16 px-4 bg-gray-900 m-auto flex flex-col items-center'>
      <label 
        className='text-white text-lg font-bold mb-3 max-w-[370px] w-5/6' 
        htmlFor='title'  >Type Title</label>
      <input 
        defaultValue={formData?.title} 
        id="title" 
        name="title" 
        autoComplete="off" 
        required className='max-w-[370px] w-5/6 p-1 outline-slate-600' 
        placeholder="Title"  />
      <label 
        className='text-white text-lg font-bold mb-3 max-w-[370px] w-5/6' 
        htmlFor='email'  >Type Email</label>
      <input 
        defaultValue={formData?.email} 
        id="email" 
        name="email" 
        autoComplete="off" 
        required className='max-w-[370px] w-5/6 p-1 outline-slate-600' 
        placeholder="Email"  />  
      <label 
        className='text-white text-lg font-bold mb-3 mt-2 max-w-[370px] w-5/6' 
        htmlFor='password'>Type Password</label>  
      <input 
        defaultValue={formData?.password} 
        id="password" 
        name='password' 
        className='max-w-[370px] w-5/6 p-1 outline-slate-600'  
        placeholder='Password' 
        autoComplete='off' />
      { error ? <span 
        className='h-6 text-red-600 text-lg mt-3 max-w-[370px] w-5/6'>{ error }</span> : <span 
        className='h-6 mt-3'></span>}
      <button type='submit' onClick={handleSubmit} 
        className='bg-slate-600 hover:bg-slate-500 text-white font-bold text-2xl mt-6 w-4/6 max-w-[230px] pt-2 pb-3'>{formNewMovie ? 'Agregar' : 'Editar'}</button>
    </form>
  )
}

export default Form