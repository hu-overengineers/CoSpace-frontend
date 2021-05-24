import React from "react";
import ModeratorPanelSwitch from "../router/ModeratorPanelSwitch";
import ModeratorPanelLayout from "../layout/ModeratorPanelLayout";

function ModeratorPage() {
    return (
        <ModeratorPanelLayout>
            <ModeratorPanelSwitch/>
        </ModeratorPanelLayout>
    );
}

export default ModeratorPage;