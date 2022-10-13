import Link from 'next/link';

const Dashboard = () => {
  const pages = [
    {
      link: '/dashboard/platforms',
      name: 'Platforms',
    },
    {
      link: '/dashboard/orders/pending',
      name: 'Orders',
    },
    {
      link: '/dashboard/users',
      name: 'Users',
    },
  ];
  return (
    <div className="container max-w-none w-full py-8 md:px-12 px-6">
      <div className="flex flex-wrap gap-6">
        {pages.map((page, index) => {
          return (
            <Link href={page.link} key={index}>
              <button className="md:w-44 h-40 w-full p-2 border border-white text-white flex bg-gray-900 hover:bg-gray-800 transition-colors rounded-lg">
                <span className="">{page.name}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
