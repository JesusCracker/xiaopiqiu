import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Table, Card, Form, Row, Col, Input, Button, Select, message, Modal, Icon, Tabs } from 'antd';
import { Wrapper } from '@/utils/utils';
import moment from 'moment';
import styles from '@/pages/userManagement/EnterpriseList.less';
import { treeData } from '@/global';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;

class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.scoreColumns = [
      {
        title: '交易类型',
        dataIndex: 'tradeTypeName',
        key: 'tradeTypeName',
        align: 'center',
      },
      {
        title: '明细',
        dataIndex: 'tradeDetail',
        key: 'tradeDetail',
        align: 'center',
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
        render: (text, record) => <span>{this.renderAmount(record)}</span>,
      },
      {
        title: '时间',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'center',
        render: text => moment(text).format('YYYY-MM-DD'),
      },
    ];
    this.goldenColumns = [
      {
        title: '金币类型',
        dataIndex: 'tradeTypeName',
        key: 'tradeTypeName',
        align: 'center',
      },
      {
        title: '明细',
        dataIndex: 'tradeDetail',
        key: 'tradeDetail',
        align: 'center',
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
        render: (text, record) => <span>{this.renderAmount(record)}</span>,
      },
      {
        title: '时间',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'center',
        render: text => moment(text).format('YYYY-MM-DD'),
      },
    ];
    this.state = {
      pointType: 1,
    };
  }

  renderAmount = (record) => {
    if (Object.keys(record).length > 0 && 'inOrOut' in record) {
      const { inOrOut, amount } = record;
      if (inOrOut === 1) {
        return amount;
      }
      return `-${amount}`;
    }
  };

  render() {
    const {
      updateModalVisible,
      handleUpdateModalVisible,
      values,
      loading,
      handleUpdatePointType,
      listParams,
      tradeListData,
      tradeListDataTotal,

    } = this.props;
    // console.dir(tradeListData)

    const { pointType } = this.state;

    const { id, userAccount, userName, goldCoin, points } = values;


    const callback = (key) => {
      this.setState({
        pointType: key,
      });
      handleUpdatePointType(key, listParams, id);
    };


    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: () => `共${tradeListDataTotal}条`,
      current: listParams.page,
      pageSize: listParams.limit,
      total: tradeListDataTotal,
      pageSizeOptions: ['5', '10', '15', '20'],
      onChange: (current) => handleUpdatePointType(pointType, { page: current, limit: listParams.limit }, id),
      onShowSizeChange: (current, pageSize) => handleUpdatePointType(pointType, { page: current, limit: pageSize }, id),

    };


    return (
      <Modal
        maskClosable={false}
        width={780}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title='企业信息'
        visible={updateModalVisible}
        onOk={() => {
        }}
        onCancel={() => handleUpdateModalVisible()}
        okText="确定"
        cancelText="关闭"
        confirmLoading={loading}
      >
        <Card title="企业基本信息">
          <Row type="flex">
            <Col span={24} order={12} className={styles.setDistance}>
              企业名称：{userName}
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24} order={12}>
              企业账号：{userAccount}
            </Col>
          </Row>
        </Card>
        <br />
        <Card title="企业资金信息">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="积分信息" key="1">
              <Row type="flex">
                <Col span={24} order={12} className={styles.setDistance}>
                  积分累计：{points}
                </Col>
              </Row>
              <Table
                loading={loading}
                dataSource={tradeListData}
                columns={this.scoreColumns}
                rowKey={result => result.id}
                pagination={paginationProps}
                scroll={{ x: 'max-content' }}
              />
            </TabPane>
            <TabPane tab="金币信息" key="2">
              <Row type="flex">
                <Col span={24} order={12} className={styles.setDistance}>
                  金币累计：{goldCoin}
                </Col>
              </Row>
              <Table
                loading={loading}
                dataSource={tradeListData}
                columns={this.goldenColumns}
                rowKey={result => result.id}
                pagination={paginationProps}
                scroll={{ x: 'max-content' }}
              />
            </TabPane>
          </Tabs>
        </Card>
      </Modal>
    );

  }
}

@Form.create()
class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { form, modalVisible, handleModalVisible, handleAdd, loading } = this.props;


    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        const addValue = {
          ...fieldsValue,
        };
        handleAdd(addValue, form);
      });
    };

    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title="企业基本信息"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="企业名称">
          {form.getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入企业名称' }],
          })(<Input
            prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="企业名称"
          />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="企业账号">
          {form.getFieldDecorator('userAccount', {
            rules: [{ required: true, message: '请输入企业账号' }],
          })(<Input
            prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="企业账号"
          />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="登录密码">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入登录密码' }],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="请输入密码"
          />)}
        </FormItem>
      </Modal>
    );
  }
}

@Form.create()
@connect(({ userManagement, loading }) => ({
  userManagement,
  loading: loading.models.userManagement,
}))
class EnterpriseList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '企业ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (text, record) => <span>{this.renderEnterpriseID(record)}</span>,
      },
      {
        title: '企业名称',
        dataIndex: 'userName',
        key: 'userName',
        align: 'center',
        onCell: () => ({
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow:'ellipsis',
            cursor:'pointer'
          }
        }),
      },
      {
        title: '积分',
        dataIndex: 'points',
        key: 'points',
        align: 'center',
      },
      {
        title: '金币',
        dataIndex: 'goldCoin',
        key: 'goldCoin',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: val => <span>{this.renderStatus(val)}</span>,
      },
      {
        title: '注册时间',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'center',
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },

      {
        title: '操作',
        align: 'center',
        render: (text, record) => (
          <Wrapper>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>查看</a>
            &nbsp;&nbsp;
            <a
              onClick={() => this.handleChangeStatusConfirm(record)}>{record.status && record.status === 1 ? '停用' : '启用'}</a>
            &nbsp;&nbsp;
          </Wrapper>
        ),
      },
      /*  {
          title: '时间',
          dataIndex: 'updated_at',
          key: 'updated_at',
          render: text => moment(text).format('YYYY-MM-DD'),
        },*/
    ];
    this.state = {
      userName: null,
      modalVisible: false,
      updateModalVisible: false,
      updateFormValues: {},
      // 积分or金币：1积分；2金币
      pointType: 1,
      params: {
        page: 1,
        limit: 10,
      },
      listParams: {
        page: 1,
        limit: 5,
      },
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params, userName } = this.state;

    dispatch({
      type: 'userManagement/fetchEnterpriseList',
      payload: { ...params, userName },
    });

  }

  renderEnterpriseID = (record) => {
    if (Object.keys(record).length > 0 && 'displayId' in record) {
      const { displayId } = record;
      return displayId;
    }
  };

  renderStatus = (status) => {
    // 状态：1启用；2停用
    let stringStatus = '';
    if (status !== null && (typeof status === 'number')) {
      if (status === 1) {
        stringStatus = '启用中';
      } else if (status === 2) {
        stringStatus = '已停用';
      }
    }
    return stringStatus;
  };

  handleTableChange = (current) => {
    const { params, userName } = this.state;
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
      userName,
    };
    dispatch({
      type: 'userManagement/fetchEnterpriseList',
      payload: { ...newParams, userName },
    });
  };

  handleTableChangePageSize = (current, pageSize) => {
    const { params, userName } = this.state;
    const { dispatch } = this.props;
    this.setState({
      params: {
        limit: pageSize,
      },
    });
    const newParams = {
      page: params.page,
      limit: pageSize,
      userName,
    };
    dispatch({
      type: 'userManagement/fetchEnterpriseList',
      payload: { ...newParams, userName },
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
        type: 'userManagement/fetchEnterpriseList',
        payload: { ...values },
      });
    });
  };

  handleAdd = (fields, form) => {
    const { dispatch } = this.props;
    const { params: { limit } } = this.state;
    dispatch({
      type: 'userManagement/saveEnterpriseInfo',
      payload: { ...fields },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('添加成功');
        form.resetFields();
        this.handleModalVisible();
        dispatch({
          type: 'userManagement/fetchEnterpriseList',
          payload: { page: 1, limit },
        });
      }
    });
  };

  handleModalVisible = flag => {
    const { dispatch } = this.props;
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    const { dispatch } = this.props;
    const { pointType, listParams } = this.state;

    if (flag) {
      dispatch({
        type: 'userManagement/fetchTradeList',
        payload: { userId: record.id, pointType, ...listParams },
      });
    }
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {},
    });
  };

  handleUpdatePointType = (pointType, listParams, id) => {
    const { dispatch } = this.props;
    let params;
    this.setState({
      pointType,
      listParams,
    });

    if (pointType === 1) {
      params = { ...listParams, pointType, userId: id };
    } else {
      params = { ...listParams, pointType, userId: id };
    }
    dispatch({
      type: 'userManagement/fetchTradeList',
      payload: params,
    });


  };

  handleChangeStatusConfirm = record => {
    Modal.confirm({
      title: `确定${record.status && record.status === 1 ? '停用' : '启用'}该企业用户？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.handleChangeStatus(record);
      },
    });
  };

  handleChangeStatus = record => {
    const { dispatch } = this.props;
    const { id, status } = record;
    let revertStatus = null;
    if (status && Number.isInteger(status)) {
      revertStatus = (status === 1) ? 2 : 1;
    }
    const { params: { limit, page } } = this.state;
    dispatch({
      type: 'userManagement/changeEnterpriseStatus',
      payload: { id, status: revertStatus, userType: 1 },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success(`${status === 1 ? '停用' : '启用'}成功`);
        dispatch({
          type: 'userManagement/fetchEnterpriseList',
          payload: { page, limit },
        });
      } else {
        message.error(`${status === 1 ? '停用' : '启用'}失败`);
      }
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
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="企业名称">
              {getFieldDecorator('userName')(<Input placeholder="企业名称" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="企业状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择">
                  <Option value={1}>启用</Option>
                  <Option value={2}>停用</Option>
                </Select>)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <Button htmlType="submit">
              搜索
            </Button>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.handleModalVisible(true)}>
                新增企业
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { userManagement, loading } = this.props;
    const { enterpriseList: { data, dataTotal }, tradeList } = userManagement;
    // console.dir(tradeList)
    const tradeListData = tradeList.data;
    const tradeListDataTotal = tradeList.dataTotal;
    const { params, modalVisible, updateModalVisible, updateFormValues, pointType, listParams } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdatePointType: this.handleUpdatePointType,

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
        <CreateForm {...parentMethods} modalVisible={modalVisible} loading={loading} />
        {updateFormValues && Object.keys(updateFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={updateFormValues}
            loading={loading}
            listParams={listParams}
            tradeListData={tradeListData}
            tradeListDataTotal={tradeListDataTotal}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

EnterpriseList.propTypes = {};

export default EnterpriseList;
