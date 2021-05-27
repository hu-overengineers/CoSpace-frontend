import React from "react";
import AdminPanelSwitch from "../router/AdminPanelSwitch";
import AdminPanelLayout from "../layout/AdminPanelLayout";

function AdminPage() {
    return (
        <AdminPanelLayout>
            <AdminPanelSwitch/>
        </AdminPanelLayout>

    );
}

export default AdminPage;