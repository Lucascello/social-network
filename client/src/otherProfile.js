import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";

export default function OtherProfile(props) {
    const history = useHistory();
    const { id } = useParams();
    const [user, setUser] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("props.ownId", props.ownId);
        console.log("id", id);
        if (props.ownId == id) {
            history.replace("/");
        } else {
            fetch(`/api/user/${id}`)
                .then((res) => res.json())
                .then((response) => {
                    console.log("response 1 in /api/user/${id}:", response);
                    if (response) {
                        console.log("response 2 in /api/user/${id}:", response);
                        setUser(response);
                    } else {
                        console.log("user doesnt exist");
                        setError(true);
                    }
                })
                .catch((error) => {
                    console.log("error in /api/user/:id", error);
                });
        }
    }, [id, props.ownId]);

    return (
        <>
            {error && (
                <div className="user-finder">
                    <h1 className="user-error"> Could not find this user </h1>
                </div>
            )}

            {user && (
                <div className="other-user">
                    <h1>
                        This is {user.first} {user.last}
                    </h1>
                    <img className="other-prof" src={user.url} />
                    <h3>{user.bio}</h3>
                </div>
            )}
        </>
    );
}

{
    /* <h1>
                This is {user.first} {user.last}
            </h1>
            <div>
                <img src={user.url} />
                <h3>{user.bio}</h3>
            </div> */
}
