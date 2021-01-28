import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button, Card, Col, Form, Input, message, Modal, Row, Select, Table, Menu, Icon, Progress } from 'antd';
import styles from './Activity.less';
import { Wrapper } from '@/utils/utils';
import moment from 'moment';

const FormItem = Form.Item;

@connect(({ activity, loading }) => ({
  activity,
  loading: loading.models.activity,
}))
@Form.create()
class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.applyRecordColumns = [
      {
        title: '申请手机号',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
      },
      {
        title: '申请昵称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '申请时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
        render: text => moment(text).format('YYYY-MM-DD HH:mm'),
      },

    ];
    this.recordColumns = [
      {
        title: '申请手机号',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
      },
      {
        title: '申请昵称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '申请时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
        render: text => moment(text).format('YYYY-MM-DD HH:mm'),
      },
      {
        title: '是否中奖',
        dataIndex: 'isWiner',
        key: 'isWiner',
        align: 'center',
        render: val => val && val === 1 ? '是' : '否',
      },
      {
        title: '是否发奖',
        dataIndex: 'toAward',
        key: 'toAward',
        align: 'center',
        render: val => val && val === 1 ? '是' : '否',
      },

    ];
    this.state = {
      current: 'detail',
      params: {
        page: 1,
        limit: 10,
      },
    };
  }

  handleClick = e => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    const { current } = this.state;
    const { form, modalVisible, handleModalVisible, handleAdd, loading, value, updateType } = this.props;
    console.dir(value);
    const { activityName } = value;
    const paginationProps = {
      showQuickJumper: true,
    };

    return (
      <Modal
        maskClosable={false}
        width={1000}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="红包领取明细"
        visible={modalVisible}
        onOk={()=>{}}
        onCancel={() => handleModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
        footer={
          // 设置footer为空，去掉 取消 确定默认按钮
          [
            <Button key="back" onClick={() => handleModalVisible()}>关闭</Button>,
          ]
        }
      >
        <div className={styles.container}>
          <Row>
            <Col span={24} className={styles.title}>{activityName}</Col>
          </Row>
          <Row>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[current]}
              mode="horizontal"
              className={styles.menu}
            >
              <Menu.Item key="detail">
                <Icon type="profile" />
                详情
              </Menu.Item>
              <Menu.Item key="rule">
                <Icon type="appstore" />
                规则
              </Menu.Item>
              <Menu.Item key="applyRecord">
                <Icon type="appstore" />
                申请记录
              </Menu.Item>
              <Menu.Item key="record">
                <Icon type="appstore" />
                发放记录
              </Menu.Item>
            </Menu>
          </Row>
          <Row>
            <Col span={12} offset={6} className={styles.progress}>
              <Progress percent={50} status="active" format={percent => `申请进度：${percent}%`} />
            </Col>
          </Row>
          <Row className={`${styles.inner} ${current === 'detail' ? styles.show : styles.hide}`}>
            <Col span={20} offset={2}>
              详细描述
            </Col>
          </Row>
          <Row className={`${styles.rule} ${current === 'rule' ? styles.show : styles.hide}`}>
            <Row className={`${styles.rule} ${styles.ruleBox}`}>
              <Col span={20} offset={2}>
                赠送方式介绍
              </Col>
            </Row>
            <Row className={`${styles.ruleBox} ${styles.rule1}`}>
              <Col span={20} offset={2}>
                发放方式介绍
              </Col>
            </Row>
          </Row>
          <Row className={` ${current === 'applyRecord' ? styles.show : styles.hide}`}>
            <Col>
              <div className={styles.applyScore}>收货积分总数：60000</div>
              <div>
                <Card>
                  <Table
                    loading={loading}
                    dataSource={[]}
                    columns={this.applyRecordColumns}
                    rowKey={result => result.id}
                    pagination={paginationProps}
                  />
                </Card>
              </div>
            </Col>
          </Row>
          <Row className={`${styles.rule} ${current === 'record' ? styles.show : styles.hide}`}>
            <Col>
              <div>
                <Card>
                  <Table
                    loading={loading}
                    dataSource={[]}
                    columns={this.recordColumns}
                    rowKey={result => result.id}
                    pagination={paginationProps}
                  />
                </Card>
              </div>
            </Col>
          </Row>

        </div>
      </Modal>
    );
  }
}

@Form.create()
@connect(({ activity, loading }) => ({
  activity,
  loading: loading.models.activity,
}))

class Activity extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '活动ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '活动名称',
        dataIndex: 'activityName',
        key: 'activityName',
        align: 'center',
      },
      {
        title: '红包模板',
        dataIndex: 'title',
        key: 'title',
        align: 'center',
      },
      {
        title: '运营公司',
        dataIndex: 'comUserName',
        key: 'comUserName',
        align: 'center',
      },
      {
        title: '红包价值(元)',
        dataIndex: 'honbaoValue',
        key: 'honbaoValue',
        align: 'center',
      },
      {
        title: '申请次数(次)',
        dataIndex: 'appAmount',
        key: 'appAmount',
        align: 'center',
      },
      {
        title: '所需积分(个)',
        dataIndex: 'appPoint',
        key: 'appPoint',
        align: 'center',
      },
      {
        title: '间隔时间(分钟)',
        dataIndex: 'intervals',
        key: 'intervals',
        align: 'center',
      },
      {
        title: '个人是否可多次申请',
        dataIndex: 'mulApplication',
        key: 'mulApplication',
        align: 'center',
        render: val => val && val === 1 ? '是' : '否',
      },
      {
        title: '发放方式',
        dataIndex: 'distributionMethod',
        key: 'distributionMethod',
        align: 'center',
        render: val => val && val === 1 ? '系统发放' : '手动发放',
      },
      {
        title: '中奖方式',
        dataIndex: 'winningMethod',
        key: 'winningMethod',
        align: 'center',
        render: val => val && val === 1 ? '系统抽奖' : '人工抽奖',
      },
      {
        title: '已申请次数',
        dataIndex: 'applyPeriods',
        key: 'applyPeriods',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: status => <span>{this.renderStatus(status)}</span>,
      },
      {
        title: '活动创建时间',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'center',
        render: text => moment(text).format('YYYY-MM-DD'),
      },
      {
        title: '活动开始时间',
        dataIndex: 'createDate1',
        key: 'createDate1',
        align: 'center',
        render: text => moment(text).format('YYYY-MM-DD'),
      },
      {
        title: '活动持续时间',
        dataIndex: 'createDate2',
        key: 'createDate2',
        align: 'center',
        render: createDate => moment().diff(moment(createDate), 'day'),
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => (
          <Wrapper>
            <a onClick={() => this.handleModalVisible(true, record, record.status)}>查看明细</a>
          </Wrapper>
        ),
      },
    ];
    this.state = {
      activityName: null,
      modalVisible: false,
      updateFormValues: {},
      updateType: null,
      params: {
        page: 1,
        limit: 10,
      },
    };

  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params, activityName } = this.state;
    dispatch({
      type: 'activity/fetch',
      payload: { ...params, activityName },
    });
  }

  renderStatus = (status) => {
    // 1申请中；2人工审核；3已完成
    let stringStatus = '';
    if (status !== null && (typeof status === 'number')) {
      if (status === 1) {
        stringStatus = '申请中';
      } else if (status === 2) {
        stringStatus = '人工审核';
      } else {
        stringStatus = '已完成';
      }
    }
    return stringStatus;
  };

  handleTableChange = (current) => {
    const { params, activityName } = this.state;
    const { dispatch } = this.props;
    this.setState({
      params: {
        page: current,
        limit: params.limit,
      },
    });
    const newParams = {
      page: current,
      limit: params.limit,
      activityName,
    };
    dispatch({
      type: 'activity/fetch',
      payload: { ...newParams, activityName },
    });
  };

  handleTableChangePageSize = (current, pageSize) => {
    const { params, activityName } = this.state;
    const { dispatch } = this.props;
    this.setState({
      params: {
        limit: pageSize,
      },
    });
    const newParams = {
      page: params.page,
      limit: pageSize,
      activityName,
    };
    dispatch({
      type: 'activity/fetch',
      payload: { ...newParams, activityName },
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { params: { limit } } = this.state;
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        page: 1,
        limit,
      };
      dispatch({
        type: 'activity/fetch',
        payload: { ...values },
      });
    });
  };

  /*  handleAdd = (fields, form) => {
      const { dispatch } = this.props;
      const { params: { limit } } = this.state;
      console.dir(fields);
      /!*    dispatch({
            type: 'task/saveTaskInfo',
            payload: { ...fields },
          }).then(res => {
            if (res && res.status === 1 && res.message === '成功') {
              message.success('新建任务成功');
              form.resetFields();
              this.handleModalVisible();
              dispatch({
                type: 'task/fetchTaskList',
                payload: { page: 1, limit },
              });
            }
          });*!/
    };*/

  handleModalVisible = (flag, record, modalType) => {
    const { dispatch } = this.props;
    this.setState({
      updateFormValues: record || {},
      updateType: modalType,
      modalVisible: !!flag,
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动名称">
              {getFieldDecorator('activityName')(<Input placeholder="活动名称" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <Button htmlType="submit">
              搜索
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { activity, loading } = this.props;
    const { activityList: { data, dataTotal } } = activity;
    const { params, modalVisible, updateFormValues, updateType } = this.state;

    const parentMethods = {
      // handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: () => `共${dataTotal}条`,
      current: params.page,
      pageSize: params.limit,
      total: dataTotal,
      pageSizeOptions: ['5', '10', '15', '20'],
      onChange: (current) => this.handleTableChange(current),
      onShowSizeChange: (current, pageSize) => this.handleTableChangePageSize(current, pageSize),
    };

    return (
      <PageHeaderWrapper>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              loading={loading}
              dataSource={data}
              columns={this.columns}
              rowKey={result => result.id}
              pagination={paginationProps}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          loading={loading}
          value={updateFormValues}
          updateType={updateType}
        />

      </PageHeaderWrapper>
    );
  }
}

Activity.propTypes = {};

export default Activity;
