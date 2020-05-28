import React, { Component } from "react";
import lineimage from "./l.png";

export class Weather extends Component {
  render() {
    return (
      <div className="bg-none box-border-md">
        <div className="self-start flex justify-center items-start pt-10">
            <div className="w-1/2 flex flex-col items-center justify-center ml-8">
                <div className=" flex justify-center items-center">
                    <img src={`http://openweathermap.org/img/wn/${this.props.passdata.icon}@2x.png`}className=" w-30 h-30" alt=""/>
                </div><p className="text-4xl text-white font-mono font-semibold rounded-full">{this.props.passdata.weathertype}</p></div>
                <div className="w-1/3 text-4xl p-10 text-white ">
                    {this.props.passdata.temp}
                <sup><span>&#176;</span></sup>
                <label className="text-white">C</label>
               </div>
            </div>
        <div className="flex flex-col items-end justify-left m-4 mr-20 ">
          <div className="font-bold text-2xl text-white">Location:</div>
          <div className="text-lg float-left font-semibold text-white">
            {this.props.passdata.location + "," + this.props.passdata.country}
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
