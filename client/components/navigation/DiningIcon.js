import * as React from "react";

import DiningIcon from "../../assets/icons/dining.svg";
import DiningActive from "../../assets/icons/dining-active.svg";

export default function TabBarIcon(props) {
    if (props.focused) {
        return(
            <DiningActive style={{ marginBottom: -3 }}/>
        );
    } else {
        return(
            <DiningIcon style={{ marginBottom: -3 }}/>
        );
    }
}