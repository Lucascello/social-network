export default function Profile(props) {
    console.log("props in Profile:", props);
    return (
        <>
            <div className="main-container">
                <img className="profile-pic" src={props.url} alt="profilePic" />
                <h1>
                    Welcome {props.first} {props.last}
                </h1>
            </div>
        </>
    );
}
