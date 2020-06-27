import * as React from "react";

import DiningInactiveIcon from "../../assets/icons/dining-inactive.svg";
import DiningActiveIcon from "../../assets/icons/dining-active.svg";

export default function TabBarIcon(props) {
    if (props.focused) {
        return <DiningActiveIcon style={{ marginBottom: -3 }} />;
    } else {
        return <DiningInactiveIcon style={{ marginBottom: -3 }} />;
    }
}
