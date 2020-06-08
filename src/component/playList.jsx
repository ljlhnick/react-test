import React from "react";
import { inject, observer } from "mobx-react";
import { Card, Row, Col, Tooltip } from "antd";

const { Meta } = Card;

@inject(({ Login }) => ({
  getPlayList: Login.getPlayList,
  playList: Login.playList,
}))
@observer
class PlayList extends React.Component {
  componentDidMount() {
    const { getPlayList } = this.props;
    getPlayList();
  }
  render() {
    const { playList } = this.props;
    return (
      <div>
        <Row>
          {playList &&
            playList.map((item, index) => {
              return (
                <Col key={index} span={3}>
                  <Card
                    hoverable
                    cover={
                      <img alt={item.coverImgUrl} src={item.coverImgUrl} />
                    }
                  >
                    <Meta
                      title={<Tooltip title={item.name}>{item.name}</Tooltip>}
                      description={item.createTime}
                    />
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    );
  }
}

export default PlayList;
