import React from 'react';

const styleResult = {
    color: "wheat"
  }

function Result(props) {
  return (
    <div style={styleResult}>
      Your score is: <strong>{props.quizResult}</strong>!
    </div>
  );
}

export default Result;