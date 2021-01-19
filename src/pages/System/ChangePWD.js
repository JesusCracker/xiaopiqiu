import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Card, Icon, Form, Input, Button, Col, message } from 'antd';
import router from 'umi/router';

@Form.create()
@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))


class ChangePWD extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value.length >= 3 && value !== form.getFieldValue('newPassword1')) {
      callback('两次输入的新密码不一致');
    } else {
      callback();
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const { form, dispatch } = this.props;
    this.setState({
      loading: true,
    });
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        dispatch({
          type: 'users/changeCurrentPWD',
          payload: {
            password: fieldsValue.password,
            newPassword: fieldsValue.newPassword2,
          },
        }).then(res => {
          this.setState({
            loading: false
          });
          if(res.status === 1){
            message.success('修改成功，请重新登录');
            router.push({
              pathname: '/login',
            });
          }
        });

      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { loading } = this.state;
    return (
      <PageHeaderWrapper>
        <Card>
          <Row>
            <Form
              layout="horizontal"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 8 }}
              onSubmit={this.handleSubmit}
            >
              <Form.Item label="原密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入原始密码' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入原始密码"
                  />,
                )}
              </Form.Item>
              <Form.Item label="新密码">
                {getFieldDecorator('newPassword1', {
                  rules: [{ required: true, message: '请输入不小于3位的新密码', min: 3 }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入新密码"
                  />,
                )}
              </Form.Item>
              <Form.Item label="确认密码">
                {getFieldDecorator('newPassword2', {
                  rules: [
                    { required: true, message: '请再次输入不小于3位的新密码', min:3 },
                    { validator: this.compareToFirstPassword },
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入新密码"
                  />,
                )}
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button onClick={() => router.go(-1)}>
                  取消
                </Button>
                <Col xs={{ span: 1 }} lg={{ span: 3 }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    提交
                  </Button>
                </Col>

              </Form.Item>
            </Form>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

ChangePWD.propTypes = {};

export default ChangePWD;
