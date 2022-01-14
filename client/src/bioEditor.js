import { Component } from "react";

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
    componentDidMount() {
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
                console.log(" data from /updateUsersBio:", data[0]);
                this.props.toggleBioIsUpdated(data[0].bio);
            });
        this.toggleBioIsVisible();
    }
    render() {
        if (this.state.bioIsVisible) {
            return (
                <>
                    <textarea
                        onChange={({ target }) => this.handleChange({ target })}
                        className="textbox-profile"
                        defaultValue={this.props.bio}
                        name="bio"
                        placeholder="write something about yourself"
                    />
                    <button onClick={this.updateUsersBio} className="save">
                        Save
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <h2 className="bio-text">{this.props.bio}</h2>
                    <h3 onClick={this.toggleBioIsVisible} className="bio-h3">
                        {this.props.bio
                            ? "Edit your bio"
                            : "Add some information to your bio"}
                    </h3>
                </>
            );
        }
    }
}
