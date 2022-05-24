import React, { Component } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "timer-wrapper" }, /*#__PURE__*/
      React.createElement("label", { id: "timer-label" }, this.props.label), /*#__PURE__*/
      React.createElement("div", { id: "time-left", class: "time-box" },
      this.props.minutes < 10 ? "0" + this.props.minutes : this.props.minutes, ":",

      this.props.seconds < 10 ? "0" + this.props.seconds : this.props.seconds)));



  }}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breaklength: 5,
      sessionlength: 25,
      timeleft: 1500,
      startstop: "Start",
      minutes: 25,
      seconds: 0,
      timeElapsed: 0,
      currentStatus: "Stopped",
      sessionStatus: "SESSION" };


    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleSeconds = this.handleSeconds.bind(this);
    this.playBeep = this.playBeep.bind(this);
    this.pauseBeep = this.pauseBeep.bind(this);
  }

  handleDecrement(e) {
    console.log(e.currentTarget.id);
    console.log(`${this.state.currentStatus}`);
    if (e.currentTarget.id === "break-decrement") {
      if (this.state.breaklength > 1) {
        this.setState(state => ({
          breaklength: state.breaklength - 1 }));

        if (this.state.currentStatus !== "Running" && this.state.sessionStatus === "BREAK") {
          this.setState(state => ({
            breaklength: state.breaklength - 1,
            timeleft: state.breaklength * 60 - 60,
            minutes: state.breaklength - 1,
            seconds: 0 }));

        }
      }
    } else {
      if (this.state.sessionlength > 1) {
        this.setState(state => ({
          sessionlength: state.sessionlength - 1
          // timeleft: state.sessionlength * 60
        }));
        if (this.state.currentStatus !== "Running" && this.state.sessionStatus === "SESSION") {
          this.setState(state => ({
            sessionlength: state.sessionlength,
            timeleft: state.sessionlength * 60,
            minutes: state.sessionlength,
            seconds: 0 }));

        }
      }
    }
  }

  handleIncrement(e) {
    console.log(e.currentTarget.id);
    console.log(`${this.state.currentStatus}`);
    if (e.currentTarget.id === "break-increment") {
      if (this.state.breaklength < 60) {
        this.setState(state => ({
          breaklength: state.breaklength + 1 }));

        if (this.state.currentStatus !== "Running" && this.state.sessionStatus === "BREAK") {
          this.setState(state => ({
            breaklength: state.breaklength + 1,
            timeleft: state.breaklength * 60 + 60,
            minutes: state.breaklength + 1,
            seconds: 0 }));

        }
      }
    } else {
      if (this.state.sessionlength < 60) {
        this.setState(state => ({
          sessionlength: state.sessionlength + 1 }));

        if (this.state.currentStatus !== "Running" && this.state.sessionStatus === "SESSION") {
          this.setState(state => ({
            sessionlength: state.sessionlength,
            timeleft: state.sessionlength * 60,
            minutes: state.sessionlength,
            seconds: 0 }));

        }
      }
    }
  }

  handleSeconds() {
    console.log(`${this.state.timeleft} ${this.state.minutes} ${this.state.seconds} ${this.state.timeElapsed}`);
    if (this.state.timeleft > 0) {
      this.setState(state => ({
        timeleft: state.timeleft - 1,
        minutes: Math.floor((state.timeleft - 1) / 60),
        seconds: state.timeleft - 1 - Math.floor((state.timeleft - 1) / 60) * 60,
        timeElapsed: state.sessionlength * 60 - (state.timeleft - 1) }));

    } else {
      // Countdown reached 0
      if (this.state.sessionStatus === "SESSION") {
        this.handleEndOfSession();
      } else {
        if (this.state.sessionStatus === "BREAK") {
          this.handleEndOfBreak();
        }
      }
    }
  }

  playBeep() {
    const audio = document.getElementById("beep");
    audio.currentTime = 0;
    audio.play();
  }

  pauseBeep() {
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  handleEndOfSession() {
    this.playBeep();
    this.setState(state => ({
      currentStatus: "Break",
      sessionStatus: "BREAK",
      timeleft: state.breaklength * 60,
      minutes: state.breaklength,
      seconds: 0 }));

  }

  handleEndOfBreak() {
    this.playBeep();
    this.setState(state => ({
      currentStatus: "Session",
      sessionStatus: "SESSION",
      timeleft: state.sessionlength * 60,
      minutes: state.sessionlength,
      seconds: 0 }));

  }

  handleClick() {
    if (this.state.startstop === "Start") {
      this.interval = setInterval(this.handleSeconds, 1000);
      this.setState({
        startstop: "Stop",
        currentStatus: "Running" });

    } else {
      clearInterval(this.interval);
      this.setState({
        startstop: "Start",
        currentStatus: "Stopped" });

    }
  }

  handleReset() {
    clearInterval(this.interval);

    this.pauseBeep();

    this.setState({
      breaklength: 5,
      sessionlength: 25,
      timeleft: 1500,
      startstop: "Start",
      minutes: 25,
      seconds: 0,
      timeElapsed: 0,
      currentStatus: "Stopped",
      sessionStatus: "SESSION" });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "js-clock" }, /*#__PURE__*/

      React.createElement("div", { id: "break-wrapper" }, /*#__PURE__*/
      React.createElement("label", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("input", {
        id: "break-length",
        type: "number",
        value: this.state.breaklength }), /*#__PURE__*/

      React.createElement("input", {
        id: "break-decrement",
        type: "button",
        onClick: this.handleDecrement,
        value: "-" }), /*#__PURE__*/

      React.createElement("input", {
        id: "break-increment",
        type: "button",
        onClick: this.handleIncrement,
        value: "+" })), /*#__PURE__*/



      React.createElement("div", { id: "session-wrapper" }, /*#__PURE__*/
      React.createElement("label", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("input", {
        id: "session-length",
        type: "number",
        value: this.state.sessionlength }), /*#__PURE__*/

      React.createElement("input", {
        id: "session-decrement",
        type: "button",
        onClick: this.handleDecrement,
        value: "-" }), /*#__PURE__*/

      React.createElement("input", {
        id: "session-increment",
        type: "button",
        onClick: this.handleIncrement,
        value: "+" })), /*#__PURE__*/



      React.createElement(Timer, {
        minutes: this.state.minutes,
        seconds: this.state.seconds,
        label: this.state.sessionStatus }), /*#__PURE__*/


      React.createElement("div", { id: "timer-controls" }, /*#__PURE__*/
      React.createElement("input", {
        type: "button",
        id: "start_stop",
        onClick: this.handleClick,
        value: this.state.startstop }), /*#__PURE__*/


      React.createElement("input", {
        type: "button",
        id: "reset",
        onClick: this.handleReset,
        value: "Reset" })), /*#__PURE__*/



      React.createElement("audio", {
        id: "beep",
        src: "https://www.pacdv.com/sounds/interface_sound_effects/sound98.wav" })));



  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("clock"));