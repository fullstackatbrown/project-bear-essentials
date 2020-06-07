import * as React from "react";

import Bell from "../../assets/icons/bell.svg";
import BellActive from "../../assets/icons/bell-active.svg";

export default function BellIcon(props) {
    if (props.focused) {
        return(
            <BellActive />
        );
    } else {
        return(
            <Bell />
        );
    }
}