import React from 'react';
import { Select } from 'antd';  //FIXED: https://github.com/ant-design/ant-design/issues/4618#issuecomment-309258697
import 'antd/dist/antd.css';
import { readText } from '../util/clipboard/Clipboard';
import { DataBase } from '../util/DataBase';

class MainWindows extends React.Component {
    constructor(props) {
        super(props);
        this.lastCBText = '';
        this.cbTextArray = [];
        this.setProps = new Set(),
        this.state = {
            cbTextArray: []
        };

        this.database = new DataBase('./cc_clipboard.db');
    }

    initHandle() {
        this.database.init(handleSeachResult);
    }

    handleSeachResult(error, item) {
        let array = [];
        let value = item.cc_content;
        if(null == error) {
            array.push({ value });
        }

        this.setState({
            cbTextArray: array
            }
        );
    }

    render() {
        return <div>
            <Select style={{ width: '100%' }} showSearch={ true } placeholder="input search text" options={ this.state.cbTextArray } />
        </div>;
    }

    componentDidMount () {
        this.timerID = setInterval(
            () => this.listenCBEvent(),
            1000
        );
    }

    listenCBEvent() {
        let cbContext = readText();
        if(cbContext.content == this.lastCBText) {
            return;
        }
        this.lastCBText = cbContext.content;

        let setTemp = this.setProps;
        if(setTemp.has(cbContext.content)) {
            this.database.update(cbContext);
            setTemp.delete( cbContext.content );
        }
        setTemp.add( cbContext.content );

        let array = [];
        this.database.getTop20(handleSeachResult);
    }
}

export default MainWindows;