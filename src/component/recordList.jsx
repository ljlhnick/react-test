import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { Table, Tabs } from "antd";

const { TabPane } = Tabs;

@inject(({ Login }) => ({
  getRecordList: Login.getRecordList,
  recordList: Login.recordList,
}))
@observer
class RecordList extends React.Component {
  componentDidMount() {
    const { getRecordList } = this.props;
    getRecordList(1);
  }

  changeTab(key) {
    const { getRecordList } = this.props;
    key === "2" ? getRecordList(0) : getRecordList(1);
  }

  render() {
    const { recordList } = this.props;
    // console.log(toJS(recordList));
    return (
      <div>
        <Tabs onChange={(index) => this.changeTab(index)}>
          <TabPane tab="最近一周" key="1">
            <Table dataSource={recordList} columns={columns}></Table>
          </TabPane>
          <TabPane tab="所有时间" key="2">
            <Table dataSource={recordList} columns={columns}></Table>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default RecordList;

const columns = [
  {
    title: "歌名",
    dataIndex: "song",
    render: (item) => {
      let currentItem = toJS(item);
      return currentItem.name;
    },
    key: "name",
  },
  {
    title: "歌手",
    dataIndex: "song",
    render: (item) => {
      let currentItem = toJS(item);
      return currentItem.ar[0].name;
    },
    key: "songer",
  },
  {
    title: "听歌次数",
    dataIndex: "playCount",
    key: "count",
  },
  // ,
  // {
  //   title: "",
  //   dataIndex: "",
  //   key: "",
  // },
];
