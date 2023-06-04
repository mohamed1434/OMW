import Cookie from "js-cookie";
const SetCookie = (cookieName, value, options) => {
  return Cookie.set(cookieName, value, options);
};
export default SetCookie;
