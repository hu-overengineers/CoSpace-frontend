import React from "react";
import ModeratorPanelSwitch from "../router/ModeratorPanelSwitch";
import ModeratorPanelLayout from "../layout/ModeratorPanelLayout";

function ModPage() {
    return (
        <ModeratorPanelLayout>
            <ModeratorPanelSwitch/>
        </ModeratorPanelLayout>
    );
}

export default ModPage;