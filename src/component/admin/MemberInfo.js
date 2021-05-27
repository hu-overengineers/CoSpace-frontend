import {ListItem, ListItemText} from "@material-ui/core";
import {Person} from "@material-ui/icons";
import React from "react";
import TitledSection from "../common/TitledSection";
import flatten from "flat";
import List from "@material-ui/core/List";


export default function MemberInfo({info}) {

    const flattened = flatten(info);

    return (
        <TitledSection title={info.username} titleIcon={<Person/>}>
            <List>
                {Object.keys(flattened).map(key => key !== "username" ?
                    <ListItem key={key}>
                        <ListItemText>
                            {`${key}: ${flattened[key]}`}
                        </ListItemText>
                    </ListItem> : null
                )}
            </List>
        </TitledSection>
    );

}