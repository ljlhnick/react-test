import React from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import { Button, Form, Input, notification } from "antd";
import "../App.css";
import "antd/dist/antd.css";

@inject(({ Login }) => ({
  setField: Login.setField,
  submitAndLogin: Login.submitAndLogin,
  getCaptcha: Login.getCaptcha,
  profile: Login.profile,
  isLogin: Login.isLogin,
  getPlayList: Login.getPlayList,
}))
@observer
class Login extends React.Component {
  openNotification() {
    const { profile } = this.props;
    let profileToJs = toJS(profile);
    notification.open({
      message: "Login success",
      description: `welcome ${profileToJs.nickName}, your uid is ${profileToJs.userId}`,
    });
  }

  render() {
    const {
      setField,
      submitAndLogin,
      regist,
      isLogin,
      getCaptcha,
    } = this.props;
    return (
      <div>
        <Form className="from">
          <Form.Item
            label="phoneNumber"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phoneNumber" },
            ]}
          >
            <Input
              placeholder="phoneNumber"
              onChange={(e) => setField("phoneNumber", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="PassWord"
            name="PassWord"
            rules={[{ required: true, message: "Please input your PassWord" }]}
          >
            <Input
              placeholder="passWord"
              onChange={(e) => setField("passWord", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="验证码" name="captcha">
            <Input
              placeholder="验证码"
              onChange={(e) => setField("captcha", e.target.value)}
            />
            <Button onClick={() => getCaptcha()}>获取验证码</Button>
          </Form.Item>
          <Form.Item label="昵称" name="nickName">
            <Input
              placeholder="昵称"
              onChange={(e) => setField("nickName", e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => submitAndLogin()}
            >
              Login in
            </Button>
            <Button type="primary" htmlType="regist" onClick={() => regist()}>
              Register
            </Button>
            {isLogin && this.openNotification()}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
