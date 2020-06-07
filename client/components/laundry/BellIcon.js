import * as React from "react";

import Bell from "../../assets/icons/bell.svg";
import BellActive from "../../assets/icons/bell-active.svg";

export default function BellIcon(props) {
    if (props.focused) {
        return(
            <BellActive width={30}/>
        );
    } else {
        return(
            <Bell width={30}/>
        );
    }
}