import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainWindows from './MainWindows';
// import './../index.css';

// import { Input } from 'antd';

// const Search = Input.Search;
// function App() {
//   return (
//     <div style={{ margin: 100 }}>
//       <h1>AntDesign Demo</h1>
//       <hr /><br />
//       <Search
//           placeholder="input search text"
//           enterButton="Search"
//           size="large"
//           onSearch={value => console.log(value)}
//         />
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <MainWindows />,
    document.getElementById('root') as HTMLElement
);