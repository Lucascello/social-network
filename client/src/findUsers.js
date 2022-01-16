import { useState, useEffect } from "react";

export default function FindUsers(props) {
    const [search, setSearch] = useState();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort = false;
        console.log("useEffect mounted");
        // console.log("value in the search:", search);
        // console.log("users in the search:", users);
        if (!search) {
            fetch("/latestUsers")
                .then((res) => res.json())
                .then((data) => {
                    console.log("these are the latest users:", data);
                    setUsers(data);
                });
        } else {
            fetch(`/users/${search}`)
                .then((res) => res.json())
                .then((users) => {
                    if (!abort) {
                        console.log("users in the search", users);
                        setUsers(users);
                    }
                });
        }
        return () => {
            abort = true;
        };
    }, [search]);

    return (
        <>
            <h1 className="findUsers">Find Other Users</h1>
            <h3
                onClick={props.toggleFindUserIsVisible}
                className="bio-h3-extra"
            >
                or Return To My Page
            </h3>
            <br />
            <input onChange={(e) => setSearch(e.target.value)} />
            <br /> <br />
            <span>
                {users.map((user) => (
                    <div className="search-results" key={user.id}>
                        <img className="search-pic" src={user.url} />
                        <h3 className="search-name">
                            - {user.first} {user.last}
                        </h3>
                    </div>
                ))}
            </span>
        </>
    );
}
