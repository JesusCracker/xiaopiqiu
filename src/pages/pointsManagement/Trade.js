import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Tree, Button, Card, Row, Modal, Form, Input, TreeSelect, message } from 'antd';
import styles from '@/pages/pointsManagement/Trade.less';

const FormItem = Form.Item;

@connect(({ trade, loading }) => ({
  loading: loading.models.trade,
  trade,
}))
@Form.create()
class CreateForm extends PureComponent {
  static defaultProps = {
    handleAdd: () => {
    },
    handleAddModalVisible: () => {
    },
    trade: { tradeSelectData: [] },
  };

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
    const { form, modalVisible, handleAdd, handleAddModalVisible, loading, trade: { tradeSelectData } } = this.props;
    const { nodeLevel, nodeKey } = this.state;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        const fieldData = fieldsValue;
        fieldData.parentId = nodeKey;
        Object.keys(fieldsValue).forEach(key => {
          if (key === 'level') {
            fieldData[key] = nodeLevel + 1;
          }
        });
        handleAdd(fieldsValue, form);
      });
    };

    // 新建菜单->选择父级菜单时的数据->格式化
    const formateData = data => {
      if (Array.isArray(data)) {
        return data.map(item => item.children
          ? {
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
    const parentTreeData = tradeSelectData.length === 0 ? [] : formateData(tradeSelectData);

    parentTreeData.unshift({
      title: '无',
      value: 0,
      key: 0,
      level: 0,
      nodeKey: 0,
    });

    // 新建菜单需要填的表单
    const menuForm = (
      <Form>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
          {form.getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入名称！' }],
          })(<Input placeholder="名称" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级名称">
          {form.getFieldDecorator('parentId', {
            rules: [{ required: true, message: '请选择上级名称！' }],
          })(
            <TreeSelect
              style={{ width: 300 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={parentTreeData}
              placeholder="请选择"
              treeDefaultExpandAll
              onSelect={this.onSelectParentNode}
            />,
          )}
        </FormItem>
      </Form>
    );
    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title='新建菜单'
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleAddModalVisible()}
        okText="确定"
        cancelText="取消"
        confirmLoading={loading}
      >
        {menuForm}
      </Modal>
    );
  }
}

//updateForm
@connect(({ trade, loading }) => ({
  loading: loading.models.trade,
  trade,
}))
@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    trade: { tradeSelectData: [] },
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
      trade: { tradeSelectData, tradeData },
    } = this.props;

    // console.dir(currentRecord);

    const { nodeLevel, nodeKey } = this.state;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        const fieldData = fieldsValue;

        /* if (fieldData && fieldData.parentId !== null) {
           fieldData.parentId = currentRecord && currentRecord[0][0];
         }
         fieldData.parentId = nodeKey;
         if (nodeLevel === null) {
           fieldData.level = currentRecord.level;
         } else {
           Object.keys(fieldsValue).forEach(key => {
             if (key === 'level') {
               fieldData[key] = nodeLevel + 1;
             }
           });
         }*/

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
    const parentTreeData = tradeSelectData.length === 0 ? [] : formateData(tradeSelectData);

    parentTreeData.unshift({
      title: '无',
      value: 0,
      key: 0,
      level: 0,
      nodeKey: 0,
    });


    // 编辑菜单需要填的表单
    const menuForm = (
      <Form>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
          {form.getFieldDecorator('title', {
            initialValue: currentRecord && currentRecord.title,
            rules: [{ required: true, message: '请输入名称！' }],
          })(<Input placeholder="名称" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级名称">
          {form.getFieldDecorator('parentId', {
            initialValue: currentRecord && currentRecord.pid,//写死的
            rules: [{ required: true, message: '请选上级名称！' }],
          })(
            <TreeSelect
              style={{ width: 300 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={parentTreeData}
              placeholder="请选择"
              treeDefaultExpandAll
              onSelect={this.onUpdateSelectParentNode}
            />,
          )}
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

@connect(({ trade, loading }) => ({
  loading: loading.models.trade,
  trade,
}))
class Trade extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      addModalVisible: false,
      updateModalVisible: false,
      currentRecord: null,
    };

  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'trade/fetchTradeData',
    });
  };

  renderMessage = content => {
    message.error(content);
  };

  handleUpdateModalVisible = (flag) => {
    const { dispatch } = this.props;
    const { currentRecord } = this.state;
    if (currentRecord && currentRecord.length > 0) {
      if (flag) {
        //获取下拉框选项
        dispatch({
          type: 'trade/fetchTradeSelectData',
        });
      }
      this.setState({
        updateModalVisible: !!flag,
      });
    } else {
      this.renderMessage('请选择节点后再编辑');
    }

  };

  handleAddModalVisible = (flag) => {
    const { dispatch } = this.props;
    if (flag) {
      //获取下拉框选项
      dispatch({
        type: 'trade/fetchTradeSelectData',
      });
    }
    this.setState({
      addModalVisible: !!flag,
    });
  };

  handleDeleteConfirm = id => {
    if (id === null) {
      this.renderMessage('请选择节点后再删除');
    } else {
      Modal.confirm({
        title: '确定删除该类型？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.handleDelete(id);
        },
      });
    }
  };

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trade/remove',
      payload: { id },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('删除成功');
        dispatch({
          type: 'trade/fetchTradeData',
        });
      }
    });
  };

  handleCheck = (checkedKeys, info) => {
    /*   console.dir(checkedKeys)*/
    // console.dir(info.node.props);
    // const currentRecord = checkedKeys.checked.map(item => Number(item)); //当checkable的时候
    const currentRecord = checkedKeys;
    if (currentRecord.length > 1) {
      message.error('只能选择一个权限进行编辑或者删除');
    } else {
      currentRecord.title = info.node.props.title;
      currentRecord.id = info.node.props.id;
      currentRecord.pid = info.node.props.parentId;
      this.setState({
        currentRecord,
      });
    }
  };


  handleAdd = (fields, form) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trade/addTradeData',
      payload: fields,
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('添加类型成功');
        form.resetFields();
        this.handleAddModalVisible();
        dispatch({
          type: 'trade/fetchTradeData',
        });
      }
    });
  };

  //编辑后提交
  handleUpdate = (fields, id, form) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trade/addTradeData',
      payload: {
        ...fields,
        id,
      },
    }).then(res => {
      if (res && res.status === 1 && res.message === '成功') {
        message.success('编辑成功');
        form.resetFields();
        this.handleUpdateModalVisible();
        dispatch({
          type: 'trade/fetchTradeData',
        });
      }
    });

  };


  render() {
    const { addModalVisible, updateModalVisible, currentRecord } = this.state;
    const { trade: { tradeData }, loading } = this.props;

    const addMethods = {
      handleAdd: this.handleAdd,
      handleAddModalVisible: this.handleAddModalVisible,
    };

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };


    return (
      <PageHeaderWrapper>
        <Card>
          <Button
            icon="plus"
            type="primary"
            onClick={() => this.handleAddModalVisible(true)}
          >
            添加
          </Button>
          <Button
            icon="edit"
            type="primary"
            onClick={() => this.handleUpdateModalVisible(true)}
            style={{ marginLeft: 20 }}
          >
            编辑
          </Button>
          <Button
            icon="delete"
            type="primary"
            onClick={() => this.handleDeleteConfirm(currentRecord && currentRecord[0] ? currentRecord.id : null)}
            style={{ marginLeft: 20 }}
          >
            删除
          </Button>

          <CreateForm {...addMethods} modalVisible={addModalVisible} loading={loading} />

          <UpdateForm
            {...updateMethods}
            currentRecord={currentRecord}
            updateModalVisible={updateModalVisible}
          />

          <Row style={{ marginTop: 20 }}>
            <Tree
              // checkable
              defaultExpandAll
              // onSelect={onSelect}
              onSelect={this.handleCheck}
              treeData={tradeData}
              checkStrictly
            />
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

Trade.propTypes = {};

export default Trade;
