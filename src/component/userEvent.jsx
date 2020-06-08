import React from "react";
import { inject, observer } from "mobx-react";

@inject(({ UserEvent, Login }) => ({
  events: Login.events,
  getUserEvents: UserEvent.getUserEvents,
  getHotSonger: Login.getHotSonger,
}))
@observer
class UserEvent extends React.Component {
  componentDidMount() {
    const { getUserEvents, getHotSonger } = this.props;
    getUserEvents();
    getHotSonger();
  }

  render() {
    const { events } = this.props;
    return <div>动态-{events.length}</div>;
  }
}

export default UserEvent;
