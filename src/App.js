import React from "react";
import Axios from "axios";
import Header from "./Components/Header";
import Dashboard from "./Components/Dashboard";
class App extends React.Component {
  render() {
    return (
      <div className="bg-orange-400 flex items-center justify-center min-h-screen">
        <div className="w-11/12 h-auto bg-blue-700 flex-col rounded-lg shadow-xl hover:shadow-2xl overflow-hidden bg-opacity-100 ">
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default App;
