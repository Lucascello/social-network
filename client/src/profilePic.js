export default function ProfilePic({ last, first, imageUrl, loggerFunc }) {
    imageUrl = imageUrl || "profile.jpg";

    return (
        <img
            className="profile"
            onClick={() => loggerFunc()}
            src={imageUrl}
            alt={`${first} ${last}`}
            id="navbar-avatar"
        />
    );
}
