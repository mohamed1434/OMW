import Cookie from "js-cookie";
const RemoveCookie = (cookieName) => {
  console.log(`Removing cookie ${cookieName}`);
  Cookie.remove(cookieName);
};
export default RemoveCookie;
