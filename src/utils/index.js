import Cookies from "js-cookie";

export const Cookie = (key, value) => {
	if (typeof value !== "undefined") {
		Cookies.set(key, value);
	} else {
		Cookies.get(key);
	}
};