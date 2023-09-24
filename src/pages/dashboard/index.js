import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [animationVar, setAnimationVar] = useState(false);
  const [modal, setModal] = useState(false);

  const variantsModal = {
    show: {
      width: '100%',
      transition: {
        ease: 'easeInOut',
        duration: 0.6,
      },
    },
    hidde: {
      width: 0,
      transition: {
        ease: 'easeOut',
        duration: 1,
      },
    },
  };

  const handleOptions = () => {
    setModal(!modal);
    setAnimationVar(!animationVar);
  };

  return (
    <div className="container max-w-none w-full py-8 md:px-12 px-6">
      <div className="flex flex-wrap gap-6 ">
        <Link href="/dashboard/platforms">
          <button className="md:w-44 h-40 w-full border border-white text-white flex bg-gray-900 hover:bg-gray-800 transition-colors rounded-lg">
            <span className="m-2">Platforms</span>
          </button>
        </Link>
        <button className="md:w-44 h-40 w-full border border-white text-white flex bg-gray-900 hover:bg-gray-800 transition-colors rounded-lg relative " onClick={() => handleOptions()}>
          <span className="m-2">Orders</span>
          {modal ? (
            <motion.div className="flex flex-col bg-black absolute  top-12 left-4  w-[165px] overflow-hidden" initial={{ width: 0 }} variants={variantsModal} animate={animationVar ? 'show' : 'hidde'}>
              <Link href="/dashboard/orders/pending">
                <div className="text-left p-2 hover:bg-white/10">Asign Platforms</div>
              </Link>
              <Link href="/dashboard/orders/accepted">
                <div className="text-left p-2 hover:bg-white/10">Actives</div>
              </Link>
              <Link href="/dashboard/orders/noactive">
                <div className="text-left p-2 hover:bg-white/10">Pending Charge</div>
              </Link>
              <Link href="/dashboard/orders/rejected">
                <div className="text-left p-2 hover:bg-white/10">Rejected</div>
              </Link>
            </motion.div>
          ) : null}
        </button>
        <Link href="/dashboard/users">
          <button className="md:w-44 h-40 w-full border border-white text-white flex bg-gray-900 hover:bg-gray-800 transition-colors rounded-lg">
            <span className="m-2">Users</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
