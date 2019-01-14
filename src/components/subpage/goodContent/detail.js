import React, { Component } from 'react'
import './detail.less';
import CodeMirror from '@uiw/react-codemirror'
import 'codemirror/addon/display/autorefresh'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/keymap/sublime'
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/eclipse.css';
import Content from '../../content/index'
class goodDeatil extends Component {

    render() {
        const code = {
            src:`
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/eclipse.css';

const code = 'const a = 0;';

<CodeMirror
    value={code}
    options={{
        theme: 'eclipse',
        tabSize: 2,
        keyMap: 'sublime',
        mode: 'jsx',
    }}
/>
                                
`
        };
        return (
            <div className='detail-container'>
                <div className='title'>
                    请教一个 socket hang up 的报错问题【已解决】
                </div>
                <div className='sub-title'>
                    <span>
                        发布于 7 天前 | 作者 ZhangDianPeng | 580 次浏览 | 最后一次编辑是 5 天前 | 来自 问答
                    </span>
                </div>
                <hr />
                <div className='CodeMirror-content' style={{'border':'1px solid #eee','padding':'8px'}}> 
                    <CodeMirror
                        value={code.src}
                        options={{
                            theme: 'eclipse',
                            tabSize: 2,
                            keyMap: 'sublime',
                            mode: 'jsx',
                            // mode: "shell",
                            lineNumbers: true,
                            matchBrackets: true,
                            // readOnly: true,
                            indentUnit: 4,         
                        }}
                        className="CodeMirror"
                    />

                </div>
                <div className='detail-content'>
                    <Content />
                </div>
            </div>
        )
    }
}

export default goodDeatil


