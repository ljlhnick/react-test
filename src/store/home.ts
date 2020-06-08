import { observable, action, runInAction } from "mobx";
import http from "../server";

class Home {
  @observable title = "";

  @observable type;
  @observable data;
  page;
  limit = 5;

  constructor(obj) {
    this.init(obj);
  }

  @action.bound
  changeType(type) {
    this.type = type;
    this.loadData();
  }

  // init data
  @action.bound
  init({ type, page, data }) {
    this.type = type ? JSON.parse(type) : "all";
    this.page = page ? JSON.parse(page) : 0;
    this.data = data ? JSON.parse(data) : [];
  }

  // loadMoreData
  @action.bound
  async loadData() {
    try {
      const res = await http.get(
        `/cnode/topics?tab=${this.type}&page=${this.page}&limit=${this.limit}`
      );
      runInAction(() => {
        this.data = res.data.data;
      });
    } finally {
    }
  }

  @action.bound
  inputChange(e) {
    this.title = e.target.value;
  }
}

export default new Home({});
