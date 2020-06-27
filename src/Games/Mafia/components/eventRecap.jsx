/* eslint-disable */
import React, {useLayoutEffect} from 'react';
import {connect} from 'react-redux';

import './eventRecap.scss';

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
    element.scrollTo(0, element.scrollHeight);
  });
  console.log(chatHistory);
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
  console.log(state);
  return {
    chatHistory: state.playState.mafia.chatHistory,
  };
}


const SubscribedEventRecap = connect(mapStateToProps)(EventRecap);
export default SubscribedEventRecap;



{/* <div className="new-phase">
        <h4>Day 0</h4>
      </div>
      <ul>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
      </ul>
      <div className="new-phase">
        <h4>Night 1</h4>
      </div>
      
      <ul>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
      </ul> */}