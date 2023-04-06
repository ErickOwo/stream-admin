import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { mailer } from "@api/index";
import QRCode from 'qrcode.react';

import Select from "react-select";
import endPoinst from "@api/index";

import axios from "axios";


const ModalResponse = ({ active, closeModal, user, platforms, id, order }) => {
  const formRef = useRef(null);
  const [platformsInput, setPlatformsInput] = useState(0);
  const [message, setMessage] = useState(null)

  const [qrCode, setQRCode] = useState(null);

  // const getQRCode = async () => {
  //   const {data} = await axios(endPoinst.orders.api + 'qrcode')
  //   setQRCode(data);
  // }


  const options = platforms?.map(platform => {
    return {
      value: platform._id,
      label: platform.title
    }
  })


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

  const handleChange = e => {
    setPlatformsInput(e)
  }

  const rejectOrder = async () => {
    try {
      if(!confirm('Are you sure that you want to reject the order?')) return;
      const response = await axios.patch(endPoinst.orders.api + `/${id}`);
      setMessage({type: "success", text: response.data})
      setTimeout(()=> {
        closeModal();
        setMessage(null);
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    
    if(!platformsInput || platformsInput?.length == 0) {
      setMessage({text: 'Add a Platform to the costumer', type: "error"})
      return
    }

    const platforms = platformsInput.map(platform => platform.value);
    
    const data = {
      platforms,
      user: user, 
      order: `${id}`,
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate')
    }

    try {
      const res = await axios.put(endPoinst.orders.api, data)  
      setMessage({text: res.data.message, type: 'success'})
    } catch (error) {
      setMessage({type: 'error', text: 'Fallo en la API'})
    }
    // try {
    //    await getQRCode();
    //    setMessage({ type: 'success', text: 'Sent message' })
    // } catch (error) {
    //   console.log(error)
    //   setMessage({type: 'error', text: 'Error sending message'})
    // } finally {
    //   setTimeout(()=>{
    //     setQRCode(null);
    //     setMessage(null);
    //   }, 5000)
    // }

    // else {
    //   if(true) postData(mailer.api, {subject, message}).then(res => alert(res));
    // }
  }

    return (
    <motion.div
      className="h-screen w-full flex justify-center items-start pt-10 bg-black/40 fixed top-0 left-0"
      initial={{ opacity: 0.5 }}
      variants={variantsOverlay}
      animate={active ? 'show' : 'hidde'}>
        <motion.div
          initial={{ scale: 0.7 }}
          variants={variantsModal}
          animate={active ? 'show' : 'hidde'}
          className={ `bg-white w-full max-w-[1100px] border-2 p-4 border-blue-700` }
            >
            <div className="mb-3">
              <h3
                className={ `border-b p-2 font-semibold text-2xl
                ${true ? 'border-blue-700' : 'border-green-600'}` }
                  >
                  Asign Platforms
              </h3>
              <p className="font-semibold">Order No. { order }</p>
            </div>
            <div>
              <p>
                Name: {user.name}
              </p>
              <p>
                Email: {user.email}
              </p>
              <p>
                Phone: {user.phone}
              </p>
            </div>
            <form
              ref={ formRef }
              onSubmit={ handleSubmit }
              className={ `border p-2 mt-2 flex flex-col
              ${true ? 'border-blue-700' : 'border-green-600'}` }
                >
                <div className="flex gap-2">
                  <label className="text-lg font-semibold tracking-wider " htmlFor="platforms">
                    Platforms
                  </label>
                  <Select
                    id="platforms"
                    name="platforms"
                    isMulti
                    options={options}
                    className={ ` border w-full
                    ${true ? 'border-blue-700' : 'border-green-600'}` }
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col mt-2">
                  <div className="flex gap-2">
                    <label 
                      className="font-semibold text-lg "
                      htmlFor="startDate" >
                        Initialization Date:
                    </label>
                    <input type='date' id="startDate" name="startDate"></input>    
                  </div>
                  <div className="flex gap-2">
                    <label 
                      className="font-semibold text-lg "
                      htmlFor="endDate"  >
                        Finalization Date:
                    </label>
                    <input type='date' id="endDate" name="endDate"></input> 
                  </div>
                </div>
                  {
                    message ? <div className={`h-8 mt-2 ${message.type == 'success' ? 'text-green-600' : 'text-red-600'}`}> { message.text } </div> : <div className="h-8 mt-2"></div>
                  }
                <div className="flex justify-end items-end gap-2">
                  <button
                    onClick={()=> {
                      rejectOrder()
                    }}
                    type="button"
                    className="bg-orange-600 mr-auto min-w-[80px] text-white my-2 py-1 px-3"
                     >
                      Reject
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 min-w-[80px] text-white my-2 py-1 px-3"
                    onClick={() => closeModal()} >
                      Cancel
                  </button>
                  <button
                    className="bg-blue-600 min-w-[80px] text-white my-2 py-1 px-3" >
                      Send
                  </button>
                </div>
                {
                    qrCode ?
                    <div className="min-h-screen w-full fixed flex justify-center items-center bg-black/50 top-0 left-0">
                      <div className="bg-white">
                        <QRCode className="m-10" value={qrCode} />
                      </div>
                    </div> : null
                }
          </form>
        </motion.div>
    </motion.div>
  )
}

export default ModalResponse