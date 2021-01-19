import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Input, Button, Row, Col, Radio, message } from 'antd';
import styles from '@/pages/pointsManagement/Setting.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
@connect(({ point, loading }) => ({
  point,
  loading: loading.models.point,
}))
class Setting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'point/fetchPointSetting',
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const { form, dispatch, point } = this.props;
    const { pointSetting: { data: { id } } } = point;
    this.setState({
      loading: true,
    });
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        const params = {
          ...fieldsValue,
          id,
        };

        dispatch({
          type: 'point/savePointSetting',
          payload: {
            ...params,
          },
        }).then(res => {
          this.setState({
            loading: false,
          });
          if (res.status === 1) {
            message.success('设置成功');
            dispatch({
              type: 'point/fetchPointSetting',
            });
          }
        });
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      point: { pointSetting: { data } },
    } = this.props;
    const { pointToRMB, id, withdrawSetting } = data;
    const { loading } = this.state;
    return (
      <PageHeaderWrapper title="修改密码">
        <Card>
          <Row>
            <Form
              layout="horizontal"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 12 }}
              onSubmit={this.handleSubmit}
            >
              <Form.Item label="提现比例" wrapperCol={{ span: 3 }}>
                {getFieldDecorator('pointToRMB', {
                  initialValue: pointToRMB,
                  rules: [{ required: true, message: '请输入提现比例' }],
                })(
                  <Input
                    type="text"
                    placeholder="X积分=1RMB"
                  />,
                )}
              </Form.Item>
              {/*是否允许企业用户提现：1是；2否*/}
              <FormItem label="是否允许企业用户提现">
                {getFieldDecorator('withdrawSetting', {
                  initialValue: withdrawSetting,
                  rules: [{ required: true, message: '请选择是否允许企业用户提现' }],
                })(
                  <RadioGroup>
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </RadioGroup>,
                )}
              </FormItem>,

              <Form.Item wrapperCol={{ offset: 4 }}>
                <Col xs={{ span: 1 }} lg={{ span: 2 }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    确认
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

Setting.propTypes = {};

Setting.defaultProps = {
  point: { pointSetting: { data: { pointToRMB: '', id: '', withdrawSetting: '' } } },
};


export default Setting;
