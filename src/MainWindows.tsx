// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// import { DatePicker } from 'antd';
// import { React } from 'react';
// import { ReactDOM } from 'react-dom';

// const { React } = require('react');
// const { ReactDOM } = require('react-dom');
// function App() {
//   return (
//     <div style={{ margin: 100 }}>
//       <h1>AntDesign Demo</h1>
//     </div>
//   );
// }

import * as React from 'react';
// import { Input } from 'antd/lib/input';
// import DatePicker from 'antd/lib/date-picker';  // 加载 JS
// import 'antd/lib/input/style/css';


const Input = require('antd/lib/input');
const Search = Input.Search;
class MainWindows extends React.Component {
  public render() {
    return (
      // <Search
      //   placeholder="input search text"
      //   enterButton="Search"
      //   size="large"
      //   onSearch={value => console.log(value)}
      // />
      <div style={{ margin: 100 }}>
      <h1>AntDesign Demo</h1>
      <hr /><br />
      <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
        />
      </div>
    );
  }
}

export default MainWindows;