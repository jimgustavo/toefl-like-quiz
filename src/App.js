import React from 'react';
import dataSet from './api/data';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
//////////////////////////////////PASSAGE AREA///////////////////////////////////////
function Passage(props){
  var stylePassage = { 
    width: "50%",
    height: "570px",
    display: "block", 
    textAlign: "center", 
    float: "left", 
    padding: "1em",
    background: "brown",
    overflow: "auto" 
  }
  var styleParagraph = {
    display: "inline-block", 
    padding: "1em", 
    background: "black", 
    margin: "0 1em 0 0",
    color: "wheat",
    textAlign: "justify"
  }
return (
<div style={stylePassage}>
  <p style={styleParagraph}>{dataSet[0].passage[0]}</p>
  <br/>
  <p style={styleParagraph}>{dataSet[0].passage[1]}</p>
  <br/>
  <p style={styleParagraph}>{dataSet[0].passage[2]}</p>
  <br/>
  <p style={styleParagraph}>{dataSet[0].passage[3]}</p>
  <br/>
  <p style={styleParagraph}>{dataSet[0].passage[4]}</p>
  <br/>
  <p style={styleParagraph}>{dataSet[0].passage[5]}</p>
</div>
)
}
///////////////////////////////////////////////////////////////////////////////////////
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }
  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map(question => this.shuffleArray(question.answers));  
  
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }
  
  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  setUserAnswer(answer) {
    this.setState((state) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
  
    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults (result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        // do nothing for now
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }
  
  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }
  render() {
    return (
      <div>
      <Passage/>
      {this.state.result ? this.renderResult() : this.renderQuiz()}
    </div>
    )
}
}

