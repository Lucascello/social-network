import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";

export default function OtherProfile() {
    const history = useHistory();
    const { id } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`/api/user/${id}`)
            .then((res) => res.json())
            .then((response) => {
                console.log("response in /api/user/${id}:", response);
                // console.log("response.url in /api/user/${id}:", response.url);
                setUser(response);
            })
            .catch((error) => {
                console.log("error in /api/user/:id", error);
            });
    }, [id]);

    return (
        <>
            <h1>
                This is {user.first} {user.last}
            </h1>
            <div>
                <img src={user.url} />
                <h3>{user.bio}</h3>
            </div>
        </>
    );
}
