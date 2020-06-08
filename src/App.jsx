import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import Home from "./component/Home.jsx";
import { ItabsName } from "./interface/intex.ts";
import "./App.css";
import { Tabs } from "antd";
const { TabPane } = Tabs;

@inject(({ Home }) => ({
  type: Home.type,
  data: Home.data,
  limit: Home.limit,
  loadData: Home.loadData,
  changeType: Home.changeType,
}))
@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: ["all", "ask", "share", "job", "good"],
    };
  }

  componentDidMount() {
    const { loadData } = this.props;
    loadData();
  }

  changeTab(tab) {
    const { changeType } = this.props;
    changeType(ItabsName[tab]);
  }

  render() {
    const { data } = this.props;
    const { tabList } = this.state;
    return (
      <div className="App">
        <Tabs onChange={(index) => this.changeTab(index)}>
          {tabList.map((item, index) => {
            return (
              <TabPane tab={item} key={index}>
                {data.length > 0 ? <Home></Home> : ""}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  }
}
export default App;

// const App = ({props}) => {
//     const { loadData, data, type } = props;
// 		const [tab, changeTab] = useState("all");

// 		const tabList = ["all", "ask", "share", "job", "good"];

//     // useEffect(() => {
//     //     document.title = `You  Clicked ${count} times. ${new Date()}`;
//     // },[count])

//     return (
//         <div className="App">
//             <button onClick={loadData}>获取{type}的数据 </button>
// 						<Tabs onChange={() => changeTab()}>
// 							{tabList.map((item, index) => {
// 								return (
// 									<TabPane tab={item} key={index}>
// 										{data.length > 0 ? <Home arr={data} name={'ljlhnick'}></Home> : ''}
// 									</TabPane>
// 								)
// 							})}
// 						</Tabs>

//         </div>
//     );
// }
// export default inject(({Home}) => ({props:Home}))(observer(App));
