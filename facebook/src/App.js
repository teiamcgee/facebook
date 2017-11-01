import React, { Component } from 'react';
// importing the css for app.css
import './App.css';
// starting initial state with a input and a empty array to store comments
const initState = {
  input: "",
  text :[],
}

class App extends Component {
  constructor(){
    super();
    // setting state to the initial state
    this.state = initState;
    this.HandleChange = this.HandleChange.bind(this);
    // binding the handle change function to state
    this.DeleteHandleClick = this.DeleteHandleClick.bind(this);
    // binding the delete handle click function to state
    this.thumbsUp = this.thumbsUp.bind(this);
    // binding the thumbs up function to state
    this.thumbsDown = this.thumbsDown.bind(this);
    // binding the thumbs down function to state
    this.replyHandleChange = this.replyHandleChange.bind(this);
    // binding the reply handle change function to state
  }

HandleChange(e){
this.setState({
  // grabbing the value of the comment input
  input: e.target.value
})
}

replyHandleChange(event, i){
  // copying state
  const CopyofState = Object.assign({}, this.state);
  // getting the value of a comment
  const comment = CopyofState.text[i];
  // Grabbing the value of the input
  comment.input= event.target.value
  this.setState({
    // setting state to the reply input value
    CopyofState,
  })
  }

handleAddComment = () => {
  // if the comment is left empty do not submit anything
  if(this.state.input  === ""){
    return
  }
  // Giving the comment interaction elements
  const comment = {
    // value of the commet input
    message: this.state.input,
    // thumbs up counter
    thumbsUp: 0,
    // thumbs down counter
    thumbsDown: 0,
    // empty array to hold replies
    replies: [],
    // input for the reply commentn box
    input: "",
  };
  const CopyofState = Object.assign({}, this.state);
  // getting a copy of state
  CopyofState.text.push(comment);
// pushing the value of the comment into the text array
  CopyofState.input = "";
  // once the value is submiting the box with be empty
  this.setState(CopyofState);
  // setting state to add the comment
}

handleAddreply(i){
  // getting a copy of stae
  const CopyofState = Object.assign({}, this.state);
  // Grabbing a comment
  const comment = CopyofState.text[i];
  // if the comment is empty return nothing
  if(comment.input  === ""){
    return
  }
  // variable which holds the reply elements
  const reply = {
    // reply inpnut
    message: comment.input,
    // thumbs up value counter
    thumbsUp: 0,
    // thumbs down value counter
    thumbsDown: 0,
  };

  comment.replies.push(reply);
  // push the repy into the replies array
  comment.input = "";
// once the value is submiting the box with be empty
  this.setState(CopyofState);
  // set state to add the reply commetn
}

DeleteHandleClick(i){
  // get a copy of state
  const CopyofState = Object.assign({}, this.state);
  // delete the comment
  delete CopyofState.text[i];
  //  grabbing a comment fromp the text array
  this.setState(CopyofState);
  // setting state to delete the comment
}

replyDeleteHandleClick(i,k){
  // get a copy of state
  const CopyofState = Object.assign({}, this.state);
  // grab a comment from the text array and then that comments reply message
  delete CopyofState.text[i].replies[k];
  // delete the reply of the comment from the text array
  this.setState(CopyofState);
  // set state to delete the reply
}

thumbsUp(i){
  // copy the text array into a new array
  const text = this.state.text.slice();
  // add to the thumbs down counter
  text[i].thumbsUp++;

  this.setState({
     text,
    //  set state to add 1 thumbs up
  })
}

replyThumbsUp(i,k){
  // get a copy of state
  let state = Object.assign({}, this.state);
  // grab the comment from the text array and the reply thumbsUp counter
  state.text[i].replies[k].thumbsUp++;
  // add 1 to the counter

  this.setState({
     state,
    //  set state to add 1on the reply thumbs up
  })
}

thumbsDown(i){
  // make a copy of the text array
  const text = this.state.text.slice();
  //adds 1 to the thumbs down counter
  text[i].thumbsDown++;

  this.setState({
     text,
    //  set state to add 1 to thumbs down counter
  })
}

replyThumbsDown(i,k){
  // get a copy of state
  let state = Object.assign({}, this.state);
  // get the comment fromp the text array and the comments reply thumbsdown
  state.text[i].replies[k].thumbsDown++;
// add1  for the thumbs down counter
  this.setState({
     state,
    //  set state to add 1 to  reply thumbsdown
  })
}

  render() {
    // loop through the text array
    const addText = this.state.text.map(function(comment,i){
      return (
        <li key={i}>
        // grabs the comments message
          {comment.message}
          // when the delete button is clicked run the delete handle click function
          <button onClick={() => this.DeleteHandleClick(i)}>Delete</button>
          // when the thumbsup is clicked run the thumbsup function
          <button onClick={() => this.thumbsUp(i)}>Like {comment.thumbsUp} </button>
          // when the thumbsDown button is clicked run the thumbsdown function
          <button onClick={() => this.thumbsDown(i)}>DisLike {comment.thumbsDown} </button>
          <ul>
            <li key={i}>
            // puts the typed information into the input bos
            <input type="text" value={comment.input}  onChange={ (event) => this.replyHandleChange(event, i)} />
            // when the reply button is clicked run the handle Add reply function
              <button onClick={() => this.handleAddreply(i)}> Reply </button>
              <ul>
                {
                  comment.replies.map(function(reply, k){
                    // Loop through the replies array
                    return(
                      <li key={k}>
                      // grabs the reply message
                        {reply.message}
                        <button onClick={() => this.replyDeleteHandleClick(i,k)}>Delete</button>
                        // when the reply delete button is clicked run the delete handle click function
                        <button onClick={() => this.replyThumbsUp(i, k)}>Like {reply.thumbsUp} </button>
                        // when the reply thumbs up button is clicked run the delete handle click function
                        <button onClick={() => this.replyThumbsDown(i, k)}>DisLike {reply.thumbsDown} </button>
                        // when the reply thumbs down button is clicked run the delete handle click function
                      </li>
                    )
                  }, this)
                }
              </ul>
            </li>
          </ul>
        </li>
      )
    }, this)

    return (
    <div>
      <h1>The Cookie book</h1>
      <input type="text" value={this.state.input}  onChange={this.HandleChange} /><button onClick={this.handleAddComment}>Submit</button>
      <ul>
        {addText}
      </ul>
    </div>
    );
  }
}

export default App;
