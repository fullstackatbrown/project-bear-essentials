import * as React from "react";

import LaundryInactiveIcon from "../../assets/icons/laundry-inactive.svg";
import LaundryActiveIcon from "../../assets/icons/laundry-active.svg";

export default function TabBarIcon(props) {
    if (props.focused) {
        return(
            <LaundryActiveIcon style={{ marginBottom: -3 }}/>
        );
    } else {
        return(
            <LaundryInactiveIcon style={{ marginBottom: -3 }}/>
        );
    }
}
