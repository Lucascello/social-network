import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector((state) => {
        console.log("state: ", state);
        return state && state.chatMessages;
    });
    const chatContainerRef = useRef();

    // useEffect(() => {
    //     chatContainerRef.current.scrollTop =
    //         chatContainerRef.current.scrollHeight;
    // }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };

    console.log("These are my chatMessages:", chatMessages);

    return (
        <div className="container">
            <div className="chat-container" ref={chatContainerRef}>
                {chatMessages &&
                    chatMessages.map((msgs) => {
                        return (
                            <>
                                <div className="messages">
                                    <div key={msgs.id}>
                                        <img className="chat" src={msgs.url} />
                                    </div>
                                    {msgs.message}
                                    <br /> <br />
                                    {msgs.first} {msgs.last} on{" "}
                                    {msgs.created_at}
                                </div>
                                <br />
                            </>
                        );
                    })}
            </div>
            <br />
            <textarea
                rows="4"
                cols="50"
                placeholder="Enter your chat message here"
                onKeyDown={keyCheck}
            />
            <br /> <br />
        </div>
    );
}
