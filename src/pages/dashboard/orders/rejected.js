import useSWR from 'swr';
import endPoinst from '@api/index';
import { getData } from '@api/requests';
import Image from 'next/image';
import axios from 'axios';

import Order from '@components/Order';

const OrdersNoPending = () => {
  const { data } = useSWR(endPoinst.orders.api + '/rejected', getData);

  const handleDelete = async (id) => {
    if (!confirm('Do you want to DELETE the order?')) return;
    const { data } = await axios.delete(`${endPoinst.orders.api}/${id}`);

    alert(data);
  };

  return (
    <div className="min-h-screen w-full p-4 flex flex-col items-center gap-4">
      {data?.map((order, index) => (
        <div className="bg-[#F1F1F1] p-4 md:my-6 rounded-lg w-full max-w-[600px] flex flex-col gap-1" key={index}>
          <div className="flex flex-wrap gap-3 justify-between">
            <h3 className="font-semibold">No. de Orden</h3>
            <p>{order.orderNumber}</p>
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
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold">Pago:</h4>
            <div className="flex justify-center h-[420px] w-full">
              <Image src={order.imgURL} width="400%" height="100%" />
            </div>
          </div>
          <button
            className="bg-red-600 text-white p-2 rounded-lg"
            onClick={() => {
              handleDelete(order._id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrdersNoPending;
