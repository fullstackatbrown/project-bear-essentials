import * as React from "react";

import MapIcon from "../../assets/icons/map.svg";
import MapActive from "../../assets/icons/map-active.svg";

export default function TabBarIcon(props) {
    if (props.focused) {
        return(
            <MapActive style={{ marginBottom: -3 }}/>
        );
    } else {
        return(
            <MapIcon style={{ marginBottom: -3 }}/>
        );
    }
}