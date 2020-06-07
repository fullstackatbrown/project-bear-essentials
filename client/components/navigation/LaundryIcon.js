import * as React from "react";

import LaundryIcon from "../../assets/icons/laundry.svg";
import LaundryActive from "../../assets/icons/laundry-active.svg";

export default function TabBarIcon(props) {
    if (props.focused) {
        return(
            <LaundryActive style={{ marginBottom: -3 }}/>
        );
    } else {
        return(
            <LaundryIcon style={{ marginBottom: -3 }}/>
        );
    }
}