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
        this.state = {
            setProps: new Set(),
            cbTextArray: []
        };
        this.database = new DataBase('./cc_clipboard.db');
    }

    initHandle() {
        this.database.init();
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
        let cbText = readText();
        if(cbText == this.lastCBText) {
            return;
        }

        let setTemp = this.state.setProps;
        if(setTemp.has(cbText)) {
            setTemp.delete( cbText );
        }
        setTemp.add( cbText );

        this.setState({
            setProps: setTemp
            }
        );

        let array = [];
        setTemp.forEach((value) => {
            array.push({ value });
        })


        this.setState({
            cbTextArray: array
            }
        );
    }
}

export default MainWindows;