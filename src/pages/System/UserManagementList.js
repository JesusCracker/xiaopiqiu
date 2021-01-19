import React, { PureComponent } from 'react';
import {
  Card, Table, Row,
  Col,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Modal,
  message,
  Tree,
} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Wrapper } from '@/utils/utils';
import moment from 'moment';
import PropTypes from 'prop-types';
import {treeData} from '@/global';
import styles from './UserManagementList.less';

const FormItem = Form.Item;
const { TreeNode } = Tree;
const { TextArea } = Input;

@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.menu,
}))
@Form.create()
class UpdateForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      autoExpandParent: true,
      checkedKeys: [],
      checkedNodes: [],
      expandedKeys: [],
    };
  }

  componentDidMount() {
    const { values: { userAuthority } } = this.props;
    this.setState({
      checkedKeys: userAuthority&&JSON.parse(userAuthority)||[],
      expandedKeys: userAuthority&&JSON.parse(userAuthority)||[],
    });
  }

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} path={item.path}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  onCheck = (checkedKeys, info) => {
    this.setState({ checkedKeys });
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };


  render() {
    const { expandedKeys, checkedKeys, selectedKeys, autoExpandParent, checkedNodes } = this.state;
    const {
      updateModalVisible,
      handleUpdateModalVisible,
      handleUpdate,
      values,
      form,
      loading,

    } = this.props;


    const { id, password, remark, userName } = values;


    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        if (checkedKeys.length === 0) {
          message.error('请选择相关权限');
          return;
        }
        if (fieldsValue.password !== fieldsValue.passwordConfirm) {
          message.error('两次密码输入不一样');
          return;
        }

        const editValue = {
          ...fieldsValue,
          userAuthority: JSON.stringify(checkedKeys),
        };
        delete editValue.passwordConfirm;
        form.resetFields();
        if (values.id) {
          handleUpdate(editValue, values.id, form);
        }
      });
    };

    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title="修改用户"
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <Card title="用户基本信息">
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="登录账号">
            {form.getFieldDecorator('userName', {
              initialValue: userName,
              rules: [{ required: true, message: '请输入用户名' },
                {
                  pattern: /^[0-9a-zA-Z]*$/g,
                  message: '只能用英文+数字',
                }],
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="输入密码">
            {form.getFieldDecorator('password', {
              initialValue: password,
              rules: [{ required: true, message: '请输入密码' }],
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认密码">
            {form.getFieldDecorator('passwordConfirm', {
              initialValue: password,
              rules: [{ required: true, message: '请再次输入密码', max: 20 }],
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请再次输入密码"
            />)}
          </FormItem>

          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
            {form.getFieldDecorator('remark', {
              initialValue: remark,
            })(<TextArea placeholder="请输入" />)}
          </FormItem>
        </Card>
        <br />
        <Card title="用户权限信息">


          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {form.getFieldDecorator('userAuthority', {})(
              <Tree
                checkable
                selectable={false}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={this.onCheck}
                onExpand={this.onExpand}
                checkedKeys={checkedKeys}
                // selectedKeys={selectedKeys}
              >
                {this.renderTreeNodes(treeData)}
              </Tree>,
            )}
          </FormItem>

        </Card>
      </Modal>
    );

  }
}

@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.menu,
}))
@Form.create()
class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,

      checkedNodes: [],
    };
  }

  disabledDate = (current) => current && current > moment().endOf('day');

  /*
    onExpand = expandedKeys => {
      console.log('onExpand', expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.setState({
        expandedKeys,
        autoExpandParent: false,
      });
    };
  */

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys);

    this.setState({ checkedKeys });

  };


  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} path={item.path}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });


  render() {
    const { form, modalVisible, handleModalVisible, handleAdd, loading } = this.props;
    const { expandedKeys, checkedKeys, selectedKeys, autoExpandParent, checkedNodes } = this.state;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        if (checkedKeys.length === 0) {
          message.error('请选择相关权限');
          return;
        }
        if (fieldsValue.password !== fieldsValue.passwordConfirm) {
          message.error('两次密码输入不一样');
          return;
        }

        const addValue = {
          ...fieldsValue,
          userAuthority: JSON.stringify(checkedKeys),
        };
        delete addValue.passwordConfirm;

        handleAdd(addValue, form);
      });
    };

    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title="新增用户"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        <Card title="用户基本信息">
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="登录账号">
            {form.getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名' },
                {
                  pattern: /^[0-9a-zA-Z]*$/g,
                  message: '只能用英文+数字',
                }],
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="输入密码">
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认密码">
            {form.getFieldDecorator('passwordConfirm', {
              rules: [{ required: true, message: '请再次输入密码', max: 20 }],
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请再次输入密码"
            />)}
          </FormItem>

          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
            {form.getFieldDecorator('remark', {})(<TextArea placeholder="请输入" />)}
          </FormItem>
        </Card>
        <br />
        <Card title="用户权限信息">
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            {form.getFieldDecorator('userAuthority', {})(
              <Tree
                checkable
                selectable={false}
                // expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={checkedKeys}
                // selectedKeys={selectedKeys}
              >
                {this.renderTreeNodes(treeData)}
              </Tree>,
            )}
          </FormItem>

        </Card>
      </Modal>
    );
  }
}

CreateForm.propTypes = {};
CreateForm.defaultProps = {};

@Form.create()
@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '用户ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '用户账号',
        dataIndex: 'userName',
        key: 'userName',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'center',
        render: text => moment(text).format('YYYY-MM-DD'),
      },

      {
        title: '所属菜单',
        dataIndex: 'userAuthority',
        key: 'userAuthority',
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
        render: val => <span>{this.renderMenu(val)}</span>,
      },

      {
        title: '操作',
        align: 'center',
        render: (text, record) => (
          <Wrapper>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
            &nbsp;&nbsp;
            <a onClick={() => this.handleDeleteConfirm(record)}>删除</a>
          </Wrapper>
        ),
      },

    ];


    this.state = {
      modalVisible: false,
      userName: null,
      updateModalVisible: false,
      updateFormValues: {},
      params: {
        page: 1,
        limit: 5,
      },
    };

  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params, userName } = this.state;

    dispatch({
      type: 'users/fetchUserList',
      payload: { ...params, userName },
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {},
    });
  };

  handleDeleteConfirm = record => {
    Modal.confirm({
      title: `确定删除用户 ${record.userName} ？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.handleDelete(record);
      },
    });
  };

  handleDelete = record => {
    const { dispatch } = this.props;
    const { id } = record;
    const { params: { limit, page }, userName } = this.state;
    dispatch({
      type: 'users/deleteUserById',
      payload: { id },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('删除成功');
        dispatch({
          type: 'users/fetchUserList',
          payload: { page, limit, userName },
        });
      } else {
        message.error('删除失败');
      }
    });
  };

  formatData = data => {
    if (Array.isArray(data)) {
      return data.map(item => item.children
        ? {
          title: item.title,
          path: item.path,
          key: item.key,
          children: this.formatData(item.children),
        }
        : {
          title: item.title,
          path: item.path,
          key: item.key,
        });
    }
    return [];
  };

  renderMenu = (menuJSON) => {
    const all = [];
    const menus = [];
    const menuTitle = [];
    if (menuJSON !== undefined) {
      const data = JSON.parse(menuJSON);
      treeData.forEach(item => {
        if (item.children) {
          item.children.forEach(innerItem => {
            all.push(innerItem);
          });
        }
        all.push(item);
      });
      for (let i = 0; i < all.length; i += 1) {
        for (let j = 0; j < data.length; j += 1) {
          if (all[i].key === data[j]) {
            menus.push(all[i]);
          }
        }
      }
      Object.keys(menus).forEach(key => {
        menuTitle.push(menus[key].title);
      });
    }
    return menuTitle.join(',');
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
      type: 'users/fetchUserList',
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
      type: 'users/fetchUserList',
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
        type: 'users/fetchUserList',
        payload: { ...values },
      });
    });
  };

  handleAdd = (fields, form) => {

    const { dispatch } = this.props;
    const { params: { limit } } = this.state;
    dispatch({
      type: 'users/saveUserInfo',
      payload: { ...fields },
    }).then(res => {

      if (res && res.status === 1 && res.message === '成功') {
        message.success('添加成功');
        form.resetFields();
        this.handleModalVisible();
        dispatch({
          type: 'users/fetchUserList',
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

  handleUpdate = (fields, id, form) => {
    const { dispatch } = this.props;
    const params = { ...fields, id };
    const { params: { limit, page } } = this.state;
    dispatch({
      type: 'users/saveUserInfo',
      payload: { ...params },
    }).then(res => {

      if (res && res.status === 1 && res.message === '成功') {
        message.success('修改成功');
        form.resetFields();
        this.handleUpdateModalVisible();
        dispatch({
          type: 'users/fetchUserList',
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
          <Col md={8} sm={24}>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="登录账号">
              {getFieldDecorator('userName')(<Input placeholder="用户账号" />)}
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
                新增用户
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { users, loading } = this.props;

    const { userList: { data, dataTotal } } = users;

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
        {updateFormValues && Object.keys(updateFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={updateFormValues}
            loading={loading}
          />
        ) : null}

      </PageHeaderWrapper>
    );
  }
}

List.propTypes = {};

export default List;
