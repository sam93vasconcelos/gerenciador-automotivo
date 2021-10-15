import React from 'react';
import useLoading from '../../hooks/useLoading';
import LoadingOverlay from '../loadingOverlay/Index';

function GlobalLoading() {
  const { loading } = useLoading();
  return <>{!loading ? '' : <LoadingOverlay />}</>;
}

export default GlobalLoading;