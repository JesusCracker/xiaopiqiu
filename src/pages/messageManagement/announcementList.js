import React, { PureComponent } from 'react';
import { Table, Card, Form, Row, Col, Input, Button, message, Modal, Radio } from 'antd';
import { connect } from 'dva';
import { Wrapper } from '@/utils/utils';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './announcementList.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ message, loading }) => ({
  message,
  loading: loading.models.message,
}))
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
        title="新增公告"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公告标题">
          {form.getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入公告标题' }],
          })(<Input placeholder="请输入标题" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户类型">
          {form.getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择用户类型' }],
          })(
            <Radio.Group>
              <Radio value={1}>企业</Radio>
              <Radio value={2}>个人</Radio>
              <Radio value={3}>全部</Radio>
            </Radio.Group>,
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公告内容">
          {form.getFieldDecorator('comment', {})(<TextArea
            placeholder="请输入"
            maxLength={200}
            style={{
              width: '100%',
              resize: 'none',
            }}
            rows={5}
          />)}
        </FormItem>
      </Modal>
    );
  }
}


@connect(({ message, loading }) => ({
  message,
  loading: loading.models.message,
  // loading: loading.effects['message/save'],
}))
@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {
    },
    handleUpdateModalVisible: () => {
    },
    values: {},
    loading: true,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      updateModalVisible,
      handleUpdateModalVisible,
      handleUpdate,
      values,
      form,
      loading,
      updateType,
    } = this.props;

    const { id, type, title, comment } = values;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (values.id) {
          handleUpdate(fieldsValue, values.id, form);
        }
      });
    };

    return (
      <Modal
        maskClosable={false}
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title={updateType&&updateType===2?"编辑公告":'查看公告'}
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
        footer={
          // 设置footer为空，去掉 取消 确定默认按钮
          updateType&&updateType===2?[
            <Button key="back" onClick={() => handleUpdateModalVisible(false, values,updateType)}>取消</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={okHandle}>确定</Button>,
          ]:[]
        }
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公告标题">
          {form.getFieldDecorator('title', {
            initialValue: title,
            rules: [{ required: true, message: '请输入公告标题' }],
          })(<Input placeholder="请输入标题" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户类型">
          {form.getFieldDecorator('type', {
            initialValue: type,
            rules: [{ required: true, message: '请选择用户类型' }],
          })(
            <Radio.Group>
              <Radio value={1}>企业</Radio>
              <Radio value={2}>个人</Radio>
              <Radio value={3}>全部</Radio>
            </Radio.Group>,
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公告内容">
          {form.getFieldDecorator('comment', { initialValue: comment })(<TextArea
            maxLength={200}
            style={{
              width: '100%',
              resize: 'none',
            }}
            rows={5}
            placeholder="请输入"
          />)}
        </FormItem>
      </Modal>
    );

  }
}


@connect(({ message, loading }) => ({
  message,
  loading: loading.models.message,
}))
@Form.create()
class AnnouncementList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '公告ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '发布者',
        dataIndex: 'createUserName',
        key: 'createUserName',
        align: 'center',
      },
      {
        title: '公告标题',
        dataIndex: 'title',
        key: 'title',
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
        title: '公告内容',
        dataIndex: 'comment',
        key: 'comment',
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
        title: '用户类型',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        render: val => <span>{this.getUserTypeByKeys(val)}</span>,
      },
      {
        title: '发布时间',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'center',
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: val => <span>{this.getStatusStringByKeys(val)}</span>,
      },

      {
        title: '操作',
        align: 'center',
        render: (text, record) => {
          if (record.status === 2) {
            return (
              <Wrapper>
                <a onClick={() => this.handleUpdateModalVisible(true, record, record.status)}>修改</a>
                &nbsp;&nbsp;
                <a onClick={() => this.handlePublishConfirm(record)}>发布</a>
              </Wrapper>
            );
          }
          return (
            <Wrapper>
              <a onClick={() => this.handleUpdateModalVisible(true, record, record.status)}>查看</a>
              &nbsp;&nbsp;
              <a onClick={() => this.handlePublishRemoved(record)}>删除</a>
            </Wrapper>
          );

        },
      },
    ];

    this.state = {
      comment: null,
      modalVisible: false,
      updateModalVisible: false,
      updateFormValues: {},
      updateType:null,
      params: {
        page: 1,
        limit: 10,
      },
    };

  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params, comment } = this.state;

    dispatch({
      type: 'message/fetch',
      payload: { ...params, comment },
    });

  }

  handleUpdateModalVisible = (flag, record, modalType) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {},
      updateType: modalType,
    });
  };

  handleUpdate = (fields, id, form) => {
    const { dispatch } = this.props;
    const params = { ...fields, id };
    const { params: { limit, page } } = this.state;
    dispatch({
      type: 'message/save',
      payload: { ...params },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('修改成功');
        form.resetFields();
        this.handleUpdateModalVisible();
        dispatch({
          type: 'message/fetch',
          payload: { page, limit },
        });
      }
    });

  };

  handlePublishConfirm = record => {
    Modal.confirm({
      title: '确定发布该公告吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.handlePublish(record);
      },
    });
  };


  handlePublishRemoved = record => {
    Modal.confirm({
      title: '确定删除该公告吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.handleRemoved(record);
      },
    });
  };


  handleRemoved = record => {
    const { dispatch } = this.props;
    const { id } = record;
    const { params: { limit, page }, type } = this.state;
    dispatch({
      type: 'message/removedById',
      payload: id,
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('删除成功');
        dispatch({
          type: 'message/fetch',
          payload: { page, limit, type },
        });
      } else {
        message.error('删除失败');
      }
    });
  };

  handlePublish = record => {
    const { dispatch } = this.props;
    const { id } = record;
    const { params: { limit, page }, type } = this.state;
    dispatch({
      type: 'message/publishedById',
      payload: id,
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('发布成功');
        dispatch({
          type: 'message/fetch',
          payload: { page, limit, type },
        });
      } else {
        message.error('发布失败');
      }
    });
  };

  getStatusStringByKeys = (statusNumber) => {
    // 发布1；!发布2
    let statusString = '';
    if (statusNumber && typeof statusNumber === 'number') {
      if (statusNumber === 1) {
        statusString = '已发布';
      } else {
        statusString = '未发布';
      }
    }
    return statusString;
  };

  getUserTypeByKeys = (typeNumber) => {
    // 企业1；个人2
    let typeString = '';
    if (typeNumber && typeof typeNumber === 'number') {
      if (typeNumber === 1) {
        typeString = '企业';
      } else {
        typeString = '个人';
      }
    }
    return typeString;
  };

  handleTableChange = (current) => {
    const { params, comment } = this.state;
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
      comment,
    };
    dispatch({
      type: 'message/fetch',
      payload: { ...newParams, comment },
    });
  };

  handleTableChangePageSize = (current, pageSize) => {
    const { params, comment } = this.state;
    const { dispatch } = this.props;
    this.setState({
      params: {
        limit: pageSize,
      },
    });
    const newParams = {
      page: params.page,
      limit: pageSize,
      comment,
    };
    dispatch({
      type: 'message/fetch',
      payload: { ...newParams, comment },
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
        type: 'message/fetch',
        payload: { ...values },
      });
    });
  };

  handleAdd = (fields, form) => {

    const { dispatch } = this.props;
    const { params: { limit } } = this.state;
    dispatch({
      type: 'message/save',
      payload: { ...fields },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('新增成功');
        form.resetFields();
        this.handleModalVisible();
        dispatch({
          type: 'message/fetch',
          payload: { page: 1, limit },
        });
      }
    });
    // this.handleModalVisible();
  };

  handleModalVisible = flag => {
    const { dispatch } = this.props;
    this.setState({
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
          <Col md={8} sm={24}>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公告内容">
              {getFieldDecorator('comment')(<Input placeholder="公告内容" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <Button htmlType="submit">
              搜索
            </Button>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.handleModalVisible(true)}>
                新增公告
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { message: { messageList }, loading } = this.props;
    const { data, dataTotal } = messageList;
    const { params, modalVisible, updateModalVisible, updateFormValues,updateType } = this.state;

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
        <UpdateForm
          {...updateMethods}
          updateModalVisible={updateModalVisible}
          values={updateFormValues}
          loading={loading}
          updateType={updateType}
        />
      </PageHeaderWrapper>
    );
  }
}

AnnouncementList.propTypes = {};

export default AnnouncementList;
