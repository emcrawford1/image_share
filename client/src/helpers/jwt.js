
export const setCookie = token => {
  console.log("Token: ", token)
  if(token !== undefined) document.cookie = "imageShare-jwt=" + token + ";path=/";
}

export const getCookieJwt = () => {
  const name = "imageShare-jwt=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieList = decodedCookie.split(";");
  for (let i = 0; i < cookieList.length; i++) {
    let cookieRef = cookieList[i];
    while (cookieRef.charAt(0) === " ") {
      cookieRef = cookieRef.substring(1);
    }
    if (cookieRef.indexOf(name) === 0) {
      return cookieRef.substring(name.length, cookieRef.length)
    }
  }
}

export const removeCookieJwt = () => {
 const name = "imageShare-jwt=";
 document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
}