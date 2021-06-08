import React,{useEffect, useState} from 'react';
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {message, Modal, Skeleton } from "antd";
import {updateUser,showUser} from '@/services/user'

const Edit = (props) => {
  const [initialValues, setInitialValues] = useState(undefined)

  const {isModalVisible} = props
  const {isShowModal} = props
  const {actionRef} = props
  const {editId} = props


  useEffect(async ()=>{
    if(editId !== undefined){
      const response = await showUser(editId)
      setInitialValues({
        name:response.name,
        email:response.email
      })
    }
  },[])

  const editUser = async values => {
    const response = await updateUser(editId,values)
    if (response.status === undefined){
      message.success('更新成功')
      // 刷新表格
      actionRef.current.reload();
      isShowModal(false)
    }
  }

  return (
      <Modal title="编辑用户"
             visible={isModalVisible}
             onCancel={() => isShowModal(false)}
             footer={null}
             destroyOnClose={true}>
        {
          initialValues === undefined ?<Skeleton active  paragraph={{ rows: 4 }}/>:
          <ProForm
          initialValues={initialValues}
          onFinish={values => editUser(values)}
          >
          <ProFormText
          name="name"
          label="昵称"
          placeholder="请输入昵称"
          rules={[
        {
          required:true,message:'请输入昵称'
        }
          ]}
          />
          <ProFormText
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[
        {required:true,message:'请输入邮箱'},
        {type:"email",message:'邮箱格式不正确'},
          ]}
          />
          </ProForm>
        }
      </Modal>
  );
};

export default Edit;
