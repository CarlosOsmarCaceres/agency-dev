const API_URL = 'http://localhost:3000';

export const addToCartRequest = async (serviceId: string, token: string) => {

    const response = await fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 👇 ¡Clave! Enviamos el token para que el backend sepa quiénes somos
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ serviceId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al agregar al carrito');
    }

    return data;

};

export const getCartRequest = async (token: string) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  const data = await response.json();

  if (!response.ok) {
    // Si es 404 puede ser que no tenga carrito, devolvemos null
    if (response.status === 404) return null;
    throw new Error(data.error || 'Error al obtener el carrito');
  }

  return data;
};

export const checkoutRequest = async (token: string) => {
  const response = await fetch(`${API_URL}/cart/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({}), // Body vacío
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al finalizar la compra');
  }

  return data; // Retorna el proyecto creado
};