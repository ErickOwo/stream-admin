import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import endPoints from '@api/index';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
  const auth = useProviderAuth();
  const router = useRouter();
  const [initializated, setInitial] = useState(false);

  useEffect(() => {
    const authentication = async () => {
      try {
        const res = await auth.auth();
        if (res == 'ok') {
          setInitial(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    authentication();
  }, [router.pathname]);
  if (!initializated && router.pathname != '/')
    return (
      <div className="text-white bg-black w-full h-screen fixed top-0 right-0 flex">
        <span className="m-auto text-2xl">Cargando...</span>
      </div>
    );
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  if (cookie.get('token-sportown')) {
    axios.defaults.headers.Authorization = `${cookie.get('token-sportown')}`;
  }

  const options = {
    Headers: {
      accept: '*/*',
      'content-Type': 'aplication/json',
    },
  };

  const signIn = async (body) => {
    try {
      const response = await axios.post(endPoints.auth.login, body, options);
      const { access_token } = response.data;

      if (access_token) cookie.set('token-sportown', access_token, { expires: 30 });

      axios.defaults.headers.Authorization = `${cookie.get('token-sportown')}`;

      return 'ok';
    } catch (e) {
      if (e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        console.log(e);
        setError('Error en la API');
      }
    }
  };
  const signUp = async (body) => {
    try {
      const response = await axios.post(endPoints.auth.signUp, body, options);
      return response.data;
    } catch (e) {
      if (e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        console.log(e);
        setError('Error en la API');
      }
    }
  };

  const logOut = () => {
    cookie.remove('token-sportown');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    if (router.pathname != '/') window.location = '/';
  };
  const auth = async () => {
    try {
      const { data: userProfile } = await axios(endPoints.auth.profile);
      setUser(userProfile);
      return 'ok';
    } catch (e) {
      logOut();
      return error;
    }
  };
  return {
    user,
    signIn,
    signUp,
    logOut,
    auth,
    error,
    setError,
  };
};
