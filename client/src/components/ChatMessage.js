import React, { Component } from 'react';
    class  ChatMessage extends Component {
        constructor(props) {
            super(props);
            this.changeView = this.changeView.bind(this);
        }
        changeView = (e) => {
            this.props.changeView('signup')
        }
        render() {
            return (
                <div>
                    <button className="chat-button" onClick={this.changeView}>Scout Messaging</button>
                </div>
            )
        }
    }
    export default ChatMessage;

