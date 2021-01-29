import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button, Card, Col, Form, Input, message, Modal, Row, Select, Table, Radio, Upload, Icon } from 'antd';
import { Wrapper } from '@/utils/utils';
import BraftEditor from 'braft-editor';
import { imgUrlPath } from '@/global';
import styles from './template.less';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ template, loading }) => ({
  template,
  loading: loading.models.template,
}))
@Form.create()
class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: false,
      fileList: [],
      imageURL: null,
    };
  }

  handleUpload = (info) => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.append('file', fileList[0]);
    if (info.file.status === 'done') {
      this.setState({
        imageLoading: true,
      });
      fetch('http://www.xiaopiqiu.net:8090/file/upload', {
        method: 'POST',
        headers: {
          credentials: 'same-origin',
        },
        body: formData,

      })
        .then(response => response.json())
        .catch(error => {
          this.setState({
            imageLoading: false,
          });
          message.fail('图片上传失败');
        })
        .then(response => {
          this.setState({
            fileList: [],
            imageLoading: false,
          });
          message.success('图片上传成功');
          this.setState({
            imageURL: response.data,
          });
        });
    }
  };


  render() {

    const { form, modalVisible, handleModalVisible, handleAdd, loading, template: { enterpriseList } } = this.props;
    const { imageURL, imageLoading, fileList } = this.state;
    const props = {
      name: 'file',
      listType: 'picture-card',
      className: 'avatar-uploader',
      showUploadList: false,

      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },

      beforeUpload: file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('只能传JPG/PNG文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('图片文件必须小于2MB!');
        }

        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        // return false;
      },
      fileList,

    };
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media'];

    const okHandle = () => {

      form.validateFields((err, fieldsValue) => {
        if (err) return;

        handleAdd(fieldsValue, form, imageURL);
      });
    };

    const uploadButton = (
      <div>
        <Icon type={imageLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">选择红包图上传</div>
      </div>
    );

    return (
      <Modal
        maskClosable={false}
        width={1000}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="创建模板"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <Card title="红包基本信息">
          <Row type="flex">
            <Col span={12} className={styles.setDistance}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="红包标题">
                {form.getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入红包标题' }],
                })(<Input
                  placeholder="红包标题"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="运营公司">
                {form.getFieldDecorator('comUserId', {
                  rules: [{ required: true, message: '请选择运营公司' }],
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    {Array.isArray(enterpriseList) && enterpriseList.length !== 0 && enterpriseList.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.userName}
                      </Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="红包价值">
                {form.getFieldDecorator('honbaoValue', {
                  rules: [{ required: true, message: '请输入红包价值' }],
                })(<Input
                  placeholder="单位：元"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="申请数量">
                {form.getFieldDecorator('appAmount', {
                  rules: [{ required: true, message: '请输入申请数量' }],
                })(<Input
                  placeholder="单位：次"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所需积分">
                {form.getFieldDecorator('appPoint', {
                  rules: [{ required: true, message: '请输入所需积分' }],
                })(<Input
                  placeholder="单位：个"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="间隔时间">
                {form.getFieldDecorator('intervals', {
                  rules: [{ required: true, message: '请输入间隔时间' }],
                })(<Input
                  placeholder="单位：秒"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 14 }} label="个人是否可多次申请">
                {form.getFieldDecorator('mulApplication', {
                  rules: [{ required: true, message: '请选择个人是否可多次申请' }],
                })(
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </Radio.Group>,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="中奖方式">
                {form.getFieldDecorator('winningMethod', {
                  rules: [{ required: true, message: '请选择类型' }],
                })(
                  <Select style={{ width: '100%' }} placeholder="请选择">
                    <Option value={1}>系统抽奖</Option>
                    <Option value={2}>人工抽奖</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="发放方式">
                {form.getFieldDecorator('distributionMethod', {
                  rules: [{ required: true, message: '请选择发放方式' }],
                })(
                  <Select style={{ width: '100%' }} placeholder="请选择">
                    <Option value={1}>系统发放</Option>
                    <Option value={2}>手动发放</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
        </Card>
        <br />
        <Card title="红包图片信息">
          <Row type="flex">
            <Col span={12}>
              <div>
                <Upload {...props} onChange={this.handleUpload}>
                  {imageURL ? <img src={imgUrlPath + imageURL} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              </div>
            </Col>
          </Row>
        </Card>
        <br />
        <Card title="红包详情介绍">
          <Row type="flex">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>

              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="详细描述">
                {form.getFieldDecorator('detailDescription', {
                  rules: [{
                    required: true,
                    message: '请输入详细描述',
                  }],
                })(
                  <BraftEditor
                    className={styles.myEditor}
                    controls={controls}
                    placeholder="请输入详细描述"
                    contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
                  />,
                )}
              </FormItem>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>

              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="赠送方式介绍">
                {form.getFieldDecorator('giveIntroduction', {
                  rules: [{
                    required: true,
                    message: '请输入赠送方式介绍',
                  }],
                })(
                  <BraftEditor
                    className={styles.myEditor}
                    controls={controls}
                    placeholder="请输入赠送方式介绍"
                    contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
                  />,
                )}
              </FormItem>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>

              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="发放方式介绍">
                {form.getFieldDecorator('sendIntroduction', {
                  rules: [{
                    required: true,
                    message: '请输入发放方式介绍',
                  }],
                })(
                  <BraftEditor
                    className={styles.myEditor}
                    controls={controls}
                    placeholder="请输入发放方式介绍"
                    contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Modal>
    );
  }
}


@connect(({ template, loading }) => ({
  template,
  loading: loading.models.template,
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
    this.state = {
      imageLoading: false,
      fileList: [],
      imageURL: null,
    };
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
      handleImageUrl,
      template: { enterpriseList },
      imageURL,
    } = this.props;


    const { id, comUserId, title, honbaoValue, appAmount, appPoint, intervals, mulApplication, winningMethod, distributionMethod, image, detailDescription, giveIntroduction, sendIntroduction } = values;
    /*    if(image){
          handleImageUrl(image)
        }*/
    const { imageLoading, fileList } = this.state;

    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media'];

    const handleUpload = (info) => {
      const formData = new FormData();
      formData.append('file', fileList[0]);
      if (info.file.status === 'done') {
        this.setState({
          imageLoading: true,
        });
        fetch('http://www.xiaopiqiu.net:8090/file/upload', {
          method: 'POST',
          headers: {
            credentials: 'same-origin',
          },
          body: formData,

        })
          .then(response => response.json())
          .catch(error => {
            this.setState({
              imageLoading: false,
            });
            message.fail('图片上传失败');
          })
          .then(response => {
            this.setState({
              fileList: [],
              imageLoading: false,
            });
            message.success('图片上传成功');
            /*      this.setState({
                    imageURL: response.data,
                  });*/
            handleImageUrl(response.data);
          });
      }
    };

    const props = {
      name: 'file',
      listType: 'picture-card',
      className: 'avatar-uploader',
      showUploadList: false,

      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },

      beforeUpload: file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('只能传JPG/PNG文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('图片文件必须小于2MB!');
        }

        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        // return false;
      },
      fileList,

    };

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();

        if (values.id) {
          handleUpdate(fieldsValue, values.id, form, imageURL || image);
        }
      });
    };
    const uploadButton = (
      <div>
        <Icon type={imageLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">选择红包图上传</div>
      </div>
    );

    return (
      <Modal
        maskClosable={false}
        width={1000}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title={updateType && updateType === 2 ? '编辑模板' : '查看模板'}
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
        footer={
          // 设置footer为空，去掉 取消 确定默认按钮
          updateType && updateType === 2 ? [
            <Button key="back" onClick={() => handleUpdateModalVisible(false, values, updateType)}>取消</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={okHandle}>确定</Button>,
          ] : []
        }
      >
        <Card title="红包基本信息">
          <Row type="flex">
            <Col span={12} className={styles.setDistance}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="红包标题">
                {form.getFieldDecorator('title', {
                  initialValue: title,
                  rules: [{ required: true, message: '请输入红包标题' }],
                })(<Input
                  placeholder="红包标题"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="运营公司">
                {form.getFieldDecorator('comUserId', {
                  initialValue: comUserId,
                  rules: [{ required: true, message: '请选择运营公司' }],
                })(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    {Array.isArray(enterpriseList) && enterpriseList.length !== 0 && enterpriseList.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.userName}
                      </Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="红包价值">
                {form.getFieldDecorator('honbaoValue', {
                  initialValue: honbaoValue,
                  rules: [{ required: true, message: '请输入红包价值' }],
                })(<Input
                  placeholder="单位：元"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="申请数量">
                {form.getFieldDecorator('appAmount', {
                  initialValue: appAmount,
                  rules: [{ required: true, message: '请输入申请数量' }],
                })(<Input
                  placeholder="单位：次"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所需积分">
                {form.getFieldDecorator('appPoint', {
                  initialValue: appPoint,
                  rules: [{ required: true, message: '请输入所需积分' }],
                })(<Input
                  placeholder="单位：个"
                />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="间隔时间">
                {form.getFieldDecorator('intervals', {
                  initialValue: intervals,
                  rules: [{ required: true, message: '请输入间隔时间' }],
                })(<Input
                  placeholder="单位：秒"
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 14 }} label="个人是否可多次申请">
                {form.getFieldDecorator('mulApplication', {
                  initialValue: mulApplication,
                  rules: [{ required: true, message: '请选择个人是否可多次申请' }],
                })(
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </Radio.Group>,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="中奖方式">
                {form.getFieldDecorator('winningMethod', {
                  initialValue: winningMethod,
                  rules: [{ required: true, message: '请选择类型' }],
                })(
                  <Select style={{ width: '100%' }} placeholder="请选择">
                    <Option value={1}>系统抽奖</Option>
                    <Option value={2}>人工抽奖</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="发放方式">
                {form.getFieldDecorator('distributionMethod', {
                  initialValue: distributionMethod,
                  rules: [{ required: true, message: '请选择发放方式' }],
                })(
                  <Select style={{ width: '100%' }} placeholder="请选择">
                    <Option value={1}>系统发放</Option>
                    <Option value={2}>手动发放</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
        </Card>
        <br />
        <Card title="红包图片信息">
          <Row type="flex">
            <Col span={12}>
              <div>
                <Upload {...props} onChange={handleUpload}>
                  {imageURL ? (<img src={imgUrlPath + imageURL} alt="image" style={{ width: '100%' }} />) : (image ?
                    <img src={imgUrlPath + image} alt="avatar" style={{ width: '100%' }} /> : uploadButton)}
                </Upload>
              </div>
            </Col>
          </Row>
        </Card>
        <br />
        <Card title="红包详情介绍">
          <Row type="flex">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="详细描述">
                {form.getFieldDecorator('detailDescription', {
                  initialValue: BraftEditor.createEditorState(detailDescription),
                  rules: [{
                    required: true,
                    message: '请输入详细描述',
                  }],
                })(
                  <BraftEditor
                    className={styles.myEditor}
                    controls={controls}
                    placeholder="请输入详细描述"
                    contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
                  />,
                )}
              </FormItem>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="赠送方式介绍">
                {form.getFieldDecorator('giveIntroduction', {
                  initialValue: BraftEditor.createEditorState(giveIntroduction),
                  rules: [{
                    required: true,
                    message: '请输入赠送方式介绍',
                  }],
                })(
                  <BraftEditor
                    className={styles.myEditor}
                    controls={controls}
                    placeholder="请输入赠送方式介绍"
                    contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
                  />,
                )}
              </FormItem>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="发放方式介绍">
                {form.getFieldDecorator('sendIntroduction', {
                  initialValue: BraftEditor.createEditorState(sendIntroduction),
                  rules: [{
                    required: true,
                    message: '请输入发放方式介绍',
                  }],
                })(
                  <BraftEditor
                    className={styles.myEditor}
                    controls={controls}
                    placeholder="请输入发放方式介绍"
                    contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Modal>
    );

  }
}

@Form.create()
@connect(({ template, loading }) => ({
  template,
  loading: loading.models.template,
}))
class Template extends PureComponent {
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
        title: '红包标题',
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
        title: '申请数量(次)',
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
        title: '已申请期数',
        dataIndex: 'applyPeriods',
        key: 'applyPeriods',
        align: 'center',
      },
      {
        title: '已发放期数',
        dataIndex: 'publicationPeriods',
        key: 'publicationPeriods',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: val => val && val === 1 ? '上架中' : '下架中',
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => {
          if (record.status === 2) {
            return (
              <Wrapper>
                <a onClick={() => this.handleUpdateModalVisible(true, record, record.status)}>编辑</a>
                &nbsp;&nbsp;
                <a onClick={() => this.handleDeleteConfirm(record.id)}>删除</a>
                &nbsp;&nbsp;
                <a onClick={() => this.handlePublishConfirm(record.id, record.status)}>上架</a>
              </Wrapper>
            );
          }
          return (
            <Wrapper>
              <a onClick={() => this.handleUpdateModalVisible(true, record, record.status)}>查看</a>
              &nbsp;&nbsp;
              <a onClick={() => this.handlePublishConfirm(record.id, record.status)}>下架</a>
            </Wrapper>
          );

        },
      },
    ];
    this.state = {
      imageURL: null,
      title: null,
      modalVisible: false,
      updateModalVisible: false,
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
    const { params } = this.state;
    dispatch({
      type: 'template/fetch',
      payload: params,
    });
  }

  handleUpdateModalVisible = (flag, record, modalType) => {
    const { dispatch } = this.props;
    if (flag) {
      this.setState({
        imageURL: null,
      });
      //获取企业用户下拉选项
      dispatch({
        type: 'template/fetchEnterpriseList',
        payload: { page: 1, limit: 9999 },
      });
    }
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {},
      updateType: modalType,
    });
  };

  handlePublishConfirm = (id, status) => {
    Modal.confirm({
      title: `确定${status === 1 ? '下架' : '上架'}该模板吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        if (status && Number.isInteger(status)) {
          const revertStatus = (status === 1) ? 2 : 1;
          this.handlePublish(id, revertStatus);
        }
      },
    });
  };

  handleUpdate = (fields, id, form, nearestImage) => {
    const { dispatch } = this.props;
    const params = { ...fields, id, image: nearestImage };
    const { params: { limit, page } } = this.state;
    params.detailDescription = params.detailDescription.toHTML();
    params.giveIntroduction = params.giveIntroduction.toHTML();
    params.sendIntroduction = params.sendIntroduction.toHTML();

    dispatch({
      type: 'template/saveTemp',
      payload: params,
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('修改模板成功');
        this.setState({
          imageURL: null,
        });
        form.resetFields();
        // console.dir(this.state)
        this.handleUpdateModalVisible();
        dispatch({
          type: 'template/fetch',
          payload: { page: 1, limit },
        });
      }
    });
  };

  handleImageUrl = (imageUrl) => {
    this.setState({ imageURL: imageUrl });
  };


  handlePublish = (id, status) => {
    const { dispatch } = this.props;
    const { params: { limit, page } } = this.state;
    dispatch({
      type: 'template/publishedById',
      payload: { id, status },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success(`${status === 1 ? '上架' : '下架'}成功`);
        dispatch({
          type: 'template/fetch',
          payload: { page, limit },
        });
      } else {
        message.error(`${status === 1 ? '上架' : '下架'}失败`);
      }
    });
  };

  handleDeleteConfirm = id => {
    Modal.confirm({
      title: '确定删除该模板？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.handleDelete(id);
      },
    });
  };

  handleDelete = (id) => {
    const { dispatch } = this.props;
    const { params: { limit, page }, title } = this.state;
    dispatch({
      type: 'template/removeTempById',
      payload: id,
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('删除成功');
        dispatch({
          type: 'template/fetch',
          payload: { page, limit, title },
        });
      }
    });
  };

  handleTableChange = (current) => {
    const { params, title } = this.state;
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
      title,
    };
    dispatch({
      type: 'template/fetch',
      payload: { ...newParams, title },
    });
  };

  handleTableChangePageSize = (current, pageSize) => {
    const { params, title } = this.state;
    const { dispatch } = this.props;
    this.setState({
      params: {
        limit: pageSize,
      },
    });
    const newParams = {
      page: params.page,
      limit: pageSize,
      title,
    };
    dispatch({
      type: 'template/fetch',
      payload: { ...newParams, title },
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
        type: 'template/fetch',
        payload: { ...values },
      });
    });
  };

  handleModalVisible = flag => {
    const { dispatch } = this.props;
    if (flag) {
      this.setState({ imageURL: null });
      //获取企业用户下拉选项
      dispatch({
        type: 'template/fetchEnterpriseList',
        payload: { page: 1, limit: 9999 },
      });
    }
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields, form, image) => {
    const { dispatch } = this.props;
    const { params: { limit }, imageURL } = this.state;
    const newParams = { ...fields };
    if (image !== null) {
      newParams.image = image;
    } else {
      newParams.image = '';
    }
    newParams.detailDescription = newParams.detailDescription.toHTML();
    newParams.giveIntroduction = newParams.giveIntroduction.toHTML();
    newParams.sendIntroduction = newParams.sendIntroduction.toHTML();
    dispatch({
      type: 'template/saveTemp',
      payload: newParams,
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('新建模板成功');
        form.resetFields();
        this.handleModalVisible();

        dispatch({
          type: 'template/fetch',
          payload: { page: 1, limit },
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
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="红包标题">
              {getFieldDecorator('title')(<Input placeholder="红包标题" />)}
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
                创建模板
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { loading, template } = this.props;
    const { templateList: { data, dataTotal } } = template;
    const { params, modalVisible, updateModalVisible, updateFormValues, updateType, imageURL } = this.state;


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      handleImageUrl: this.handleImageUrl,
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
          imageURL={imageURL}
        />
      </PageHeaderWrapper>
    );
  }
}

Template.propTypes = {};

export default Template;
