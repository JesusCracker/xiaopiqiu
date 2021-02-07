import React, { PureComponent } from 'react';
import { Table, Card, Form, Row, Col, Input, Select, Button, message, Modal, Icon, TreeSelect } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import { Wrapper } from '@/utils/utils';
import styles from './task.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ task, loading }) => ({
  task,
  loading: loading.models.task,
}))
@Form.create()

class UpdateForm extends PureComponent {
  static defaultProps = {
    menu: {
      parentsMenuData: [],
    },
    handleUpdate: () => {
    },
    handleUpdateModalVisible: () => {
    },
    currentRecord: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      nodeLevel: null,
      nodeKey: null,
    };
  }

  onUpdateSelectParentNode = (value, node) => {
    const { level, nodeKey } = node.props;

    this.setState({
      nodeLevel: level,
      nodeKey,
    });
  };

  render() {
    const {
      updateModalVisible,
      handleUpdateModalVisible,
      handleUpdate,
      form,
      currentRecord,
      loading,
      task: { msgList, tradeData },
    } = this.props;

    const { nodeLevel, nodeKey } = this.state;
    const tempList = msgList && msgList.length === 0 ? [] : msgList;
    // console.dir(currentRecord);

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        const fieldData = fieldsValue;
        if (currentRecord.id) {
          handleUpdate(fieldData, currentRecord.id, form);
        }
      });
    };


    // 新建菜单->选择父级菜单时的数据->格式化
    const formateData = data => {
      if (Array.isArray(data)) {
        return data.map(item => item.children
          ? {
            disabled: true,
            title: item.title,
            level: item.level,
            value: item.key,
            nodeKey: item.key,
            key: item.key + new Date().getTime(),
            children: formateData(item.children),
          }
          : {
            title: item.title,
            level: item.level,
            value: item.key,
            nodeKey: item.key,
            key: item.key + new Date().getTime(),
          });
      }
      return [];
    };

    //获取父级菜单
    const tradeListTree = tradeData && tradeData.length === 0 ? [] : formateData(tradeData);


    // 编辑菜单需要填的表单
    const menuForm = (
      <Form>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务名称">
          {form.getFieldDecorator('name', {
            initialValue: currentRecord.name,
            rules: [{ required: true, message: '请输入任务名称' }],
          })(<Input
            placeholder="任务名称"
          />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户类型">
          {form.getFieldDecorator('userType', {
            initialValue: currentRecord.userType,
            rules: [{ required: true, message: '请选择类型' }],
          })(
            <Select style={{ width: '100%' }} placeholder="请选择">
              <Option value={1}>企业</Option>
              <Option value={2}>个人</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="绑定模版">
          {form.getFieldDecorator('messageId', {
            initialValue: currentRecord.messageId,
            rules: [{ required: true, message: '请选择模版' }],
          })(
            <Select placeholder="请选择" style={{ width: '100%' }}>
              {tempList && tempList.map(item => (
                <Option value={item.id} key={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="绑定交易类型">
          {form.getFieldDecorator('tradeType', {
            initialValue: currentRecord.tradeType,
            rules: [{ required: true, message: '请选择交易类型' }],
          })(
            <TreeSelect
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={tradeListTree}
              placeholder="请选择"
              treeDefaultExpandAll
              onSelect={this.onUpdateSelectParentNode}
            />,
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="积分数量">
          {form.getFieldDecorator('amount', {
            initialValue: currentRecord.amount,
            rules: [{ required: true, message: '请输入积分数量' }],
          })(<Input
            placeholder="积分数量"
          />)}
        </FormItem>
      </Form>
    );


    return (
      <Modal
        maskClosable={false}
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="编辑菜单"
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible(false)}
        afterClose={() => handleUpdateModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >

        {menuForm}
      </Modal>
    );
  }
}

@connect(({ task, loading }) => ({
  task,
  loading: loading.models.task,
}))
@Form.create()
class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeLevel: null,
      nodeKey: null,
    };
  }

  onSelectParentNode = (value, node) => {
    const { level, nodeKey } = node.props;
    this.setState({
      nodeLevel: level,
      nodeKey,
    });
  };

  render() {
    const { form, modalVisible, handleModalVisible, handleAdd, loading, task: { msgList, tradeData } } = this.props;
    const { nodeLevel, nodeKey } = this.state;

    const tempList = msgList && msgList.length === 0 ? [] : msgList;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;

        const fieldData = fieldsValue;
        // fieldData.parentId = nodeKey;
        Object.keys(fieldsValue).forEach(key => {
          if (key === 'level') {
            fieldData[key] = nodeLevel + 1;
          }
        });
        handleAdd(fieldsValue, form);
      });
    };

    const formateData = data => {
      if (Array.isArray(data)) {
        return data.map(item => item.children
          ? {
            disabled: true,
            title: item.title,
            level: item.level,
            value: item.key,
            nodeKey: item.key,
            key: item.key + new Date().getTime(),
            children: formateData(item.children),
          }
          : {
            title: item.title,
            level: item.level,
            value: item.key,
            nodeKey: item.key,
            key: item.key + new Date().getTime(),
          });
      }
      return [];
    };
    const tradeListTree = tradeData && tradeData.length === 0 ? [] : formateData(tradeData);

    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title="创建任务基本类型"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务名称">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入任务名称' }],
          })(<Input
            placeholder="任务名称"
          />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户类型">
          {form.getFieldDecorator('userType', {
            rules: [{ required: true, message: '请选择类型' }],
          })(
            <Select style={{ width: '100%' }} placeholder="请选择">
              <Option value={1}>企业</Option>
              <Option value={2}>个人</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="绑定模版">
          {form.getFieldDecorator('messageId', {
            rules: [{ required: true, message: '请选择模版' }],
          })(
            <Select placeholder="请选择" style={{ width: '100%' }}>
              {tempList && tempList.map(item => (
                <Option value={item.id} key={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="绑定交易类型">
          {form.getFieldDecorator('tradeType', {
            rules: [{ required: true, message: '请选择交易类型' }],
          })(
            <TreeSelect
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={tradeListTree}
              placeholder="请选择"
              treeDefaultExpandAll
              onSelect={this.onSelectParentNode}
            />,
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="积分数量">
          {form.getFieldDecorator('amount', {
            rules: [{ required: true, message: '请输入积分数量' }],
          })(<Input
            placeholder="积分数量"
          />)}
        </FormItem>
      </Modal>
    );
  }
}

@Form.create()
@connect(({ task, loading }) => ({
  task,
  loading: loading.models.users,
}))
class Task extends PureComponent {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '类型ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'center',
        render: time => moment(time).format('YYYY-MM-DD'),
      },
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        onCell: () => ({
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        }),
      },
      {
        title: '类型名称',
        dataIndex: 'oneTradeTypeName',
        key: 'oneTradeTypeName',
        align: 'center',
      },
      {
        title: '用户类型',
        dataIndex: 'userType',
        key: 'userType',
        align: 'center',
        render: (type) => <span>{this.renderUserType(type)}</span>,
      },
      {
        title: '消息模版',
        dataIndex: 'messageId',
        key: 'messageId',
        align: 'center',
      },
      {
        title: '交易类型',
        dataIndex: 'tradeTypeName',
        key: 'tradeTypeName',
        align: 'center',
        render: (type) => <span>{this.renderTradeType(type)}</span>,
      },
      {
        title: '积分数量',
        dataIndex: 'amount',
        key: 'amount',
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
        title: '操作',
        align: 'center',
        render: (text, record) => (
          <Wrapper>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
            &nbsp;&nbsp;
            <a
              onClick={() => this.handleChangeStatusConfirm(record)}>{record.status && record.status === 1 ? '停用' : '启用'}</a>
          </Wrapper>
        ),
      },
    ];


    this.state = {
      name: null,
      modalVisible: false,
      updateModalVisible: false,
      updateFormValues: {},
      params: {
        page: 1,
        limit: 10,
      },
    };

  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.state;
    dispatch({
      type: 'task/fetchTaskList',
      payload: params,
    });
  }

  handleChangeStatusConfirm = record => {
    Modal.confirm({
      title: `确定${record.status && record.status === 1 ? '停用' : '启用'}该任务？`,
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
      type: 'task/changeTaskStatus',
      payload: { id, status: revertStatus, userType: 1 },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success(`${status === 1 ? '停用' : '启用'}成功`);
        dispatch({
          type: 'task/fetchTaskList',
          payload: { page, limit },
        });
      } else {
        message.error(`${status === 1 ? '停用' : '启用'}失败`);
      }
    });

  };

  handleTableChange = (current) => {
    const { params, name } = this.state;
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
      name,
    };
    dispatch({
      type: 'task/fetchTaskList',
      payload: { ...newParams, name },
    });
  };

  handleTableChangePageSize = (current, pageSize) => {
    const { params, name } = this.state;
    const { dispatch } = this.props;
    this.setState({
      params: {
        limit: pageSize,
      },
    });
    const newParams = {
      page: params.page,
      limit: pageSize,
      name,
    };
    dispatch({
      type: 'task/fetchTaskList',
      payload: { ...newParams, name },
    });
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

  renderUserType = (userType = '') => {
    // 类型：企业1；个人2
    if (userType === 1) {
      return '企业';
    }
    return '个人';
  };

  renderTradeType = (tradeTypeName) => {
    /*  if(tradeType===){

      }*/
    return tradeTypeName;
  };

  handleAdd = (fields, form) => {
    const { dispatch } = this.props;
    const { params: { limit } } = this.state;
    dispatch({
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
    });
  };

  handleModalVisible = flag => {
    const { dispatch } = this.props;
    if (flag) {
      //获取绑定模板下拉选项
      dispatch({
        type: 'task/fetchMsgList',
        payload: { page: 1, limit: 9999 },
      });

      //获取绑定交易类型
      dispatch({
        type: 'task/fetchTradeData',
      });
    }


    this.setState({
      modalVisible: !!flag,
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
        type: 'task/fetchTaskList',
        payload: { ...values },
      });
    });
  };

  renderMessage = content => {
    message.error(content);
  };

  handleUpdateModalVisible = (flag, record) => {
    const { dispatch } = this.props;
    if (flag) {
      dispatch({
        type: 'task/fetchMsgList',
        payload: { page: 1, limit: 9999 },
      });

      //获取绑定交易类型
      dispatch({
        type: 'task/fetchTradeData',
      });
    }
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {},
    });
  };

  //编辑后提交
  handleUpdate = (fields, id, form) => {
    const { dispatch } = this.props;
    const { params: { limit, page } } = this.state;
    dispatch({
      type: 'task/saveTaskInfo',
      payload: {
        ...fields,
        id,
      },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('编辑任务成功');
        form.resetFields();
        this.handleUpdateModalVisible();
        dispatch({
          type: 'task/fetchTaskList',
          payload: { page, limit },
        });
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
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务名称">
              {getFieldDecorator('name')(<Input placeholder="任务名称" />)}
            </FormItem>
          </Col>

          <Col md={4} sm={24}>
            <Button htmlType="submit">
              搜索
            </Button>
          </Col>
          <Col md={14} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.handleModalVisible(true)}>
                创建任务类型
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {

    const { task, loading } = this.props;
    const { taskList: { data, dataTotal } } = task;
    const { params, modalVisible, updateModalVisible, updateFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
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

      <PageHeaderWrapper title="查询表格">
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              loading={loading}
              dataSource={data}
              columns={this.columns}
              rowKey={result => result.id}
              pagination={paginationProps}

            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} loading={loading} />
        {updateFormValues && Object.keys(updateFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            currentRecord={updateFormValues}
            updateModalVisible={updateModalVisible}
            loading={loading}
          />
        ) : null}

      </PageHeaderWrapper>
    );
  }
}

Task.propTypes = {};

export default Task;
