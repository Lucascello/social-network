import { Component } from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            profileIsVisible: true,
            favoriteSweet: "🧁",
            url: "url",
            first: "first",
            last: "last:",
            bio: "bio",
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNameAndPic = this.logNameAndPic.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this);
    }

    componentDidMount() {
        console.log("App component mounted");
        // Make fetch request to get data for currently logged in user
        // and store this data in the component state
        fetch("/navigation.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("data on the navigation: ", data);
                this.setState({
                    id: data.id,
                    first: data.first,
                    last: data.last,
                    url: data.url,
                    email: data.email,
                    bio: data.bio,
                });
            })
            .catch((err) => {
                console.log("error on the navigation :", err);
            });
    }

    uploadPicture(url) {
        console.log("url in my toggleUploader:", url);
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
            url: url,
        });
    }

    

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    logNameAndPic(val) {
        console.log(this.state.uploaderIsVisible + val);
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        return (
            <>
                <section className="cool-styles">
                    <img
                        src="social.png"
                        alt="social network logo"
                        id="homepage-logo"
                    />
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.url}
                        loggerFunc={this.logNameAndPic}
                    />
                </section>
                <hr></hr>
                {this.state.uploaderIsVisible && (
                    <Uploader
                        loggerFunc={this.logNameAndPic}
                        toggleUploader={this.toggleUploader}
                        uploadPicture={this.uploadPicture}
                    />
                )}
                {this.state.profileIsVisible && (
                    <Profile
                        favoriteSweet={this.state.favoriteSweet}
                        url={this.state.url}
                        first={this.state.first}
                        last={this.state.last}
                        bio={this.state.bio}
                        toggleUploader={this.toggleUploader}
                    />
                )}
            </>
        );
    }
}
