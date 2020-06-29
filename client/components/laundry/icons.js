import * as React from "react";

import NotificationOffIcon from "../../assets/icons/notifications-off.svg";
import NotificationOnIcon from "../../assets/icons/notifications-on.svg";

export function BellIcon(props) {
    if (props.focused) {
        return <NotificationOnIcon width={28} />;
    } else {
        return <NotificationOffIcon width={28} />;
    }
}
