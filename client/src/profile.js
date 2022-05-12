import BioEditor from "./bioEditor";

export default function Profile(props) {
    // console.log("props in Profile:", props);
    // console.log("props.url:", props.url);
    return (
        <>
            <div className="main-container">
                <img
                    onClick={props.toggleUploader}
                    className="profile-pic"
                    src={props.url || "profile.jpg"}
                    alt="profilePic"
                />
                <h1 className="profile-h1">
                    Welcome {props.first} {props.last}
                </h1>
                <BioEditor
                    url={props.url}
                    bio={props.bio}
                    first={props.first}
                    last={props.last}
                    favoriteSweet={props.favoriteSweet}
                    toggleBioIsUpdated={props.toggleBioIsUpdated}
                />
            </div>
        </>
    );
}
