import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Login just mounted");
    }
    handleChange({ target }) {
        console.log("input value changed :D");
        console.log("value typed:", target.value);
        console.log("name of target", target.name);
        this.setState(
            {
                [target.name]: target.value,
            },
            () => console.log("handleChange in login update done:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("user wants to submit their details on login", this.state);
        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("response data from /login.json:", data);
                console.log("data from the user:", data.userId);
                console.log("Success in retrieving data", data.success);
                if (!data.success) {
                    this.setState({
                        error: "Something went wrong, please try again.",
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log("err in fetch /login.json", err);
                this.setState({
                    error: "Something went wrong, please try again.",
                });
            });
    }
    render() {
        return (
            <>
                <br />
                <div className="register">
                    <h1>Login</h1>
                    <h3 className="login">
                        Not a member yet?
                        <Link to="/"> Register in here!</Link>
                    </h3>
                    {this.state.error && (
                        <h2 style={{ color: "red" }}>{this.state.error}</h2>
                    )}
                </div>

                <form>
                    <div className="register">
                        <h4>Email Address</h4>
                        <input
                            type="email"
                            pattern="[^@\\\\\\\\\s]+@[^@\s]+\.[^@\s]+"
                            name="email"
                            placeholder="your@email.com"
                            onChange={({ target }) =>
                                this.handleChange({ target })
                            }
                            required
                        />
                    </div>
                    <div className="register">
                        <Link to="/resetPassword"> Forgot Your Password?</Link>
                    </div>
                    <div className="register">
                        <h4>Password</h4>
                        <input
                            type="password"
                            name="password"
                            minLength="6"
                            placeholder="password"
                            onChange={({ target }) =>
                                this.handleChange({ target })
                            }
                            required
                        />
                    </div>
                    <button className="register" onClick={this.handleSubmit}>
                        Login
                    </button>
                </form>
            </>
        );
    }
}
