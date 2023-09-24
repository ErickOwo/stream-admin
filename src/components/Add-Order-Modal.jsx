import { useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { postMultimedia } from '@api/requests'
import endPoints from '@api/index';
import Select from "react-select";

const AddOrderModal = ({active, modalAnimation, message, platforms, setMessage, setModal, imgAdded, setImageAdded}) => {
  const formRef = useRef(null)
  const [platformsInput, setPlatformsInput] = useState(0);

  const handleImg = (e) => {
    if (e.target.value == '') setImageAdded(false);
    else setImageAdded(true);
  };

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
        duration: 0.8,
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
    let disneyProfiles = 0
    let hboProfiles = 0
    let primeProfiles = 0
    let paramountProfiles = 0
    let starProfiles = 0
    let netflixProfiles = 0
    let spotifyProfiles = 0
    if(!platformsInput || platformsInput?.length == 0) {
      setMessage({text: 'Add a Platform to the costumer', type: "error"})
      return
    } else {
      platformsInput.map(platformValue =>{
        const valueFinded = platforms.find(platform => {
          return platform._id == platformValue.value
        })
        if(valueFinded.type == 0) disneyProfiles++;
        else if(valueFinded.type == 1) hboProfiles++;
        else if(valueFinded.type == 2) primeProfiles++;
        else if(valueFinded.type == 3) paramountProfiles++;
        else if(valueFinded.type == 4) starProfiles++;
        else if(valueFinded.type == 5) spotifyProfiles++;
        else netflixProfiles++;
      })
    }
    const data = {
      disneyProfiles,
      hboProfiles,
      primeProfiles,
      paramountProfiles,
      starProfiles,
      netflixProfiles,
      spotifyProfiles
    };
    if (formData.get('media').size == 0) {
      setMessage({ type: 'error', text: 'Please add the image of pay before press create' });
      return;
    }
    formData.append('data', JSON.stringify(data))
    postMultimedia(endPoints.orders.api + `/create`, formData)
    .then((res) => {
        setMessage(res);
        if(res.type != 'success') return
        setTimeout(() => {
          setMessage(null);
          setImageAdded(false)
          setModal(false)
        }, 1000);
      })
      .catch((e) => {
        if (e?.response?.data?.message) {
          setMessage({ text: e?.response?.data?.message, type: 'error' });
        } else setMessage({ text: 'Fallo en la API', type: 'error' });
      });
    }
    
    const handleChange = e => {
      setPlatformsInput(e)
  }

  const options = platforms?.map(platform => {
    return {
      value: platform._id,
      label: platform.title
    }
  })
  const optionsBank = [
    {
      value: 0,
      label: 'Banrural'
    },
    {
      value: 1,
      label: 'Bantrab'
    },
    {
      value: 2,
      label: 'BI'
    },
    {
      value: 3,
      label: 'BAC'
    },
    { value: 4, label: 'G&T Continental' },
    { value: 5, label: 'Promerica' },
    { value: 6, label: 'BAM' },
    { value: 7, label: 'MICOOPE' },
  ]
  
  return (   
    <>
      {
        active ? <motion.div
          className="fixed top-0 right-0 min-h-screen w-full bg-black/40 z-50 flex justify-center items-center"
          initial={{ opacity: 0.5 }}
          variants={variantsOverlay}
          animate={modalAnimation ? 'show' : 'hidde'}
        >
          <motion.div className="bg-white w-full md:w-[390px] p-2 flex flex-col max-h-[425px] overflow-auto" initial={{ scale: 0.7 }} variants={variantsModal} animate={modalAnimation ? 'show' : 'hidde'}>
            <div className="text-2xl mb-2 pb-2 border-b border-black flex flex-wrap">
              <h3 className="mr-2">Create Order</h3>
            </div>
            <form className="flex flex-col mt-1 p-1 rounded-md border border-black gap-2" id="form" ref={formRef} onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <label className="font-semibold w-[85px]">Name:</label>
                <input className='border border-black' name='name' id='name'></input>
              </div>
              <div className="flex gap-2">
                <label className="font-semibold w-[85px]">Email:</label>
                <input className='border border-black' name='email' id='email'></input>
              </div>
              <div className="flex gap-2">
                <label className="font-semibold w-[85px]">Phone:</label>
                <input className='border border-black' name='phone' id='phone'></input>
              </div>
              <div className='flex flex-col'>
                <div className='flex flex-col'>
                  <h3 className='font-semibold'>Platforms</h3>
                  <Select
                    id="platforms"
                    name="platforms"
                    isMulti
                    options={options}
                    className={ ` border w-full
                    ${true ? 'border-blue-700' : 'border-green-600'}` }
                    onChange={handleChange} />
                </div>
                <div className='flex flex-col'>
                  <h3 className='font-semibold'>Bank</h3>
                  <Select
                    id="bankCode"
                    name="bankCode"
                    options={optionsBank}
                    className={ ` border w-full
                    ${true ? 'border-blue-700' : 'border-green-600'}` }
                     />
                </div>
                <div className='flex mt-4 mb-2'>
                  <label className='font-semibold mr-2' htmlFor='months'>Months:</label>
                  <input className='px-3 border border-black w-[65px]' type='number' name='months' id='months'></input>
                </div>
                <div className='flex mt-4 mb-2'>
                  <label className='font-semibold mr-2' htmlFor='total'>Total:</label>
                  <input className='px-3 border border-black w-[95px]' type='number' step="any" name='total' id='total'></input>
                </div>
              </div>
              <div className="flex gap-2">
                <label className='font-semibold' htmlFor="startDate">Star Date:</label>
                <input required type="date" name="startDate" id="startDate"></input>
              </div>
              <div className="flex gap-2">
                <label className='font-semibold' htmlFor="startDate">End Date:</label>
                <input required type="date" name="endDate" id="endDate"></input>
              </div>
              <label
                htmlFor="media"
                className={`my-2 w-full h-[30px] ${
                  imgAdded ? 'bg-pink-800 hover:bg-pink-700' : 'bg-slate-800 hover:bg-slate-700'
                } rounded-lg flex justify-center items-center text-lg text-white cursor-pointer`}
              >
                Añadir Imagen
              </label>
              <input type="file" accept="image/*" name="media" id="media" className="hidden" onChange={handleImg}></input>
            </form>
            <div className="h-10 flex">{message ? <p className={message.type == 'success' ? 'text-green-600' : message.type == 'info' ? 'text-blue-600' : 'text-red-600'}>{message.text}</p> : null}</div>
            <button
              type="submit"
              className="bg-blue-900 text-white mt-2 p-3"
              form="form"
              onClick={() => {
                setMessage({ text: 'Realizing changes', type: 'info' });
              }}
            >
              Create
            </button>
            <button
              onClick={() => {
                setImageAdded(false);
                setModal(false);
              }}
              className="bg-red-900 text-white mt-2 p-3"
              form="form"
            >
              Close
            </button>
          </motion.div>
        </motion.div> : null
      }
    </>
  )
}

export default AddOrderModal