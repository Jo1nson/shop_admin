import React,{useEffect, useState} from 'react';
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {message, Modal, Skeleton } from "antd";
import {updateUser,showUser, addUser} from '@/services/user'

const CreateOrEdit = (props) => {
  // 将表单初始化的值设置成状态，在编辑的时候，获取数据之后，修改状态，状态改变，组件重新渲染，骨架屏消失
  const [initialValues, setInitialValues] = useState(undefined)

  const {isModalVisible} = props
  const {isShowModal} = props
  const {actionRef} = props
  const {editId} = props

  const type = editId === undefined ? '添加': '编辑'
  useEffect(async ()=>{
    if(editId !== undefined){
      const response = await showUser(editId)
      setInitialValues({
        name:response.name,
        email:response.email
      })
    }
  },[])

  const handleSubmit =async values =>{
    let response = {}
    if(editId === undefined){// 执行添加
      response = await addUser(values)
    } else {// 执行编辑
      response = await updateUser(editId,values)
    }
    if (response.status === undefined){
      message.success(`${type}成功`)
      // 刷新表格
      actionRef.current.reload();
      isShowModal(false)
    }
  }

  return (
      <Modal title={`${type}用户`}
             visible={isModalVisible}
             onCancel={() => isShowModal(false)}
             footer={null}
             destroyOnClose={true}>
        {
          initialValues === undefined && editId !== undefined ?<Skeleton active  paragraph={{ rows: 4 }}/>:
          <ProForm
          initialValues={initialValues}
          onFinish={values => handleSubmit(values)}
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
            {
              editId !== undefined ? '':
                <ProFormText.Password
                  name="password"
                  label="密码"
                  placeholder="请输入密码"
                  rules={[
                    {required:true,message:'请输入昵称'},
                    {min:6,message:'密码最小6位'},
                  ]}
                />
            }
          </ProForm>
        }
      </Modal>
  );
};

export default CreateOrEdit;
