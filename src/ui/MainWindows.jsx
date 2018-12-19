import React from 'react';
import { Button } from 'antd';  //FIXED: https://github.com/ant-design/ant-design/issues/4618#issuecomment-309258697
import 'antd/dist/antd.less';
class MainWindows extends React.Component {
  render() {
    return <Button type="primary">Button</Button>;
  }
}

export default MainWindows;