import React, { Component } from "react";
import lineimage from "./l.png";

export class Forecast extends Component {

  render() {
    return (
      <div className="top flex justify-center items-between mx-10">
        <div className="w-5/12 flex flex-col justify-center items-center ">
          <div className=" "><img src={`http://openweathermap.org/img/wn/${this.props.passdata.weather[0].icon}@2x.png`}
              className=" w-20 h-20"/>
          </div>
          <p className="text-s">{this.props.passdata.weather[0].main}</p>
        </div>
        <div className="w-2/12 flex justify-center items-center">
          <img className="h-20 mr-15 ml-15" src={lineimage} />
        </div>
        <div className="flex w-5/12 text-3xl items-center pr-15 mr-15">
          {this.props.passdata.temp.day}
          <sup><span>&#176;</span></sup>
          C
        </div>
      </div>
    );
  }
}

export default Forecast;
