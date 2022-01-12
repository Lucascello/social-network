import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stage: 1,
            error: "",
        };
    }
    componentDidMount(e) {
        console.log("Reset just mounted");
    }
    incrementState(e) {
        e.preventDefault();
        console.log("user gave it's email to change the password", this.state);
        fetch("/requestCode.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("response data from /requestCode.json:", data);
                console.log(
                    "data from the user on requestCode.json:",
                    data.userId
                );
                if (!data.success) {
                    this.setState({
                        error: "Something went wrong, please try again.",
                    });
                } else {
                    this.setState({
                        stage: this.state.stage + 1,
                    });
                }
            })
            .catch((err) => {
                console.log("err in fetch /requestCode.json", err);
                if (!data.success) {
                    this.setState({
                        error: "Something went wrong, please try again.",
                    });
                }
            });
    }
    incrementStateAgain(e) {
        e.preventDefault();
        console.log("User is giving code and new password", this.state);
        fetch("/resetPassword.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("response data from /requestCode.json:", data);
                console.log(
                    "data from the user on requestCode.json:",
                    data.userId
                );
                if (!data.success) {
                    this.setState({
                        error: "Something went wrong, please try again.",
                    });
                } else {
                    this.setState({
                        stage: this.state.stage + 1,
                    });
                }
            })
            .catch((err) => {
                console.log("err in fetch /requestCode.json", err);
                if (!data.success) {
                    this.setState({
                        error: "Something went wrong, please try again.",
                    });
                }
            });
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
    renderStage() {
        if (this.state.stage === 1) {
            return (
                <form>
                    {this.state.error && (
                        <h2 style={{ color: "red" }}>{this.state.error}</h2>
                    )}
                    <br />
                    <div className="register">
                        <h3>
                            Please provide the email address used for
                            registration
                        </h3>
                        <input
                            key="1"
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
                    <button
                        className="retrieve"
                        onClick={(e) => this.incrementState(e)}
                    >
                        Next
                    </button>
                </form>
            );
        } else if (this.state.stage === 2) {
            return (
                <form>
                    {this.state.error && (
                        <h2 style={{ color: "red" }}>{this.state.error}</h2>
                    )}
                    <br />
                    <div className="register">
                        <h4>Please enter the code you received</h4>
                        <input
                            type="text"
                            name="code"
                            placeholder="code"
                            onChange={({ target }) =>
                                this.handleChange({ target })
                            }
                            required
                        />
                    </div>
                    <div className="register">
                        <h4>Please enter a new password</h4>
                        <input
                            key="2"
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
                    <button
                        className="retrieve"
                        onClick={(e) => this.incrementStateAgain(e)}
                    >
                        Next
                    </button>
                </form>
            );
        } else if (this.state.stage === 3) {
            return (
                <>
                    <h2> Success </h2>
                    <h3 className="login">
                        You can now
                        <Link to="/login"> log in </Link>
                        with your password.
                    </h3>
                </>
            );
        }
    }
    render() {
        return (
            <>
                <div className="register">
                    <h1>Reset Your Password</h1>
                    {this.renderStage()}
                    {this.state.error && (
                        <h2 style={{ color: "red" }}>{this.state.error}</h2>
                    )}
                </div>
            </>
        );
    }
}
