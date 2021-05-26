import {React, useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";
import {AdminService} from '../../service/AdminService'
import FormControl from "@material-ui/core/FormControl";
import {Autocomplete} from "@material-ui/lab";
import MemberInfo from "./MemberInfo";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "50%",
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    form: {
        display: "flex",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    memberInfo: {
        marginBottom: theme.spacing(2),
    }
}));


function ViewMemberInfo() {
    const classes = useStyles();

    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);

    const onSearchKeyChange = (e) => {

        AdminService.searchMembersByName(e.target.value, 0, 10).then(response => {
            if (e.target.value.length > 1) {
                setMembers(response.data);
            } else if (e.target.value === "") {
                setMembers([]);
            }
        })

    }

    useEffect(() => {
        if (selectedMember !== null) {
            AdminService.getEnrolledSubClubs(selectedMember.username).then(response => {
                setSelectedMember({...selectedMember, "sub-clubs": response.data.map(subClub => subClub.name)});
            });
        }
    }, [])

    return (
        <Box className={classes.root}>
            <FormControl className={classes.form} variant="filled">
                <Autocomplete
                    id="member-search-box"
                    onInput={onSearchKeyChange}
                    onChange={(e, v) => {
                        console.log("On select member:", v);
                        setSelectedMember(v);
                    }}
                    options={members}
                    getOptionLabel={(option) => option.username}
                    renderInput={(params) => <TextField {...params} label="Search member" variant="filled"/>}
                />
            </FormControl>

            {selectedMember && <MemberInfo className={classes.memberInfo} info={selectedMember}/>}
        </Box>
    );
}


export default ViewMemberInfo;