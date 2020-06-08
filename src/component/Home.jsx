import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import moment from "moment";
import { Card, Row, Col } from "antd";

@inject(({ Home }) => ({
  data: Home.data,
}))
@observer
class Home extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <div id="home-container">
          <Row>
            {data.map((item, index) => {
              return (
                <Col span={6}>
                  <Card title={item.title} key={index}>
                    <h3>
                      类别:{item.tab}, 发布日期:{" "}
                      {moment(item.create_at).format("YYYY-MM-DD HH:MM:SS A")}
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.content }}
                      style={{ height: "300px", overflow: "auto" }}
                    ></div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}
export default Home;
