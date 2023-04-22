import { useEffect, useState, useRef } from 'react';
import endPoints from '@api/index';
import { getData, patchMultimedia } from '@api/requests';
import Image from 'next/image';
import axios from 'axios';
import { motion } from 'framer-motion';

import Order from '@components/Order';
import Link from 'next/link';
import AddOrderModal from '@components/Add-Order-Modal';

const OrdersAccepted = () => {
  const [data, setData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [message, setMessage] = useState(null);
  const [imgAdded, setImageAdded] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalAnimationAdd, setModalAnimationAdd] = useState(false);
  const [platforms, setPlatforms] = useState(null);

  const formRef = useRef(null);

  // const handleDelete = async (id) => {
  //   if (!confirm('Do you want to DELETE the order?')) return;
  //   const { data } = await axios.delete(`${endPoinst.orders.api}/${id}`);

  //   alert(data);
  // };

  useEffect(() => {
    const ejecuteFunction = async () => {
      const data = await getData(endPoints.orders.api + '/accepted');
      const orders = [];
      for (let order of data) {
        const { data } = await axios(`${endPoints.orders.api}/user/${order.userCustomer}`);
        orders.push({ user: data.user, ...order });
      }
      const getPlatforms = async () => {
        const platformsDB = await getData(`${endPoints.platforms.api}/asign`);
        const platformsNotFilled = platformsDB.filter((platform) => {
          if (
            ((platform.type == 0 || platform.type == 4) && platform.profiles.length < 7) ||
            ((platform.type == 2 || platform.type == 3) && platform.profiles.length < 6) ||
            ((platform.type != 0 || platform.type != 2 || platform.type != 3 || platform.type != 4) && platform.profiles.length < 5)
          )
            return platform;
        });
        setPlatforms(platformsNotFilled);
      };
      orders.sort((a, b) => {
        const dateA = new Date(a.endDate);
        const dateB = new Date(b.endDate);
        return dateA.getTime() - dateB.getTime();
      });
      setData(orders);
      getPlatforms();
    };
    ejecuteFunction();
  }, []);

  const openModalEdit = async (idOrder) => {
    const { data } = await axios(`${endPoints.orders.api}/${idOrder}`);
    setOrderData(data);
    setModal(true);
    setModalAnimation(true);
  };

  const handleImg = (e) => {
    if (e.target.value == '') setImageAdded(false);
    else setImageAdded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    if (formData.get('media').size == 0) {
      setMessage({ type: 'error', text: 'Please add the image of pay before press change data' });
      return;
    }

    patchMultimedia(endPoints.orders.api + `/update/${orderData.orderDB._id}`, formData)
      .then((res) => {
        setMessage({ text: 'Changes realized successfully', type: 'success' });

        setTimeout(() => {
          setMessage(null);
          setImageAdded(false);
          setModal(false);
        }, 1000);
      })
      .catch((e) => {
        if (e?.response?.data?.message) {
          setMessage({ text: e?.response?.data?.message, type: 'error' });
        } else setMessage({ text: 'Fallo en la API', type: 'error' });
      });
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

  return (
    <div className="min-h-screen w-fullflex flex-col">
      <AddOrderModal
        active={modalAdd}
        modalAnimation={modalAnimationAdd}
        message={message}
        setMessage={setMessage}
        platforms={platforms}
        setModal={setModalAdd}
        setAnimation={setModalAnimationAdd}
        imgAdded={imgAdded}
        setImageAdded={setImageAdded}
      />
      {modal ? (
        <motion.div
          className="fixed top-0 right-0 min-h-screen w-full bg-black/40 z-50 flex justify-center items-center"
          initial={{ opacity: 0.5 }}
          variants={variantsOverlay}
          animate={modalAnimation ? 'show' : 'hidde'}
        >
          <motion.div className="bg-white w-full md:w-[390px] p-2 flex flex-col" initial={{ scale: 0.7 }} variants={variantsModal} animate={modalAnimation ? 'show' : 'hidde'}>
            <div className="text-2xl mb-2 pb-2 border-b border-black flex flex-wrap">
              <h3 className="mr-2">Edit Order</h3>
              <p className="text-lg mt-auto">{orderData.orderDB.orderNumber}</p>
            </div>
            <div className="flex gap-2">
              <h4 className="font-semibold">Name:</h4>
              <p>{orderData.publicUser.name}</p>
            </div>
            <div className="flex gap-2">
              <h4 className="font-semibold">Email:</h4>
              <p>{orderData.publicUser.email}</p>
            </div>
            <div className="flex gap-2">
              <h4 className="font-semibold">Phone:</h4>
              <p>{orderData.publicUser.phone}</p>
            </div>
            <form className="flex flex-col mt-1 p-1 rounded-md border border-black gap-2" id="form" ref={formRef} onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <label htmlFor="startDate">Star Date:</label>
                <input required type="date" name="startDate" id="startDate"></input>
              </div>
              <div className="flex gap-2">
                <label htmlFor="startDate">End Date:</label>
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
            <div className="h-8">{message ? <p className={message.type == 'success' ? 'text-green-600' : message.type == 'info' ? 'text-blue-600' : 'text-red-600'}>{message.text}</p> : null}</div>
            <button
              type="submit"
              className="bg-blue-900 text-white mt-2 p-3"
              form="form"
              onClick={() => {
                setMessage({ text: 'Realizing changes', type: 'info' });
              }}
            >
              Change Data
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
        </motion.div>
      ) : null}
      <div className="flex justify-end w-full bg-black p-4">
        <Link href="/dashboard">
          <button className="mr-auto bg-white py-1 px-3 rounded-md">Volver</button>
        </Link>
        <button
          className="bg-white py-1 px-3 rounded-md"
          onClick={() => {
            setModalAdd(true);
            setModalAnimationAdd(true);
          }}
        >
          Add Order
        </button>
      </div>
      <div className="flex flex-col items-center gap-4 p-4">
        {data ? (
          <>
            {data?.map((order, index) => (
              <div className="bg-[#F1F1F1] p-4 md:my-6 rounded-lg w-full max-w-[600px] flex flex-col gap-1" key={index}>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap gap-3 justify-between">
                    <h3 className="font-semibold">No. de Orden</h3>
                    <p>{order.orderNumber}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Name:</p>
                    <p>{order.user.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Email:</p>
                    <p>{order.user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Phone:</p>
                    <p>{order.user.phone}</p>
                  </div>
                </div>
                <div className="grid gap-2 grid-cols-4 md:grid-cols-7 items-end">
                  <h3 className="font-semibold">Cuentas</h3>
                  <h4 className="font-semibold">Cantidad</h4>
                  <h4 className="font-semibold hidden md:flex">Precio</h4>
                  <h4 className="font-semibold">Meses</h4>
                  <h4 className="font-semibold hidden md:flex">SubTotal</h4>
                  <h4 className="font-semibold hidden md:flex">Descuento</h4>
                  <h4 className="font-semibold">Total</h4>
                  <Order title="Disney+:" quantity={order.disneyProfiles} months={order.months} price={25} />
                  <Order title="HBO MAX:" quantity={order.hboProfiles} months={order.months} price={25} />
                  <Order title="Prime Video:" quantity={order.primeProfiles} months={order.months} price={25} />
                  <Order title="Paramount+:" quantity={order.paramountProfiles} months={order.months} price={25} />
                  <Order title="Star+:" quantity={order.starProfiles} months={order.months} price={25} />
                  <Order title="Netflix:" quantity={order.netflixProfiles} months={order.months} price={40} />
                </div>
                {order.bank == 'Bantrab' ? (
                  <div>
                    <h3 className="text-pink-700 text-xl font-bold">Cuenta Monetaria Bantrab</h3>
                    <p className="text-lg">No. 2860216878</p>
                    <p className="flex flex-wrap md:gap-2">
                      A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
                    </p>
                  </div>
                ) : order.bank == 'BI' ? (
                  <div>
                    <h3 className="text-blue-700 text-xl font-bold">Cuenta de Ahorro BI</h3>
                    <p className="text-lg">No. 0770692</p>
                    <p className="flex flex-wrap md:gap-2">
                      A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-green-800 text-xl font-bold">Cuenta de Ahorro Banrural</h3>
                    <p className="text-lg">No. 4314151198</p>
                    <p className="flex flex-wrap md:gap-2">
                      A nombre de: <span className="font-semibold">Erick Antonio Rodriguez Son</span>
                    </p>
                  </div>
                )}
                {order.total ? (
                  <div className="flex justify-between pr-2 text-xl font-semibold">
                    <h4>Total:</h4>
                    <p className="font-sans text-gray-800 tracking-wider">Q. {order.total}.00</p>
                  </div>
                ) : null}
                <div className="flex justify-between pr-2 text-xl font-semibold">
                  <h4>Estado:</h4>
                  <p className={`font-sans text-gray-800 tracking-wider ${order.pending ? 'text-yellow-700' : order.accepted ? 'text-green-700' : 'text-red-700'}`}>
                    {order.pending ? 'Pending' : order.accepted ? 'Accepted' : 'Rejected'}
                  </p>
                </div>
                {order.startDate ? (
                  <div className="flex flex-wrap text-xl">
                    <h3 className="font-semibold mr-2">Start Date:</h3>
                    {order.startDate.substring(0, 10)}
                  </div>
                ) : null}
                {order.endDate ? (
                  <div className="flex flex-wrap text-xl">
                    <h3 className="font-semibold mr-2">End Date:</h3>
                    {order.endDate.substring(0, 10)}
                  </div>
                ) : null}
                <div className="flex flex-col">
                  <h4 className="text-xl font-semibold">Pago:</h4>
                  <div className="flex justify-center h-[420px] w-full">
                    <Image src={order.imgURL} width="400%" height="100%" />
                  </div>
                </div>
                <button
                  className="bg-blue-600 text-white p-2 rounded-lg"
                  onClick={() => {
                    openModalEdit(order._id);
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default OrdersAccepted;
