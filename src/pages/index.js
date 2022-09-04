import { useRef, useEffect, useState } from 'react';
import { useAuth } from '@hooks/use-auth';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';

export default function Home() {
  const formRef = useRef(null);
  const auth = useAuth();
  const router = useRouter();
  const [menssage, setMessage] = useState(null);

  useEffect(() => {
    if (jsCookie.get('token-sportown')) router.push('/dashboard');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    if (!/[\w\.]{3,30}\+?\w{0,10}@[\w\.\-]{3,}\.\w{2,3}/i.test(data.email)) {
      auth.setError('Usuario de email invalido');
      return;
    } else if (!/.{8,1024}/.test(data.password)) {
      auth.setError('La contraseña es demasiado corta');
      return;
    } else {
      auth.setError(null);
    }

    auth
      .signIn(data)
      .then((res) => {
        if (res) {
          setMessage(null);
          auth.setError(null);
          router.push('/dashboard');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="w-full max-w-none flex min-h-screen">
      <div className="bg-[#468] w-full flex p-5 justify-center items-center">
        <form
          className="max-w-[400px] w-full flex flex-col border border-white md:px-5 md:py-12 px-4 py-6 bg-[#000] gap-6 text-white shadow-[0_35px_30px_-15px_rgba(240,240,240,0.3)]"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h3 className="font-bold text-xl">Ingresa a tu cuenta</h3>

          <input className="border border-blue-500 bg-white text-blue-700 p-1" placeholder="Correo Electrónico" type="email" id="email" name="email" />
          <input className="border border-blue-500 bg-white text-blue-700 p-1" placeholder="Contraseña" type="password" id="password" name="password" />
          {auth.error ? <span className="h-4 text-red-600">{auth.error}</span> : <span className="h-4"></span>}
          {!auth.error && menssage ? <span className="h-4 text-blue-700">Ingresando...</span> : <span className="h-4"></span>}
          <button type="submit" onClick={() => setMessage(true)} className="self-center py-1 px-3 border border-white bg-black/50 hover:text-white/80 hover:border-white/80">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
