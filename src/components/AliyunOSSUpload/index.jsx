import React from 'react';
import { Upload, message} from 'antd';
import {ossConfig} from'@/services/common'

export default class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }
  // 初始化，获取OSS上传签名
  init = async () => {
    try {
      const OSSData = await ossConfig();

      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };
// 文件上传过程中触发的回调
  onChange = ({ file }) => {
    // 上传成功之后，把文件的key,设置为表单某个字段的值
    if (file.status ==='done') {
      const {setCoverKey, insertImage} = this.props
      if(setCoverKey) setCoverKey(file.key)
      // 上传完成后，如果需要url，那么返回url给父组件
      if(insertImage)  insertImage(file.url)
      message.success('上传成功')
    }
  };

// 额外的上传参数
  getExtraData = file => {
    const { OSSData } = this.state;

    return {
      key: file.key,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  beforeUpload = async file => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }

    const dir = 'react/'

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.key = OSSData.dir + dir + filename;// 在getExtraData函数中会用到，在云存储中存储的文件的key
    file.url = OSSData.host +OSSData.dir + dir + filename;// 上传完成后，用于显示内容

    return file;
  };

  render() {
    const { value,accept,showUploadList } = this.props;
    const props = {
      accept:accept || '',
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      listType: 'picture',
      maxCount: 1,
      showUploadList
    };
    return (
      <Upload {...props}>
        {this.props.children}
      </Upload>
    );
  }
}


