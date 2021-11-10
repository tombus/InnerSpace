import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie';

export default function useAuth(){
  const [ cookies ] = useCookies(['jwt']);
  try {
    const token = cookies.jwt;
    if(token)
      return jwt.decode(token);
  } catch(err){
    console.error('useAuth error:', err);
  }
  return null;
}
