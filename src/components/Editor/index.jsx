import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'
import AliyunOSSUpload from '@/components/AliyunOSSUpload'
import { ContentUtils } from 'braft-utils'

export default class EditorDemo extends React.Component {

  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(this.props.content ?? null)
  }


  handleEditorChange = (editorState) => {
    this.setState({ editorState })
    //要判断输入的内容，如果有内容，设置输入的内容，如果没有内容，设置成空字符串。
    //details = <p></p>  details=''
    if(!editorState.isEmpty()){
      const content = editorState.toHTML()
      //调用父组件的函数，将编辑器输入的内容传递回去
      this.props.setDetails(content)
    } else {
      this.props.setDetails('')
    }
  }

  insertImage = url =>{
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [{
        type: 'IMAGE',
        url
      }])
    })
  }

  render () {
    //自定义组件
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <AliyunOSSUpload
            accept="image/*"
            showUploadList={false}
            insertImage = {this.insertImage}
          >
            <button type="button" className="control-item button upload-button" data-title="插入图片">
              插入图片
            </button>
          </AliyunOSSUpload>
        )
      }
    ]
    const { editorState } = this.state
    return (
      <div className="my-editor">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          extendControls={extendControls}
          // onSave={this.submitContent}
        />
      </div>
    )
  }
}
