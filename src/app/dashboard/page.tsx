'use client';

import { useEffect, useState } from 'react';

import { Head } from '@/components/Head';

const page = () => {
  const first = useState(true);
  useEffect(() => {
    if (first) throw new Error('first error occured');
  }, [first]);

  return (
    <div>
      <Head title="Dashboard" />
      <h1>Dashboard</h1>
    </div>
  );
};

export default page;
