export default function friendsReducer(friendsAndWannabees = null, action) {
    if (action.type == "friendsAndWannabees/receivedFriendsAndWannabees") {
        friendsAndWannabees = action.payload.friendsAndWannabees;
    } else if (action.type === "friends-and-wannabees/accept") {
        const newFriendsAndWannabees = friendsAndWannabees.map(
            (wannabeesandfriends) => {
                if (wannabeesandfriends.id === action.payload.id) {
                    return {
                        ...wannabeesandfriends,
                        accepted: true,
                    };
                }
                return wannabeesandfriends;
            }
        );
        return newFriendsAndWannabees;
    } else if (action.type === "friends-and-wannabees/end") {
        const newFriendsAndWannabees = friendsAndWannabees.filter(
            (wannabeesandfriends) => {
                return wannabeesandfriends.id !== action.payload.id;
            }
        );
        return newFriendsAndWannabees;
    }

    return friendsAndWannabees;
}

// this function is my action
export function makeFriend(id) {
    return {
        type: "friends-and-wannabees/accept",
        payload: { id },
    };
}

export function receiveFriendsAndWannabees(friendsAndWannabees) {
    return {
        type: "friendsAndWannabees/receivedFriendsAndWannabees",
        payload: { friendsAndWannabees },
    };
}

export function endFriendship(id) {
    return {
        type: "friends-and-wannabees/end",
        payload: { id },
    };
}
