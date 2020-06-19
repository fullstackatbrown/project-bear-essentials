import * as React from "react";

import SettingsInactive from "../../assets/icons/settings-inactive.svg";
import SettingsActive from "../../assets/icons/settings-active.svg";

export default function TabBarIcon(props) {
    if (props.focused) {
        return(
            <SettingsActive style={{ marginBottom: -3 }}/>
        );
    } else {
        return(
            <SettingsInactive style={{ marginBottom: -3 }}/>
        );
    }
}
