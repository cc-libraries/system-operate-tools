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
    }

    async initHandle() {
        this.database = new DataBase('./clipboard.db');

        let items = await this.database.init();
        this.reRenderList(items);
    }

    reRenderList(items = []) {
        console.log('reRenderList start:');
        let array = [];
        items.forEach((item, index) => {
            this.setProps.add(item.id);
            let value = item.content;
            array.push({ value });
        });

        this.setState({
            cbTextArray: array
            }
        );

        console.log('reRenderList end.');
    }

    render() {
        return <div>
            <Select style={{ width: '100%' }} showSearch={ true } placeholder="input search text" options={ this.state.cbTextArray } />
        </div>;
    }

    async componentDidMount () {
        this.initHandle();
        this.timerID = setInterval(
            () => this.listenCBEvent(),
            1000
        );
    }

    async listenCBEvent() {
        console.log('listenCBEvent start:');
        let cbContext = readText();
        if(cbContext.content == this.lastCBText) {
            console.log('listenCBEvent same to the latest!');
            return;
        }
        this.lastCBText = cbContext.content;

        if(this.setProps.has(cbContext.id)) {
            // console.log('listenCBEvent update context id: ' + cbContext.id + ' time: ' + cbContext.time + ' content: ' + cbContext.content);
            this.database.update(cbContext);
            this.setProps.delete( cbContext.id );
        } else {
            // console.log('listenCBEvent insert context id: ' + cbContext.id + ' time: ' + cbContext.time + ' content: ' + cbContext.content);
            this.database.insert(cbContext);
        }

        this.setProps.add(cbContext.id);

        let items = await this.database.getTop20();
        this.reRenderList(items);
        console.log('listenCBEvent end.');
    }
}

export default MainWindows;