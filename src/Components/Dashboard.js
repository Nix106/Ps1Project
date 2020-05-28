import React, { Component } from "react";
import Weather from "./Weather";
import Forecast from "./Forecast";
import Axios from "axios";
import Header from "./Header";

export class Dashboard extends Component {
  state = {
    coords: {
        latitude: 100,
        longitude: 100,
    },
    apikey: "6554288ab8c4a1e51d4ef916bb0e9b79",
    currentdata: {},
    forecastdata: [],
    inputData: "",
    image: "",


  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let n = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({ coords: n });
        Axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&units=metric&exclude=hourly,minutely&appid=${this.state.apikey}`
        ).then((res) => {
          let temp = res.data.daily;
          this.setState({ forecastdata: temp });
        });
        Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&units=metric&appid=${this.state.apikey}`
        ).then((res) => {
          let tempdata = {
            temp: res.data.main.temp,
            location: res.data.name,
            country: res.data.sys.country,
            weathertype: res.data.weather[0].main,
            icon: res.data.weather[0].icon,
          };
          Axios({
            method: "GET",url:"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
            useQueryString: true,
            headers: {
              "content-type": "application/octet-stream",
              "x-rapidapi-key":"201016981cmsh1f2923302082e14p150ea4jsn808b948ad428",
              "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",

            },
            //
            //834e5af748mshf15f04940919b7ep133adfjsn4e5f85d637eb
            params: {
              autoCorrect: "false",
              pageNumber: "1",
              pageSize: "1",
              q: tempdata.location,
              safeSearch: "true",
            },
          })
            .then((response) => {
              let tempimg = response.data.value[0].url;
              this.setState({ image: tempimg });
            })
            .catch((error) => {
              console.log(error);
            });

          this.setState({ currentdata: tempdata });
        });
      });
    } else {
        prompt("Location Not Found!");
        console.log("Invalid Location");
    }
  }

  newloc = (value) => {
    this.setState({ inputData: value });
  };

  newdata = (event) => {
    event.preventDefault();

    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputData}&units=metric&appid=${this.state.apikey}`
    ).then((res) => {
      let tempdata = {
        location: res.data.name,
        country: res.data.sys.country,
        temp: res.data.main.temp,
        icon: res.data.weather[0].icon,
        weathertype: res.data.weather[0].main,
      };
      let n = {
        latitude: res.data.coord.lat,
        longitude: res.data.coord.lat,
      };
      this.setState({ currentdata: tempdata });
      this.setState({ coords: n });
      Axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&units=metric&exclude=hourly,minutely&appid=${this.state.apikey}`
      ).then((res) => {
        let temp = res.data.daily;
        this.setState({ forecastdata: temp });
      });
      Axios({
        method: "GET",
        url:
          "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "201016981cmsh1f2923302082e14p150ea4jsn808b948ad428",
          useQueryString: true,
        },
        params: {
          autoCorrect: "false",
          pageNumber: "1",
          pageSize: "1",
          q: tempdata.location,
          safeSearch: "true",
        },
      })
        .then((response) => {
          let tempimg = response.data.value[0].url;
          this.setState({ image: tempimg });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  render() {
    const forecastwithdata = this.state.forecastdata.slice(1).map((item) => <Forecast key={item.id} passdata={item}/>);
    return (
      <div>
        <div>
          <Header
            temp={this.state.currentdata.temp}
            changeAll={this.newdata}
            changeRegion={this.newloc}
            location={this.state.currentdata.location}
          />
        </div>
        <div className="flex jusity-center">
          <div className="flex justify-between w-full ">
            <div className="forecast w-1/3 flex justify-between flex-col">
              <div className=" pl-6 flex justify-between text-2xl text-white w-full">
                Upcoming Week's Forecast
              </div>
              <div className="flex flex-col pb-2 mb-2 mt-2 text-white">
                {forecastwithdata}
              </div>
            </div>
            <div className="w-1/2 p-10 ma-2 current text-white">
              <Weather passdata={this.state.currentdata} />
            </div>
            <div className="image w-1/3  m-3 flex justify-between items-center ">
              <div className="flex flex-wrap justify-center ">
                <div className=" w-full px-2 mt-25 pt-25 mr-5 flex justify-center items-center ma-8">
                  <img src={this.state.image} alt=""
                    className="shadow flex bottom-0 rounded-full max-w-full border-5 sh-auto hadow-lg hover:shadow-2xl mb-20"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Dashboard;
