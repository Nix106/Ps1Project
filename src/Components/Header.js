import React, { Component } from "react";
export class Header extends Component {
  render() {
    return (
      <div className="flex justify-between items-center w-full p-2">
        <div className="icons flex justify-between w-1/5 ">
          <div className="ml-20">
            <a href={`https://twitter.com/intent/tweet?text=Current%20Weather%20in%20${this.props.location}%20is%20${this.props.temp}%20C°;.`}
              className = "rounded-full bg-red-500 hover:bg-red-400  py-2 px-4 text-white font-semibold"
              target="_blank">Share on Twitter
            </a>
          </div>
        </div>
        <div className=" w-3/5 flex justify-center text-white text-4xl font-bold font-serif m-2">
          WEAREST
        </div>
        <div className="w-1/5 flex justify-between items-center ">
          <form id="search" onSubmit={(e) => this.props.changeAll(e)}>
            <input type="text" className="flex w-4/5 ml-5 rounded-lg shadow-lg m-1 mr-4 text-center"
               placeholder="Search.." onChange={(e) => {this.props.changeRegion(e.target.value);}}
            ></input>
          </form>
          <div>
            <button className="py-2 px-4 mr-10 ml-10 flex justify-center bg-red-500 hover:bg-red-400 rounded-full text-white"
                form="search">Enter</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
