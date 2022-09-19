import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getObject } from '@api/requests';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import endPoinst from '@api/index';
import Form from '@components/Form';

const Modify = () => {
  const [formData, setForm] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const { data: platform, error } = useSWR(id ? `${endPoinst.platforms.api}/${id}` : null, getObject);

  const form = {
    title: platform?.platform?.title,
    email: platform?.platform?.email,
    password: platform?.platform?.password,
  };

  useEffect(() => {
    setForm(form);
  }, [platform]);

  if (error) return <div>failed to load</div>;
  if (!platform)
    return (
      <div className="container w-screen h-screen flex justify-center items-center relative">
        <motion.div className="w-min flex absolute" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.6 }}>
          <motion.div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-700 to-cyan-600"></motion.div>
          <motion.div className="w-10 h-10 mx-8 rounded-full bg-gradient-to-r from-green-300 to-emerald-500"></motion.div>
          <motion.div className="w-10 h-10 rounded-full bg-gradient-to-r to-purple-700 from-cyan-600"></motion.div>
        </motion.div>
      </div>
    );
  return (
    <div className="container p-6">
      <Form formNewMovie={false} formData={formData} />
    </div>
  );
};

export default Modify;
