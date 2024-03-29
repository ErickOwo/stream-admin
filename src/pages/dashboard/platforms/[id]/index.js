import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { getObject, putObject, deleteObject } from '@api/requests';
import endPoints from '@api/index';
import Link from 'next/link';
import ModalCustomer from '@components/Modal-Customer';

const ModifyPlace = () => {
  const [platform, setPlatform] = useState(null);
  const [customers, setCustomers] = useState(null);

  const [modal, setModal] = useState(false);
  const [modalVariable, setModalVariable] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const setItem = async () => {
      const item = await getObject(`${endPoints.platforms.api}/${id}`);
      setPlatform(item.platform);
      setCustomers(item.customers);
    };
    setItem(platform);
  }, []);

  const closeModal = () => {
    setModalVariable(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };
  const openModal = () => {
    setModalVariable(true);
    setModal(true);
  };

  const handleRemove = (id) => {
    if (confirm('Are you sure to remove the customer from this platform?'))
      deleteObject(endPoints.platforms.profiles + '/' + id).then((res) => {
        alert(res);
      });
  };

  const [fieldChanged, setFieldChanged] = useState(false);
  const [profileToChange, setProfiletoChange] = useState(null);
  const [message, setMessage] = useState(null);
  const formRef = useRef(null);

  const displayAddAlias = (id) => {
    const profile = customers.find((d) => d._id == id);
    setProfiletoChange({
      alias: profile.alias,
      customer: profile.customerId.name,
      id: profile._id,
    });
    setFieldChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    formData.append('id', profileToChange.id);
    putObject(endPoints.platforms.alias, formData)
      .then((res) => {
        setMessage(res);
        setTimeout(() => {
          setMessage(null);
          setFieldChanged(false);
        }, 1300);
      })
      .catch((e) => {
        setProfiletoChange(e);
      });
  };

  return (
    <div className="container flex justify-center max-w-none md:p-6 p-2">
      <div className="w-full max-w-[800px] md:px-10 px-4 pt-9 pb-14 bg-sky-900 flex flex-col justify-center ">
        <h4 className="text-2xl text-white mb-5 border-b border-sky-200 pb-1">Plataform details</h4>
        <div className="h-[110px]">
          <h3 className="text-xl text-rose-50">
            <span className="font-semibold">Title: </span>
            {platform?.title}
          </h3>
          {
            platform?.spotify ? <>
              <p className="text-xl text-rose-50">
                <span className="font-semibold">Link: </span>
                <a className='break-all' href={platform?.password} target="_blank">
                  {platform?.password}
                </a>
              </p>
            </> : <>
              <p className="text-xl text-rose-50">
                <span className="font-semibold">Email: </span>
                {platform?.email}
              </p>
              <p className="text-xl text-rose-50">
                <span className="font-semibold">Password: </span>
                {platform?.password}
              </p>
            </>
          }
        </div>
        <div className="flex flex-col gap-2 text-white">
          <div className="text-xl font-semibold">Customers:</div>
          {customers?.map((customer, index) => (
            <div className="flex flex-col gap-2 md:gap-0 md:flex-row bg-blue-900 p-2 border border-black" key={index}>
              <div className="mr-auto">
                <div className="flex flex-col " key={index}>
                  <div className="flex gap-2 flex-wrap">
                    <h4 className="font-semibold">Customer:</h4>
                    <p>{customer?.customerId?.name}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <h4 className="font-semibold">Alias:</h4>
                    <p className={`font-semibold ${customer?.alias ? 'text-green-400' : 'text-amber-300'}`}>{customer?.alias ? customer?.alias : 'Empty'}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <h4 className="font-semibold">Email:</h4>
                    <p>{customer?.customerId?.email}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <h4 className="font-semibold">Phone:</h4>
                    <p>{customer?.customerId?.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <a 
                  className="bg-white text-black p-2 w-[75px] "
                  href={`/dashboard/users/${customer?.customerId?._id}`}
                  target='_blank' >
                  Details
                </a>
                <button className="bg-white text-black p-2 w-[70px]" onClick={() => displayAddAlias(customer?._id)}>
                  Edit
                </button>
                <button className="bg-white text-black p-2 w-[70px]" onClick={() => handleRemove(customer?._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          {/* {((platform?.type == 0 || platform?.type == 4) && customers?.length < 7) ||
          ((platform?.type == 2 || platform?.type == 3 || platform?.type == 5) && customers?.length < 6) ||
          ((platform?.type != 2 || platform?.type != 3 || platform?.type != 0 || platform?.type != 4 || platform?.type != 5) && customers?.length < 5) */} {true ? ( 
            <div className="p-2 bg-black  text-white">
              <button className="bg-slate-500 p-2" onClick={() => openModal()}>
                Add Customer
              </button>
            </div>
          ) : null}
        </div>
        <div className="options h-10 mt-6">
          <Link href="/dashboard/platforms">
            <button className="mt-4 mr-3 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white">Volver</button>
          </Link>
          <Link href={`/dashboard/platforms/${platform?._id}/modify`}>
            <button className="mt-4 mr-3 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white">Editar</button>
          </Link>
          <button
            onClick={() => {
              if (confirm('Are you sure that you want to delete this platform?')) deleteObject(`${endPoints.platforms.api}/${id}`).then((res) => router.push('/dashboard/platforms'));
            }}
            className="mt-4 mr-3 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white"
          >
            Eliminar
          </button>
        </div>
      </div>
      {fieldChanged ? (
        <div className="fixed left-0 top-0 z-40 flex justify-center items-center w-full min-h-screen  bg-black/30">
          <form className="bg-white md:w-[480px] px-5 py-2 md:py-4 md:-mt-8  flex flex-col items-start " onSubmit={handleSubmit} ref={formRef}>
            <h3 className="text-lg font-semibold mb-4">{profileToChange.customer}</h3>

            <input
              className="border border-black my-2 px-2  mx-auto md:max-w-[350px] md:mb-8 w-full"
              name="alias"
              placeholder="Asignale un alias"
              defaultValue={profileToChange?.alias ? profileToChange?.alias : ''}
            />
            <div className="flex flex-col md:flex-row md:justify-around w-full mt-5 md:mt-0 md:px-8">
              <button
                className="bg-slate-300/60 hover:bg-slate-300/80 md:py-1 py-2 px-2 mt-2 w-full md:w-fit
                "
                type="submit"
              >
                Guardar
              </button>
              <button
                className="bg-slate-300/60 hover:bg-slate-300/80 md:py-1 py-2 px-2 mt-2 w-full md:w-fit
                "
                onClick={() => setFieldChanged(false)}
              >
                Cancelar
              </button>
            </div>
            <div className="md:h-8 h-12 mb-2">{message ? <p className={`${message.type == 'success' ? 'text-green-700' : 'text-red-700'}`}>{message.text}</p> : null}</div>
          </form>
        </div>
      ) : null}
      {modalVariable ? <ModalCustomer modal={modal} closeModal={closeModal} /> : null}
    </div>
  );
};

export default ModifyPlace;
