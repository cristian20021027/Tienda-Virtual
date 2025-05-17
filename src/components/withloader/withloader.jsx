import React, { useState, useEffect } from 'react';
import Loader from '../loader/loader';

const withLoader = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 3000); // Simula una carga de 3 segundos
      return () => clearTimeout(timer);
    }, []);

    return loading ? <Loader /> : <WrappedComponent {...props} />;
  };
};

export default withLoader;
