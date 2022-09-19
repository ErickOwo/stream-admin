import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getObject, deleteObject } from '@api/requests';
import endPoinst from '@api/index';
import Link from 'next/link';

const ModifyPlace = () => {
  const [platform, setPlatform] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const setItem = async () => {
      const item = await getObject(`${endPoinst.platforms.api}/${id}`);
      setPlatform(item.platform);
    };
    setItem();
  }, []);

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
        <div className="options h-10 mt-6">
          <Link href="/dashboard/platforms">
            <button className="mt-4 mr-3 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white">Volver</button>
          </Link>
          <Link href={`/dashboard/platforms/${platform?._id}/modify`}>
            <button className="mt-4 mr-3 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white">Editar</button>
          </Link>
          <button
            onClick={() => {
              if (confirm('Está seguro que desea eliminar la plataforma')) deleteObject(`${endPoinst.platforms.api}/${id}`).then((res) => router.push('/dashboard/platforms'));
            }}
            className="mt-4 mr-3 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyPlace;
