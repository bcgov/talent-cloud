import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from '../components';

export const PublicRoute = () => {
  return (
    <Layout authenticated={false} username={''}>
      <Outlet />
    </Layout>
  );
};
