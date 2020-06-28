import React, {Component} from "react";
import logo from "./react.svg";
import "./Home.css";
import {Link} from "react-router-dom";

class Home extends Component {
    static async getInitialProps({req, res, match, history, location, ...ctx}) {
        return {whatever: "stuff"};
    }

    render() {
        return (
            <div className="text-center">
                <div className="flex flex-col justify-center bg-customBlack h-32 p-2 text-white">
                    <img src={logo} className="mb-3 h-16 Home-logo" alt="logo"/>
                    <h2>Welcome to After.js</h2>
                </div>
                <p className="text-xl">
                    To get started, edit <code>src/Home.js</code> or{" "}
                    <code>src/About.js</code>and save to reload.
                </p>
                <Link to="/about">About -></Link>
            </div>
        );
    }
}

export default Home;
