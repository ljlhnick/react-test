import App from "../App.jsx";
import Login from "../component/Login.jsx";
import playList from "../component/playList.jsx";
import recordList from "../component/recordList.jsx";
import userEvent from "../component/userEvent.jsx";

export default [
  {
    path: "/",
    component: App,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/playList",
    component: playList,
  },
  {
    path: "/recordList",
    component: recordList,
  },
  {
    path: "/userEvent",
    component: userEvent,
  },
];
