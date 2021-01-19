import React, { PureComponent } from 'react';
import { Table, Card, Form, Row, Col, Input, Button, message, Modal, Radio } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Wrapper } from '@/utils/utils';
import moment from 'moment';
import styles from '@/pages/messageManagement/announcementList.less';

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
        title="新增模板"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模板名称">
          {form.getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入模板名称' }],
          })(<Input placeholder="请输入名称" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模板内容">
          {form.getFieldDecorator('comment', {
            rules: [{ required: true, message: '请输入模板内容' }],
          })(<TextArea rows={4} placeholder="请输入模板内容" />)}
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
        title="编辑模板"
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模板名称">
          {form.getFieldDecorator('title', {
            initialValue: title,
            rules: [{ required: true, message: '请输入模板名称' }],
          })(<Input placeholder="请输入模板名称" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模板内容">
          {form.getFieldDecorator('comment', { initialValue: comment , rules: [{ required: true, message: '请输入模板内容' }],})(<TextArea placeholder="请输入模板内容" />)}
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
class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '模板ID',
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
        title: '模版名称',
        dataIndex: 'title',
        key: 'title',
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
        title: '模版内容',
        dataIndex: 'comment',
        key: 'comment',
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
        title: '创建时间',
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
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
          </Wrapper>
        ),
      },
    ];

    this.state = {
      comment: null,
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
    const { params, comment } = this.state;

    dispatch({
      type: 'message/fetchMsg',
      payload: { ...params, comment },
    });

  }

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {},
    });
  };

  handleUpdate = (fields, id, form) => {
    const { dispatch } = this.props;
    const params = { ...fields, id };
    const { params: { limit,page } } = this.state;
    dispatch({
      type: 'message/saveTemp',
      payload: { ...params },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('修改成功');
        form.resetFields();
        this.handleUpdateModalVisible();
        dispatch({
          type: 'message/fetchMsg',
          payload: { page, limit },
        });
      }
    });

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
      type: 'message/fetchMsg',
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
      type: 'message/fetchMsg',
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
        type: 'message/fetchMsg',
        payload: { ...values },
      });
    });
  };

  handleAdd = (fields, form) => {
    const { dispatch } = this.props;
    const { params: { limit } } = this.state;
    dispatch({
      type: 'message/saveTemp',
      payload: { ...fields },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('新增模板成功');
        form.resetFields();
        this.handleModalVisible();
        dispatch({
          type: 'message/fetchMsg',
          payload: { page: 1, limit },
        });
      }
    });
  };

  handleModalVisible = flag => {
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
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="通知内容">
              {getFieldDecorator('comment')(<Input placeholder="输入模板内容" />)}
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
                新增模板
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { message: { msgList }, loading } = this.props;
    const { data, dataTotal } = msgList;
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
        />
      </PageHeaderWrapper>
    );
  }
}

MessageList.propTypes = {};

export default MessageList;
