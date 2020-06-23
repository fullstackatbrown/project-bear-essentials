import * as React from "react";

import NotificationOffIcon from "../../assets/icons/notifications-off.svg";
import NotificationOnIcon from "../../assets/icons/notifications-on.svg";

export default function BellIcon(props) {
    if (props.focused) {
        return(
            <NotificationOnIcon width={30}/>
        );
    } else {
        return(
            <NotificationOffIcon width={30}/>
        );
    }
}
