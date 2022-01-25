import { Component } from "react";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
        };
        // to not cause cannot read setState of undefined errors, you need to bind the value of "this"
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Registration just mounted");
    }
    handleChange({ target }) {
        console.log("input value changed :D");
        console.log("value typed:", target.value);
        console.log("name of target", target.name);
        // to update state we use this.setState and pass to it an object with our state changes
        this.setState(
            {
                [target.name]: target.value,
            },
            () => console.log("handleChange update done:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("user wants to submit their details", this.state);
        // we now want to send over our user's data to the server
        fetch("/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("response data from /register.json:", data);
                console.log("data from the user:", data.userId);

                // depending on whether or not we receive a successful server response
                // if the user registration got an unsuccessful response:
                if (!data.success) {
                    this.setState({
                        error: "Something went wrong, please try again.",
                    });
                } else {
                    location.replace("/");
                }
                // we want to render an error state
                // IF the user registration got a successful response from the server, THEN
                // we want to location.reload()
            })
            .catch((err) => {
                console.log("err in fetch /register.json", err);

                this.setState({
                    error: "Something went wrong, please try again.",
                });

                // we want to render an error state meaning we want to setState and pass to it
                // an object containing an error property and some value
            });
    }
    render() {
        return (
            <>
                <div className="register">
                    <h1>Registration</h1>
                    {this.state.error && (
                        <h2 style={{ color: "red" }}>{this.state.error}</h2>
                    )}
                </div>
                <form>
                    <h3 className="login">
                        Already a member?
                        <Link to="/login"> Log in here!</Link>
                    </h3>
                    <div className="register">
                        <h4>First Name</h4>
                        <input
                            type="text"
                            name="first"
                            placeholder="First Name"
                            onChange={({ target }) =>
                                this.handleChange({ target })
                            }
                            required
                        />
                    </div>
                    <div className="register">
                        <h4>Last Name</h4>
                        <input
                            type="text"
                            name="last"
                            placeholder="Last Name"
                            onChange={({ target }) =>
                                this.handleChange({ target })
                            }
                            required
                        />
                    </div>
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
                    {/* <button onClick={(e) => this.handleSubmit(e)}>
                        Register
                    </button> */}
                    <button className="register" onClick={this.handleSubmit}>
                        Register
                    </button>
                </form>
                <br /> <br />
            </>
        );
    }
}
