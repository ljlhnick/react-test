import { observable, action, runInAction } from "mobx";
import http from "../server";

class UserEvent {
  @observable events: Array<Object> = [];

  @action.bound
  setField(key: keyof UserEvent, value) {
    this[key] = value;
  }

  @action.bound
  async getUserEvents() {
    let self = this;
    try {
      let res = await http.get("/user/event?uid=118008381");
      runInAction(() => {
        self.setField("events", res.events);
      });
    } catch {}
  }

  @action.bound
  async getHotSonger() {
    let self = this;
    let res = await http.get("/top/artists?offset=0&limit=30");
    runInAction(() => {
      self.setField("events", res.artists);
    });
  }
}

export default new UserEvent();
