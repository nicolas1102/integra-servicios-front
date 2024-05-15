import axios from 'axios'

export const getLosBazuquerosResourcesRequest = async () => {
  const res = await axios.get('https://integracion-los5-420.vercel.app/clienteintegracion')
  return res
}
