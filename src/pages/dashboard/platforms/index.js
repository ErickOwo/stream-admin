import useSWR from 'swr';
import endPoinst from '@api/index';
import { getData } from '@api/requests';
import PlatformCard from '@components/PlatformCard';
import Link from 'next/link';

const Platforms = () => {
  const { data } = useSWR(endPoinst.platforms.api, getData);

  return (
    <div className="min-h-screen w-full p-4">
      <div className="flex justify-between">
        <h3 className="mb-5 text-3xl">Streaming Platforms</h3>
        <Link href="/dashboard/platforms/add">
          <button className="bg-[#0009] px-3 text-white rounded-lg hover:bg-[#1119]">Add Platform</button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        {data?.map((platform, index) => (
          <PlatformCard alias={platform.alias} title={platform.title} password={platform.password} email={platform.email} key={platform._id} id={platform._id} type={platform.type} />
        ))}
      </div>
    </div>
  );
};

export default Platforms;
