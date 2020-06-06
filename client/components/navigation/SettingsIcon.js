import * as React from "react";

import SettingsIcon from "../../assets/icons/settings.svg";
import SettingsActive from "../../assets/icons/settings-active.svg";

export default function TabBarIcon(props) {
    if (props.focused) {
        return(
            <SettingsActive style={{ marginBottom: -3 }}/>
        );
    } else {
        return(
            <SettingsIcon style={{ marginBottom: -3 }}/>
        );
    }
}