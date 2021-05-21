import {React, useEffect, useState} from "react";
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {Container, Grid, InputBase, List, ListItem, ListItemText, ListSubheader, Typography, Button} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {AdminService} from '../../service/AdminService'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    search: {
        margin: theme.spacing(4),
        flexGrow: 1,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.text.primary, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.text.primary, 0.20),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchResult: {
        margin: theme.spacing(4),
        flexGrow: 1,
        marginLeft: 65,
        position: 'relative',
        overflow: 'auto',
        borderRadius: theme.shape.borderRadius,

        width: '50%',
        maxWidth: 200,
        maxHeight: 200,
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInputRoot: {
        color: 'inherit',
    },
    searchInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },

}));




function ViewMemberInfo() {
    const classes = useStyles();
    
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState({});

    const onSearchKeyChange = (e) => {
        
        AdminService.searchMembersByName(e.target.value,0, 5).then(response => {
            if (e.target.value.length > 1) {
                console.log(response.data);
                setMembers(response.data);
            }
            if (e.target.value === ""){
                setMembers([]);
            }
        })

    }



    // Get searched users
    useEffect(() => {
            
    }, []);


    const clubNames = ["Club Name 1", "Club Name 2", "Club Name 3"];
    const subClubNames = ["Sub-Club 1", "Sub-Club 2", "Sub-Club 3"];
    const ipAddr = ["192.168.1.1 - 5.06", "192.168.1.2 - 2.23", "192.168.1.3 - 22.33"]

    return (
        <Container>

            <Container className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase
                    placeholder="Search a member"
                    onChange={onSearchKeyChange}
                    classes={{
                        root: classes.searchInputRoot,
                        input: classes.searchInput,
                    }}
                    inputProps={{'aria-label': 'search'}}
                />
                
            </Container>


            <div className={classes.searchResult} >
                <List component="nav">
                    {members.map((member) => (
                    <ListItem button key={member.gmail+ member.created} onClick={(e) => {
                        setMembers([]);
                        setSelectedMember(member);
                    }}>
                        <ListItemText primary={`${member.username}`} />
                    </ListItem>
                    ))}
                </List>
            </div>
            
   
            <Grid container spacing={3}>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <div>
                            <TextField
                                id="email"
                                label="E-Mail"
                                defaultValue="2017-05-24"
                                value={selectedMember.email}
                                onChange={() => {
                                   
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <div>
                            <TextField
                                id="username"
                                label="User Name"
                                value={selectedMember.username}
                                onChange={() => {
                                   
                                }}
                                defaultValue="John"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </Container>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <div>
                            <TextField
                                id="registration-date"
                                label="Registration Date"
                                defaultValue="2017-05-24 13:42"
                                value={selectedMember.created}
                                onChange={() => {
                                   
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <div>
                            <TextField
                                id="last-login-date"
                                label="Last Login Date"
                                defaultValue="2017-05-24 13:42"
                                value={selectedMember.lastLogin ? selectedMember.lastLogin : "abc"}
                                onChange={() => {
                                   
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </Container>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <Typography variant="h6" className={classes.title}>Membership List</Typography>

                        <div>
                            <List className={classes.root} subheader={<li/>}>
                                {clubNames.map((clubName) => (
                                    <li key={`section-${clubName}`} className={classes.listSection}>
                                        <ul className={classes.ul}>
                                            <ListSubheader>{clubName}</ListSubheader>
                                            {subClubNames.map((subClubName) => (
                                                <ListItem key={subClubName}>
                                                    <ListItemText primary={subClubName}/>
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </List>
                        </div>
                    </Container>
                </Grid>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <Typography variant="h6" className={classes.title}>IP Login List</Typography>

                        <div>
                            <List>
                                {ipAddr.map((ip) => (
                                    <ListItem key={ip}>
                                        <ListItemText primary={ip}/>
                                    </ListItem>
                                ))}
                            </List>

                        </div>

                    </Container>
                </Grid>
            </Grid>


        </Container>)
}


export default ViewMemberInfo;