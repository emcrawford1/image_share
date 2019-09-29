export const getJwt = () => {
 return localStorage.getItem('ImageShare-jwt');

}

export const removeJwt = () => {
  return localStorage.removeItem('ImageShare-jwt');
}