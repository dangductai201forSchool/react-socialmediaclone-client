import React, { Component } from 'react';
import '../App.css';
import { Client } from '@stomp/stompjs';


class Chat extends Component {
  state={
    serverTime:null
  }

  componentDidMount(){
    this.client =new Client();

    this.client.configure({
      brokerURL:'ws//localhost:8080/stomp',
      onConnect:()=>{
        this.client.subscribe('/queue/now', message=>{
          this.setState({serverTime:message.body});
        });
      },
      debug:(str)=>{
        console.log(new Date,str);
      }
    });
    this.client.activate();
  }

  clickHandler = () => {
    this.client.publish({destination: '/app/greetings', body: 'Hello world'});
  }

  render() {
    return (
        <div className="chat-container">
        <div className="chat-header">
          <h1>Messager</h1>
        </div>
        <hr/>
        <div className="connecting">...</div>
        <div className="chat-main">
          <ul className="message-area"></ul>
          <form className="message-form">
            <div className="input-message">
              <input className="message" type="text" autoComplete="off" placeholder="Type message"/>
              <button color="#e1306c" onClick={this.clickHandler} type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
