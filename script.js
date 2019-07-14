//Class and set a state
class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    }
  }
  
  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  format() {
    return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
  }

  start() {
    if (!this.state.running) {
      this.setState({running: true});
      this.watch = setInterval(() => this.calculate(), 10);
    }
  }

  //Converter of time
  calculate() {
    let {minutes, seconds, miliseconds} = this.state.times;
    miliseconds += 1;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    this.setState({
      times: {
        miliseconds,
        seconds,
        minutes,
      }
    })
  }
  
  stop() {
    this.setState({running: false});
    clearInterval(this.watch);
  }

  resetTimer() {
    this.stop();
    this.reset();
  }

  render() {
    return (
      <div className="container">
        <nav className="controls">
          <a href="#" className="button" id="start" onClick={() => this.start()}>Start</a>
          <a href="#" className="button" id="stop" onClick={() => this.stop()}>Stop</a>
          <a href="#" className="button" id="restart" onClick={() => this.reset()}>Restart</a>
        </nav>

        <div className="stopwatch">{this.format()}</div>
      </div>
    );
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

ReactDOM.render(
  <Stopwatch />, document.getElementById("app")
);

