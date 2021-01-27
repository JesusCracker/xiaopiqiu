import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Button, Row, Col, Radio, message } from 'antd';
import styles from '@/pages/redenvelopeManagement/Setting.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
@connect(({ redenvelopeSetting, loading }) => ({
  redenvelopeSetting,
  loading: loading.models.redenvelopeSetting,
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
      type: 'redenvelopeSetting/fetchPaySetting',
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const { form, dispatch, redenvelopeSetting } = this.props;
    const { setting: { data: { id } } } = redenvelopeSetting;
    this.setState({
      loading: true,
    });
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const params = {
        ...fieldsValue,
        id,
      };
      dispatch({
        type: 'redenvelopeSetting/savePaySetting',
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
            type: 'redenvelopeSetting/fetchPaySetting',
          });
        }
      });
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      redenvelopeSetting: { setting: { data } },
    } = this.props;
    const { id, withdrawSetting } = data;
    const { loading } = this.state;
    return (
      <PageHeaderWrapper title="修改密码">
        <Card>
          <Row>
            <Form
              layout="horizontal"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onSubmit={this.handleSubmit}
            >
              <FormItem label="支付方式">
                {getFieldDecorator('withdrawSetting', {
                  initialValue: withdrawSetting,
                  rules: [{ required: true, message: '请选择是否允许企业用户提现' }],
                })(
                  <RadioGroup>
                    <Radio value={1}>积分</Radio>
                    <Radio value={2}>金币</Radio>
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
  redenvelopeSetting: { setting: { data: { id: '', payMethod: '' } } },
};


export default Setting;
