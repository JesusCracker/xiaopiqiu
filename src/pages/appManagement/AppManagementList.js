import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Table,
  Upload,
  Icon,
  Select,
  TreeSelect,
} from 'antd';
import moment from 'moment';
import { Wrapper } from '@/utils/utils';
import styles from '@/pages/appManagement/appManagementList.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@connect(({ appManagement, loading }) => ({
  appManagement,
  loading: loading.models.appManagement,
}))
@Form.create()
class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      appName: null,
    };
  }

  handleUpload = (info) => {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      const appName = info.file.response.data;
      this.setState({
        appName,
      });
      message.success(`${info.file.name}上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name}上传失败`);
    }
  };

  render() {
    const { form, modalVisible, handleModalVisible, handleAdd, loading, form: { getFieldDecorator } } = this.props;
    const { fileList, appName } = this.state;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;

        handleAdd(fieldsValue, form, appName);
      });
    };

    const props = {
      name: 'file',
      action: 'http://www.xiaopiqiu.net:8090/file/upload',
    };


    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title="新建版本号"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="版本号">
          {getFieldDecorator('version', {
            rules: [{ required: true, message: '请输入版本号' }],
          })(<Input
            placeholder="版本号"
          />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否强制更新">
          {getFieldDecorator('mandatoryUpdate', {
            rules: [{ required: true, message: '请选择是否强制更新' }],
          })(
            <RadioGroup>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </RadioGroup>,
          )}
        </FormItem>

        <Row type='flex'>
          <Col span={12} offset={5}>
            <Upload {...props} onChange={this.handleUpload}>
              <Button>
                <Icon type="upload" />点击上传APK
              </Button>
            </Upload>
          </Col>
        </Row>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="更新说明" className={styles.notice}>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: '请输入更新说明' }],
          })(<Input
            placeholder="更新说明"
          />)}
        </FormItem>

      </Modal>
    );
  }
}


@connect(({ appManagement, loading }) => ({
  appManagement,
  loading: loading.models.appManagement,
}))
@Form.create()

class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {
    },
    handleUpdateModalVisible: () => {
    },
    currentRecord: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {
      form,
      updateModalVisible,
      handleUpdateModalVisible,
      handleUpdate,
      currentRecord,
      loading,
      form: { getFieldDecorator },
      appName,
      handleAppName,
    } = this.props;
    // const { appName } = this.state;
    // console.dir(appName)

    const { version, mandatoryUpdate, description, apkSrc, id } = currentRecord;

    const handleRemove = file => {
      handleAppName('noneAPPx');
    };

    const handleUpload = (info) => {
      if (info.file.status !== 'uploading') {

      }
      if (info.file.status === 'done') {
        handleAppName(info.file.response.data);
        message.success(`${info.file.name}上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}上传失败`);
      }
    };

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        if (currentRecord.id) {
          // console.dir(appName)
          handleUpdate(fieldsValue, id, form, appName || apkSrc);
        }
      });
    };
    const props = {
      name: 'file',
      action: 'http://www.xiaopiqiu.net:8090/file/upload',
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      defaultFileList: [],
    };

    if (apkSrc) {
      props.defaultFileList.push({
        uid: '1',
        name: apkSrc,
        status: 'done',
        // url: '',
      });
    }

    // 编辑菜单需要填的表单
    const menuForm = (
      <Form>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="版本号">
          {getFieldDecorator('version', {
            initialValue: version,
            rules: [{ required: true, message: '请输入版本号' }],
          })(<Input
            placeholder="版本号"
          />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否强制更新">
          {getFieldDecorator('mandatoryUpdate', {
            initialValue: mandatoryUpdate,
            rules: [{ required: true, message: '请选择是否强制更新' }],
          })(
            <RadioGroup>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <Row type='flex'>
          <Col span={12} offset={5}>
            <Upload {...props} onChange={handleUpload} onRemove={handleRemove}>
              <Button>
                <Icon type="upload" />点击上传APK
              </Button>
            </Upload>
          </Col>
        </Row>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="更新说明" className={styles.notice}>
          {getFieldDecorator('description', {
            initialValue: description,
            rules: [{ required: true, message: '请输入更新说明' }],
          })(<Input
            placeholder="更新说明"
          />)}
        </FormItem>
      </Form>
    );


    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title="编辑版本号"
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


@Form.create()
@connect(({ appManagement, loading }) => ({
  appManagement,
  loading: loading.models.appManagement,
}))
class AppManagementList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '版本ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '版本号',
        dataIndex: 'version',
        key: 'version',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'center',
        render: time => moment(time).format('YYYY-MM-DD HH:mm'),
      },
      {
        title: '是否强制更新',
        dataIndex: 'mandatoryUpdate',
        key: 'mandatoryUpdate',
        align: 'center',
        render: mandatoryUpdate => mandatoryUpdate === 1 ? '是' : '否',
      },
      {
        title: '更新说明',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => (
          <Wrapper>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          </Wrapper>
        ),
      },
    ];

    this.state = {
      appName: null,
      version: null,
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
      type: 'appManagement/fetch',
      payload: params,
    });
  }

  handleTableChange = (current) => {
    const { params, version } = this.state;
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
      version,
    };
    dispatch({
      type: 'appManagement/fetch',
      payload: { ...newParams, version },
    });
  };

  handleTableChangePageSize = (current, pageSize) => {
    const { params, version } = this.state;
    const { dispatch } = this.props;
    this.setState({
      params: {
        limit: pageSize,
      },
    });
    const newParams = {
      page: params.page,
      limit: pageSize,
      version,
    };
    dispatch({
      type: 'appManagement/fetch',
      payload: { ...newParams, version },
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
        type: 'appManagement/fetch',
        payload: { ...values },
      });
    });
  };

  handleModalVisible = flag => {
    const { dispatch } = this.props;

    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields, form, appName) => {
    const { dispatch } = this.props;
    const { params: { limit } } = this.state;
    const newParams = { ...fields };
    if (appName !== null) {
      newParams.apkSrc = appName;
    } else {
      newParams.apkSrc = '';
      message.error('请上传apk');
      return false;
    }
    dispatch({
      type: 'appManagement/saveAppInfo',
      payload: newParams,
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('新建模板成功');
        form.resetFields();
        this.handleModalVisible();
        dispatch({
          type: 'appManagement/fetch',
          payload: { page: 1, limit },
        });
      }
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    const { dispatch } = this.props;
    if (flag) {
      this.setState({
        appName: record.apkSrc,
      });
    }
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {},
    });
  };

  handleAppName = (name) => {
    this.setState({ appName: name });
  };

  //编辑后提交
  handleUpdate = (fields, id, form, appName) => {
    const { dispatch } = this.props;
    const { params: { limit, page } } = this.state;
    const newParams = { ...fields, id, apkSrc: appName };
    if (appName === 'noneAPPx') {
      message.error('请上传apk');
      return false;
    }
    newParams.apkSrc = appName;
    dispatch({
      type: 'appManagement/saveAppInfo',
      payload: newParams,
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('编辑APP成功');
        form.resetFields();
        this.handleUpdateModalVisible();
        dispatch({
          type: 'appManagement/fetch',
          payload: { page, limit },
        });
      }
    });
    return;
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="版本号">
              {getFieldDecorator('version')(<Input placeholder="版本号" />)}
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
                新增版本号
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { params, modalVisible, updateModalVisible, updateFormValues, appName } = this.state;
    const { appManagement, loading } = this.props;
    const { appManagementList: { data, dataTotal } } = appManagement;

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

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      handleAppName: this.handleAppName,
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
            currentRecord={updateFormValues}
            updateModalVisible={updateModalVisible}
            loading={loading}
            appName={appName}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

AppManagementList.propTypes = {};

export default AppManagementList;
