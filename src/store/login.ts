import { observable, action, runInAction } from "mobx";
import http from "../server";
import { IPlayList, IProfile } from "../interface/intex";
import { Cookie } from "../utils/index";

class Login {
  @observable phoneNumber: string = "";
  @observable passWord: string = "";
  @observable captcha: string = "";
  @observable nickName: string = "";

  @observable isLogin: Boolean = false;
  @observable isRegister: Boolean = false;

  @observable profile: IProfile;

  @observable playList: Array<IPlayList> = [];
  @observable recordList = [];

  @action.bound
  setField(key: keyof Login, value) {
    this[key] = value;
  }

  @action.bound
  async submitAndLogin() {
    let self = this;
    try {
      let res = await http.get(
        `/music/login/cellphone?phone=${self.phoneNumber}&password=${self.passWord}`
      );
      runInAction(() => {
        console.log(res);
        if (res.data.code === 200 || res.data.code === "200") {
          Cookie("cookie", res.data.cookie);
          // Cookie("token", res.data.token);
          self.setField("isLogin", true);
          let profile: IProfile = {
            userId: res.data.profile.userId,
            nickName: res.data.profile.nickname,
            signature: res.data.profile.signature,
            userType: res.data.profile.userType,
            viptype: res.data.profile.vipType,
          };
          self.setField("profile", profile);
          // self.getUserDetail();
        } else {
          console.log(res.data.msg);
        }
      });
    } finally {
    }
  }

  @action.bound
  async getCaptcha() {
    let self = this;
    try {
      await http.get(`/captcha/sent?phone=${self.phoneNumber}`);
    } catch (error) {}
  }

  @action.bound
  async validCaptcha() {
    let self = this;
    try {
      let res = await http.get(
        `/captcha/verify?phone=${self.phoneNumber}&captcha=${self.captcha}`
      );
      runInAction(() => {
        if (res.code === 200) {
          console.log("验证码正确");
        } else {
          console.log(res.message);
        }
      });
    } catch (error) {}
  }

  @action.bound
  async regist() {
    let self = this;
    try {
      let res = await http.get(
        `/register/cellphone?phone=${self.phoneNumber}&password=${self.passWord}&captcha=${self.captcha}&nickname=${self.nickName}`
      );
      runInAction(() => {
        console.log(res);
      });
    } catch (error) {}
  }

  @action.bound
  async getPlayList() {
    let self = this;
    try {
      let res = await http.get("/music/user/playlist?uid=118008381");
      runInAction(() => {
        self.setField("playList", res.data.playlist);
      });
    } finally {
    }
  }

  @action.bound
  async getRecordList(type: number) {
    let self = this;
    try {
      let res;
      if (!type) {
        res = await http.get(`/music/user/record?uid=118008381&type=${type}`);
      } else {
        res = await http.get("/music/user/record?uid=118008381");
      }

      runInAction(() => {
        if (!type) {
          self.setField("recordList", res.data.allData);
        } else {
          self.setField("recordList", res.data.weekData);
        }
      });
    } finally {
    }
  }

  //登录后才可以调用的接口
  @action.bound
  async getUserDetail() {
    let self = this;
    let res = await http.get(`/user/detail?uid=${self.profile.userId}`);
    runInAction(() => {
      console.log(res);
    });
  }
}
export default new Login();
