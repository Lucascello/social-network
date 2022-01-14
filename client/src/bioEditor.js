import { Component } from "react";
import Profile from "./profile";

export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            bioIsVisible: false,
            bio: "",
        };
        this.updateUsersBio = this.updateUsersBio.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleBioIsVisible = this.toggleBioIsVisible.bind(this);
    }
    componentDidMount(e) {
        console.log("bioEditor just mounted");
        console.log("props in bioEditor:", this.props);
    }
    toggleBioIsVisible() {
        this.setState({
            bioIsVisible: !this.state.bioIsVisible,
        });
    }
    handleChange({ target }) {
        console.log("input value changed in bio :D");
        console.log("value typed:", target.value);
        console.log("name of target", target.name);
        this.setState(
            {
                [target.name]: target.value,
            },
            () => console.log("handleChange update in bio done:", this.state)
        );
    }
    updateUsersBio(e) {
        e.preventDefault();
        console.log("************");
        fetch("/updateUsersBio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("response data from /updateUsersBio:", data);
            });
    }
    render() {
        if (this.state.bioIsVisible) {
            return (
                <>
                    <textarea
                        onChange={({ target }) => this.handleChange({ target })}
                        className="textbox-profile"
                        defaultValue=""
                    />
                    <button onClick={this.updateUsersBio} className="save">
                        Save
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <h3 className="bio-text">{this.props.bio}</h3>
                    <h3 onClick={this.toggleBioIsVisible} className="bio-h3">
                        {this.props.bio ? "Edit your bio" : "Add your bio"}
                    </h3>
                </>
            );
        }
    }
}
