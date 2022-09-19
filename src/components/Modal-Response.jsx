import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { postData } from "@api/requests"

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

  const getQRCode = async () => {
    const {data} = await axios(endPoinst.orders.api + 'qrcode')
    setQRCode(data);
  }

  const options = platforms.map(platform => {
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
  
  const handleSubmit = async e => {
    e.preventDefault();

    if(!platformsInput || platformsInput?.length == 0) return alert('Fields empty');
    
    const platforms = platformsInput.map(platform => platform.value);
    
    const data = {
      platforms,
      user: user, 
      order: `${id}`,
    }

    const res = await axios.put(endPoinst.orders.api, data)

    console.log(res.data)
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
      className="h-screen w-full flex justify-center items-center bg-black/40 fixed top-0 left-0"
      initial={{ opacity: 0.5 }}
      variants={variantsOverlay}
      animate={active ? 'show' : 'hidde'}>
        <motion.div
          initial={{ scale: 0.7 }}
          variants={variantsModal}
          animate={active ? 'show' : 'hidde'}
          className={ `bg-white w-full max-w-[1100px] border-2 p-4 border-red-700` }
            >
            <div className="mb-3">
              <h3
                className={ `border-b p-2 font-semibold text-2xl
                ${true ? 'border-red-700' : 'border-green-600'}` }
                  >
                  Asignar Plataformas
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
              ${true ? 'border-red-700' : 'border-green-600'}` }
                >
                <div className="flex gap-2">
                  <label className="" htmlFor="platforms">
                    Plataformas
                  </label>
                  <Select
                    id="platforms"
                    name="platforms"
                    isMulti
                    options={options}
                    className={ `border w-full
                    ${true ? 'border-red-700' : 'border-green-600'}` }
                    onChange={handleChange} />
                </div>
                <div className="flex justify-end items-end gap-2">
                  {
                    message ? <div className={`mr-auto ${message.type == 'error' ? 'text-green-600' : 'text-red-600'}`}> { message.text } </div> : null
                  }
                  <button
                    type="button"
                    className="bg-red-600 min-w-[80px] text-white my-2 py-1 px-3"
                    onClick={closeModal} >
                    Cancelar
                  </button>
                  <button
                    className="bg-blue-600 min-w-[80px] text-white my-2 py-1 px-3" >
                    Enviar
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