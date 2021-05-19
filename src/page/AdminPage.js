import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AdminPanelSwitch from "../router/AdminPanelSwitch";
import AdminPanelLayout from "../layout/AdminPanelLayout";

const useStyles = makeStyles({
    root: {
        marginTop: "24px"
    },
    divider: {
        marginTop: "8px",
        marginBottom: "8px"
    }
});


function AdminPage() {


    const classes = useStyles();


    return (
        <AdminPanelLayout>
            <AdminPanelSwitch/>
        </AdminPanelLayout>

    );
}

export default AdminPage;