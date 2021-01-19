import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon, Row, Col } from 'antd';
import Login from '@/components/Login';
import * as encryptions from '@/utils/basicTools';
import { imgUrlPath } from '@/global';
import Identification from '@/utils/Identification';

import styles from './Login.less';


const { UserName, Password, Submit, IdentificationCode } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    autoLogin: false,
    loginUserInfo: {},
  };

  componentDidMount() {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('autoLogin')) {
        this.setState({
          autoLogin: JSON.parse(localStorage.getItem('autoLogin')),
        });
      }
      if (localStorage.getItem('loginUserInfo')) {
        const loginUserInfo = JSON.parse(encryptions.decodeBase64(localStorage.getItem('loginUserInfo')));
        this.setState({
          loginUserInfo,
        });
      }
    }
  }


  handleSubmit = (err, values) => {
    const { dispatch } = this.props;
    const { autoLogin } = this.state;
    if (autoLogin) {
      const str = JSON.stringify(values);
      const encodeStr = encryptions.encodeBase64(str);
      localStorage.setItem('loginUserInfo', encodeStr);
    } else {
      localStorage.removeItem('loginUserInfo');
    }
    if (!err) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
    localStorage.setItem('autoLogin', e.target.checked);
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { autoLogin, loginUserInfo } = this.state;
    return (
      <div className={styles.main}>
        <Login
          autoComplete="off"
          defaultActiveKey=''
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >

          <UserName
            name="userName"
            placeholder={formatMessage({ id: 'app.login.placeholderUserName' })}
            autoComplete="chrome-off"
            defaultValue={Object.keys(loginUserInfo).length !== 0 ? loginUserInfo.userName : ''}
          />
          <Password
            name="password"
            placeholder={formatMessage({ id: 'app.login.placeholderPassword' })}
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            autoComplete="new-password"
            defaultValue={Object.keys(loginUserInfo).length !== 0 ? loginUserInfo.password : ''}
          />
          <div className='verification'>
            <Row>
              <Col xs={20} sm={20} md={20} lg={20} xl={19}>
                <IdentificationCode
                  name="secCode"
                  placeholder={formatMessage({ id: 'app.login.placeholderIdentificationCode' })}
                  autoComplete="chrome-off"
                  defaultValue=''
                />
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={5} className={styles.handleImage}>
                <Identification {...this.props} />
              </Col>
            </Row>
          </div>

          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
