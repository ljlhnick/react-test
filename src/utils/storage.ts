import Cookies from "js-cookie";

export const Cookie = (key: string, value?: string | object): any => {
  if (typeof value !== "undefined") {
    Cookies.set(key, value);
  } else {
    Cookies.get(key);
  }
};
