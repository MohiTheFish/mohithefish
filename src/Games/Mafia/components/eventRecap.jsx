import React, {useLayoutEffect} from 'react';
import {connect} from 'react-redux';

const SCROLL_THRESHOLD = 30;
const CHAT_BOX_HEIGHT = 550;
function interpretPhase(phase) {
  const isEven = phase % 2 === 0;
  if (isEven) {
    return `Day ${phase / 2}`;
  }
  return `Night ${(phase+1) / 2}`;
}
function EventRecap(props) {
  const { chatHistory } = props;

  useLayoutEffect(() => {
    const element = document.getElementById("event-recap");
    
    if (element.scrollHeight - element.scrollTop < SCROLL_THRESHOLD + CHAT_BOX_HEIGHT) {
      element.scrollTo(0, element.scrollHeight);
    }
  });
  
  return (
    <div id="event-recap" className="papermui">
      <h3 className="description">Event Recap: Recorded here will be all the game actions (votes made, time of murders).</h3>
      {
        chatHistory.map((messageList, phase) => {
          const phaseText = interpretPhase(phase);
          return (
            <React.Fragment key={phaseText}>
            <div className="new-phase">
              {phaseText}
            </div>
            <ul>
              {
                messageList.map((messageItem, index) => {
                  const {audience, message} = messageItem;
                  const messageClass = `message-${audience}`;
                  return (
                    <li className={messageClass} key={`${message}${index}`}>{message}</li>
                  )
                })
              }
            </ul>
            </React.Fragment>
          );
        })
      }
    </div>
  )
}


function mapStateToProps(state) {
  return {
    chatHistory: state.playState.mafia.chatHistory,
  };
}


const SubscribedEventRecap = connect(mapStateToProps)(EventRecap);
export default SubscribedEventRecap;