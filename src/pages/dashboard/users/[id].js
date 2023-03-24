import axios from 'axios';
import { useEffect, useState } from 'react';
import endPoinst from '@api/index';
import { useRouter } from 'next/router';
import Order from '@components/Order';
import PlatformCard from '@components/PlatformCard';
import Image from 'next/image';

const User = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);
  const [platforms, setPlatforms] = useState(null);

  useEffect(() => {
    if (!router) return;

    getData(router.query.id);
  }, [router]);

  const getData = async (user) => {
    const userData = await axios(`${endPoinst.users.api}/user/${user}`);
    const orders = await axios(`${endPoinst.users.api}/orders/${user}`);
    const platformsContainer = [];

    for (let i = 0; i < userData.data.platforms.length; i++) {
      const data = await axios(`${endPoinst.users.api}/platforms/${userData.data.platforms[i]}`);
      await platformsContainer.push(data.data);
    }

    setPlatforms(platformsContainer);
    setUser(userData.data);
    setOrders(orders.data);
  };

  return (
    <div className="w-full min-h-screen flex gap-3 py-3 flex-col">
      <div className="mx-auto flex-col gap-2 max-w-[580px] w-full bg-[#f0f0f0] p-2 rounded-lg">
        <div className="flex">
          <h4 className="mr-2 font-semibold">Name:</h4>
          <p>{user?.name}</p>
        </div>
        <div className="flex">
          <h4 className="mr-2 font-semibold">Email:</h4>
          <p>{user?.email}</p>
        </div>
        <div className="flex">
          <h4 className="mr-2 font-semibold">Phone:</h4>
          <p>{user?.phone}</p>
        </div>
      </div>
      <div className="mx-auto flex-col gap-2 max-w-[580px] w-full bg-[#f0f0f0] p-2 rounded-lg">
        <h3 className="font-semibold mb-2">Platforms.</h3>
        {platforms?.map((platform, index) => {
          return (
            <div className="p-3 max-w-lg border-l border-b mb-3 border-gray-600 text-md" key={index}>
              <div className="flex">
                <h4 className="font-bold mr-2">Title: </h4>
                <p>{platform.title}</p>
              </div>
              <div className="flex">
                <h4 className="font-bold mr-2">Email: </h4>
                <p>{platform.email}</p>
              </div>
              <div className="flex">
                <h4 className="font-bold mr-2">Password: </h4>
                <p>{platform.password}</p>
              </div>
              <div className="flex">
                <h4 className="font-bold mr-2">Type: </h4>
                <p>
                  {platform.type == 0 ? 'Disney+' : platform.type == 1 ? 'HBO MAX' : platform.type == 2 ? 'Prime Video' : platform.type == 3 ? 'Paramount+' : platform.type == 4 ? 'Star+' : 'Neflix'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mx-auto flex-col gap-2 max-w-[580px] w-full bg-[#f0f0f0] p-2 rounded-lg">
        <h4 className="font-semibold">Orders.</h4>
        <div className="flex flex-col gap-2">
          {orders?.map((order, index) => (
            <div key={index} className="">
              <div className="flex flex-col bg-[#dfdfdf]">
                <h4 className="mr-2 font-semibold">No.</h4>
                <p>{order._id}</p>
                <div className="grid grid-cols-7">
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
                  <Order title="Netflix:" quantity={order.netflixProfiles} months={order.months} price={60} />
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
                  <div className="flex flex-wrap">
                    <h3 className="font-semibold mx-2">Start Date:</h3>
                    {order.startDate.substring(0, 10)}
                  </div>
                ) : null}
                {order.endDate ? (
                  <div className="flex flex-wrap">
                    <h3 className="font-semibold mx-2">End Date:</h3>
                    {order.endDate.substring(0, 10)}
                  </div>
                ) : null}
                <div className="flex flex-col">
                  <h4 className="text-xl font-semibold">Pago:</h4>
                  <div className="flex justify-center h-[420px] w-full">
                    <Image src={order.imgURL} width="400%" height="100%" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
