import { Component } from "react";

export class Registration extends Component {
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
                        error: "Something went wrong with your registration",
                    });
                } else {
                    location.reload();
                }
                // we want to render an error state
                // IF the user registration got a successful response from the server, THEN
                // we want to location.reload()
            })
            .catch((err) => {
                console.log("err in fetch /register.json", err);
                if (!data.success) {
                    this.setState({
                        error: "Something went wrong with your registration",
                    });
                }
                // we want to render an error state meaning we want to setState and pass to it
                // an object containing an error property and some value
            });
    }
    render() {
        return (
            <>
                <h1>Registration</h1>
                {this.state.error && (
                    <h2 style={{ color: "red" }}>{this.state.error}</h2>
                )}
                <form>
                    <input
                        className="some-css-class"
                        name="first"
                        placeholder="First Name"
                        type="text"
                        onChange={({ target }) => this.handleChange({ target })}
                    />
                    <input
                        name="last"
                        placeholder="Last Name"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        placeholder="your@email.com"
                        type="email"
                        onChange={this.handleChange}
                    />
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    {/* <button onClick={(e) => this.handleSubmit(e)}>
                        Register
                    </button> */}
                    <button onClick={this.handleSubmit}>Register</button>
                </form>
            </>
        );
    }
}
