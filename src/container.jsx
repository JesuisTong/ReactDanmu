import React, { Component } from 'react';
import Danmu from './danmu/danmu.jsx';
import './index.css';

export default class Container extends Component {
    constructor() {
        super();
        this.state = {
            isVanished: false,
            content: '',
            danmuList: [],
        };
    }
    inputContent(e) {
        this.setState({ content: e.target.value });
    }
    handleClick() {
        if (!this.state.content) {
            return ;
        }
        const danmuList = this.state.danmuList;
        const rect = this.container.getBoundingClientRect();
        const timeStamp = new Date().getTime();
        const action = () => {
            const arr = this.state.danmuList.filter((danmu) => {
                if (danmu.timeStamp === timeStamp) {
                    return null;
                }
                return danmu;
            });
            this.setState({ danmuList: arr });
        };
        danmuList.push({
            text: this.state.content,
            timeStamp,
            rect,
            action,
        });
        this.setState({
            danmuList,
            content: '',
        });
    }
    blockDanmu() {
        this.setState({ isVanished: !this.state.isVanished });
    }
    render() {
        const { isVanished, content, danmuList } = this.state;
        return (
            <div className='layer'>
                <div
                    className='container'
                    style={{ opacity: isVanished ? 0 : 1 }}
                    ref={(a) => { this.container = a; }}
                >
                    {
                        danmuList.length !== 0 && danmuList.map(danmu => (
                            <Danmu {...danmu} key={danmu.timeStamp} />
                        ))
                    }
                </div>
                <div className='controller'>
                    <input value={content} onChange={this.inputContent.bind(this)} maxLength={20}/>
                    <button onClick={this.handleClick.bind(this)}>input</button>
                    <button onClick={this.blockDanmu.bind(this)}>vanish</button>
                </div>
            </div>
        );
    }
}
