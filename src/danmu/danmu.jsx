import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './danmu.css';

export default class Danmu extends Component {
    constructor(props) {
        super(props);
        const enableArea = this.props.rect.height - 24;
        this.state = {
            aixisX: this.props.rect.right,
            aixisY: this.props.rect.top + (Math.random() * enableArea),
        };
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.aixisX <= (this.props.rect.left - this.danmu.getBoundingClientRect().width)) {
                clearInterval(this.interval);
                this.props.action();
                return;
            }
            this.setState({ aixisX: this.state.aixisX - 1 });
        }, 10);
    }
    render() {
        const { aixisX, aixisY } = this.state;
        return (
            <div className="danmu" style={{ transform: `translate3d(${aixisX}px, ${aixisY}px, 0)` }} ref={(a) => { this.danmu = a; }}>
                {this.props.text}
            </div>
        );
    }
}

Danmu.propTypes = {
    text: PropTypes.string,
    action: PropTypes.func,
    rect: PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        bottom: PropTypes.number,
        top: PropTypes.number,
    }),
};
