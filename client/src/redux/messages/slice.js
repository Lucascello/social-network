export default function messageReducer(chatMessages = null, action) {
    if (action.type == "messages/received") {
        chatMessages = action.payload.msgs;
    } else if (action.type == "message/received") {
        const newMessage = [action.payload.msg, ...chatMessages];
        return newMessage;
    }
    return chatMessages;
}

export function chatMessagesReceived(msgs) {
    return {
        type: "messages/received",
        payload: { msgs },
    };
}

export function chatMessageReceived(msg) {
    return {
        type: "message/received",
        payload: { msg },
    };
}
