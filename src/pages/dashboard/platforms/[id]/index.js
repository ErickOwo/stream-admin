import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getObject, putObject, deleteObject } from '@api/requests';
import endPoinst from '@api/index';
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
      const item = await getObject(`${endPoinst.platforms.api}/${id}`);
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
      deleteObject(endPoinst.platforms.profiles + '/' + id).then((res) => {
        alert(res);
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
          <p className="text-xl text-rose-50">
            <span className="font-semibold">Email: </span>
            {platform?.email}
          </p>
          <p className="text-xl text-rose-50">
            <span className="font-semibold">Password: </span>
            {platform?.password}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-white">
          <div className="text-xl font-semibold">Customers:</div>
          {customers?.map((customer, index) => (
            <div className="flex flex-wrap bg-blue-900 p-2 border border-black" key={index}>
              <div className="mr-auto">
                <div className="flex flex-col " key={index}>
                  <div>{customer?.customerId?.name}</div>
                  <div>{customer?.customerId?.email}</div>
                  <div>{customer?.customerId?.phone}</div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button className="bg-white text-black p-2 w-[70px]">Edit</button>
                <button className="bg-white text-black p-2 w-[70px]" onClick={() => handleRemove(customer?._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          {((platform?.type == 0 || platform?.type == 4) && customers?.length < 7) ||
          ((platform?.type == 2 || platform?.type == 3) && customers?.length < 6) ||
          ((platform?.type != 2 || platform?.type != 3 || platform?.type != 0 || platform?.type != 4) && customers?.length < 5) ? (
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
              if (confirm('Está seguro que desea eliminar la plataforma')) putObject(`${endPoinst.platforms.api}/${id}`).then((res) => router.push('/dashboard/platforms'));
            }}
            className="mt-4 mr-3 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white"
          >
            Eliminar
          </button>
        </div>
      </div>
      {modalVariable ? <ModalCustomer modal={modal} closeModal={closeModal} /> : null}
    </div>
  );
};

export default ModifyPlace;
