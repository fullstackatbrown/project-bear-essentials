import * as React from "react";

import MapInactiveIcon from "../../assets/icons/map-inactive.svg";
import MapActiveIcon from "../../assets/icons/map-active.svg";

export default function TabBarIcon(props) {
    if (props.focused) {
        return(
            <MapActiveIcon style={{ marginBottom: -3 }}/>
        );
    } else {
        return(
            <MapInactiveIcon style={{ marginBottom: -3 }}/>
        );
    }
}
