import {React, useEffect, useState} from "react";
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {Container, Grid, InputBase, List, ListItem, ListItemText, ListSubheader, Typography} from "@material-ui/core";
import {AdminService} from '../../service/AdminService'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'absolute',
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
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchResult: {
        marginLeft: theme.spacing(3),
        flexGrow: 1,
        marginLeft: 65,
        position: 'relative',
        overflow: 'auto',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.text.primary, 0.01),
        '&:hover': {
            backgroundColor: fade(theme.palette.text.primary, 0.10),
        },
        width: '100%',
        maxWidth: 200,
        maxHeight: 200,
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        marginTop: theme.spacing(1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
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
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },

    email: {
        marginLeft: theme.spacing(18),
        marginRight: theme.spacing(2),
    },
}));




function ViewMemberInfo() {
    const classes = useStyles();
    
    const [enrolledSubClubs, setEnrolledSubClubs] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState({
        username: "username",
        email: "username@gmail.com",
        created: null,
        lastLogin: null
    });

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

    useEffect(() => {
        AdminService.getEnrolledSubClubs(selectedMember.username).then(response => {
            setEnrolledSubClubs(response.data);
            console.log(response.data);
        });
    }, [selectedMember])

    

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
                
                <div>
                    <List component="nav" className={classes.searchResult}>
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

            </Container>



            
            <Container>
                <Grid container className={classes.divider}>
                        <Grid key={1} item>
                        <Container   >
                                <Typography variant="h6" >
                                    {"Username"}
                                </Typography>
                                <Typography variant="body1" >
                                    {selectedMember.username}
                                </Typography>

                            </Container>



                        </Grid>
                        <Grid key={2} item>
                        <Container  >
                                <Typography variant="h6" className={classes.email}>
                                    {"E-mail"}
                                </Typography>
                                <Typography variant="body1" className={classes.email}>
                                    {selectedMember.email}
                                </Typography>
                                
                            </Container>
                        </Grid>
                </Grid>
            </Container>

            <Container>
            <Grid container className={classes.divider} >
                    <Grid key={1} item>
                        <Container>
                        <Typography variant="h6" >
                                {"Registiration Date"}
                            </Typography>
                            <Typography variant="body1" >
                                {selectedMember.created ? new Date(selectedMember.created).toString() : "Unknown"}
                            </Typography>

                        </Container>


                    </Grid>
                    <Grid key={2} item>
                        <Container>
                        
                        <Typography variant="h6" >
                                {"Last Login Date"}
                            </Typography>
                            <Typography variant="body1" >
                                {selectedMember.lastLogin ? new Date(selectedMember.lastLogin).toString() : "Unknown" }
                            </Typography>

                        </Container>
                    </Grid>
             </Grid>
             </Container>

            <Grid container spacing={3}>
                <Grid item xs={6} style={{maxHeight: '100vh', overflow: 'auto'}}>
                    <Container>
                        <Typography variant="h6" className={classes.title}>Membership List</Typography>

                        <div>
                            <List className={classes.root} subheader={<li/>}>
                            {enrolledSubClubs.map((subClub) => (
                                                <ListItem key={subClub.id}>
                                                    <ListItemText primary={subClub.name}/>
                                                </ListItem>
                                            ))}
                                            

                                            {/**
                                             * 
                                             *                                 {clubNames.map((clubName) => (
                                    <li key={`section-${clubName}`} className={classes.listSection}>
                                        <ul className={classes.ul}>
                                            <ListSubheader>{clubName}</ListSubheader>
                                            {enrolledSubClubs.map((subClub) => (
                                                <ListItem key={subClub.id}>
                                                    <ListItemText primary={subClub.name}/>
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </li>
                                ))}

                                             */}


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