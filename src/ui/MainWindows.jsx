import React from 'react';
import { Input } from 'antd';  //FIXED: https://github.com/ant-design/ant-design/issues/4618#issuecomment-309258697
import 'antd/dist/antd.css';
import Clipboard from '../util/clipboard/Clipboard.jsx';
class MainWindows extends React.Component {
  render() {
    let Search = Input.Search;
    return <div>
      <Search placeholder="input search text" enterButton="Search" size="large" onSearch={value => Clipboard.readBuffer(value)} />
    </div>;
  }
}

export default MainWindows;