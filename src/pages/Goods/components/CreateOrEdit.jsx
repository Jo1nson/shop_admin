import React,{useEffect, useState} from 'react';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
} from "@ant-design/pro-form";
import {message, Modal, Skeleton,Cascader,Image, Button } from "antd";
import {getCategory} from '@/services/category'
import {addGoods,showGoods,updateGoods} from '@/services/goods'
import AliyunOSSUpload from '@/components/AliyunOSSUpload'
import {UploadOutlined} from '@ant-design/icons'
import Editor from '@/components/Editor'

const CreateOrEdit = (props) => {
  // 将表单初始化的值设置成状态，在编辑的时候，获取数据之后，修改状态，状态改变，组件重新渲染，骨架屏消失
  const [initialValues, setInitialValues] = useState(undefined)
  const [options, setOptions] = useState([])

  // 定义Form实例，用来操作表单
  const [formObj] = ProForm.useForm()

  const {isModalVisible} = props
  const {isShowModal} = props
  const {actionRef} = props
  const {editId} = props

  const type = editId === undefined ? '添加': '编辑'
  useEffect(async ()=>{
    const resCategory = await getCategory()
    if(resCategory.status === undefined){
      setOptions(resCategory)
    }
    if(editId !== undefined){
      const response = await showGoods(editId)
      const {pid, id} = response.category
      const defaultCategory = pid === 0 ? [id] : [pid, id]
      setInitialValues({...response, category_id:defaultCategory})
    }
  },[])

  // 文件上传成功后，设置cover字段的value
  const setCoverKey = fileKey => formObj.setFieldsValue({'cover':fileKey})

  const setDetails= content => formObj.setFieldsValue({'details':content})

  const handleSubmit =async values =>{
    let response = {}
    if(editId === undefined){// 执行添加
      response = await addGoods({...values, category_id:values.category_id[1]})
    } else {// 执行编辑
      response = await updateGoods(editId,{...values, category_id:values.category_id[1]})
    }
    if (response.status === undefined){
      message.success(`${type}成功`)
      // 刷新表格
      actionRef.current.reload();
      isShowModal(false)
    }
  }

  return (
      <Modal title={`${type}商品`}
             visible={isModalVisible}
             onCancel={() => isShowModal(false)}
             footer={null}
             destroyOnClose={true}>
        {
          initialValues === undefined && editId !== undefined ?<Skeleton active  paragraph={{ rows: 4 }}/>:
          <ProForm
            form={formObj}
            initialValues={initialValues}
            onFinish={values => handleSubmit(values)}
          >
            <ProForm.Item
              name="category_id"
              label="分类"
              rules={[{required:true,message:'请选择分类'}]}
            >
              <Cascader label="分类" fieldNames={{label:'name',value:'id'}} options={options} placeholder="请选择分类" />
            </ProForm.Item>
              <ProFormText
                name="title"
                label="商品名"
                placeholder="请输入商品名"
                rules={[{required:true,message:'请输入商品名'}]}
              />

              <ProFormTextArea
                name="description"
                label="描述"
                placeholder="请输入描述"
                rules={[{required:true,message:'请输入描述'}]}
              />

              <ProFormDigit
                name="price"
                label="价格"
                placeholder="请输入价格"
                min={0}
                max={999999}
                rules={[{required:true,message:'请输入价格'}]}
              />

              <ProFormDigit
                name="stock"
                label="库存"
                placeholder="请输入库存"
                min={0}
                max={999999}
                rules={[{required:true,message:'请输入库存'}]}
              />

              <ProFormText name="cover" hidden={true} />
            <ProForm.Item
              name="cover"
              label="商品主图"
              rules={[{required:true,message:'请上传商品主图'}]}
            >
              {/*form组件的第一个子组件会变成受控组件*/}
              <div>
                <AliyunOSSUpload
                  accept="image/*"
                  setCoverKey = {setCoverKey}
                  showUploadList={true}
                >
                  <Button icon={<UploadOutlined />}>点击上传商品主图</Button>
                </AliyunOSSUpload>
                {
                  initialValues=== undefined ||!initialValues.cover_url ? '' :
                    <Image width={200} src={initialValues.cover_url}/>
                }
              </div>
            </ProForm.Item>

            <ProForm.Item
              name="details"
              label="商品详情"
              rules={[{required:true,message:'请输入商品详情'}]}
            >
              {/*form组件的第一个子组件会变成受控组件*/}
              <Editor
                setDetails={setDetails}
                content={initialValues=== undefined || initialValues.details}
              />
            </ProForm.Item>
            </ProForm>
          }
      </Modal>
  );
};

export default CreateOrEdit;
