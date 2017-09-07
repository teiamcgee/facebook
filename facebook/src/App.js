import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const initState = {
  input: "",
  text :[],
}

class App extends Component {
  constructor(){
    super();
    this.state = initState;
    this.HandleChange = this.HandleChange.bind(this);
    this.DeleteHandleClick = this.DeleteHandleClick.bind(this);
    this.thumbsUp = this.thumbsUp.bind(this);
    this.thumbsDown = this.thumbsDown.bind(this);
    this.replyHandleChange = this.replyHandleChange.bind(this);
  }

HandleChange(e){
this.setState({
  input: e.target.value
})
}

replyHandleChange(event, i){
  const CopyofState = Object.assign({}, this.state);
  const comment = CopyofState.text[i];
  comment.input = event.target.value
  this.setState({
    CopyofState,
  })
  }

handleAddComment = () => {
  if(this.state.input  === ""){
    return
  }
  const comment = {
    message: this.state.input,
    thumbsUp: 0,
    thumbsDown: 0,
    replies: [],
    input: "",
  };
  const CopyofState = Object.assign({}, this.state);
  CopyofState.text.push(comment);
  CopyofState.input = "";
  this.setState(CopyofState);
}

handleAddreply(i){
  const CopyofState = Object.assign({}, this.state);
  const comment = CopyofState.text[i];
  if(comment.input  === ""){
    return
  }
  const reply = {
    message: comment.input,
    thumbsUp: 0,
    thumbsDown: 0,
  };

  comment.replies.push(reply);
  comment.input = "";
  this.setState(CopyofState);
}

DeleteHandleClick(i){
  const CopyofState = Object.assign({}, this.state);
  delete CopyofState.text[i];
  this.setState(CopyofState);
}

thumbsUp(i){
  const text = this.state.text.slice();
  text[i].thumbsUp++

  this.setState({
     text,
  })
}

thumbsDown(i){
  const text = this.state.text.slice();
  text[i].thumbsDown++

  this.setState({
     text,
  })
}

  render() {
    const addText = this.state.text.map(function(comment,i){
      return (
        <li key={i}>
          {comment.message}
          <button onClick={() => this.DeleteHandleClick(i)}>Delete</button>
          <button onClick={() => this.thumbsUp(i)}>Like {comment.thumbsUp} </button>
          <button  onClick={() => this.thumbsDown(i)}>DisLike {comment.thumbsDown} </button>
          <ul>
            <li key={i}>
            <input type="text" value={this.state.text[index].input}  onChange={ (event) => this.replyHandleChange(event, i)} />
              <button onClick={() => this.handleAddreply(i)}> Reply </button>
            </li>
          </ul>
        </li>
      )
    }, this)

    return (
    <div>
      <h1>The Cookie Book</h1>
      <input type="text" value={this.state.input}  onChange={this.HandleChange} /><button onClick={this.handleAddComment}>Submit</button>
      <ul>
        {addText}
      </ul>
    </div>
    );
  }
}

export default App;
