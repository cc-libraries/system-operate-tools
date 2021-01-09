import React from 'react';
import { Input, List } from 'antd';  //FIXED: https://github.com/ant-design/ant-design/issues/4618#issuecomment-309258697
import 'antd/dist/antd.css';
import { readText } from '../util/clipboard/Clipboard';
import { DataBase } from '../util/DataBase';
import '../scss/common.scss';

class MainWindows extends React.Component {
    constructor(props) {
        super(props);
        this.lastCBText = '';
        this.cbTextArray = [];
        this.setProps = new Set();
        this.state = {
            cbTextArray: []
        };
        this.database = new DataBase('./clipboard.db');
    }

    async initHandle() {
        let items = await this.database.init();
        this.reRenderList(items);
    }

    reRenderList(items = []) {
        console.log('reRenderList start:');
        let array = [];
        items.forEach((item, index) => {
            this.setProps.add(item.id);
            let value = item.content;
            let id = item.id;
            array.push({ value, id });
        });

        this.setState({
            cbTextArray: array
            });

        console.log('reRenderList end.');
    }

    render() {
        return (
            <div class="main-windows">
                <Input
                    placeholder="Basic usage"
                    onChange={e =>  this.searchClip(e.target.value) }
                />
                <List
                    className="loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.cbTextArray}
                    renderItem={(item, index) => (
                        <List.Item
                        actions={[<a href="#" onClick={() =>this.deleteClipItem(item.id, item.value, index)}>delete</a>]}
                        >
                            <List.Item.Meta
                                title={item.value}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    async componentDidMount () {
        this.initHandle();
        this.timerID = setInterval(
            () => this.listenCBEvent(),
            1000
        );
    }

    async listenCBEvent() {
        let cbContext = readText();
        if(cbContext.content == this.lastCBText) {
            // console.log('listenCBEvent same to the latest!');
            return;
        }
        this.lastCBText = cbContext.content;

        if(this.setProps.has(cbContext.id)) {
            // console.log('listenCBEvent update context id: ' + cbContext.id + ' time: ' + cbContext.time + ' content: ' + cbContext.content);
            this.database.update(cbContext);
            this.setProps.delete(cbContext.id);
        } else {
            // console.log('listenCBEvent insert context id: ' + cbContext.id + ' time: ' + cbContext.time + ' content: ' + cbContext.content);
            this.database.insert(cbContext);
        }

        this.setProps.add(cbContext.id);

        let items = await this.database.getTop20();
        this.reRenderList(items);
    }

    async searchClip (searchIput) {
        let items = await this.database.filter(searchIput);
        this.reRenderList(items);
    }

    deleteClipItem (id, value, index) {
        let array = [];
        this.state.cbTextArray.forEach((item) => {
            if(id == item.id) {
                this.setProps.delete(id);
                this.database.delete(id);
            } else {
                let value = item.value;
                let id = item.id;
                array.push({ value, id });
            }
        });

        this.setState({
            cbTextArray: array
            });
    }
}

export default MainWindows;