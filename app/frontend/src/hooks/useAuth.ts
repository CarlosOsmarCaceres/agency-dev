import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest, registerRequest, RegisterData } from '../adapters/auth.adapter';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');
    try {
      const token = await loginRequest(email, password);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al iniciar sesión');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError('');
    try {
      await registerRequest(data);
      alert('✅ Cuenta creada. Por favor inicia sesión.');
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al registrarse');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error
  };
};