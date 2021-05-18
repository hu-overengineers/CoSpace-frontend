/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

const breadcrumbNameMap = {
    '/clubs-subclubs': "Clubs & Sub-clubs",
    '/clubs-subclubs/manage-subclub': 'Manage sub-club',
    '/clubs-subclubs/create-subclub': 'Create sub-club',

    '/members': 'Members',
    '/members/member-info': 'View member information',

    '/reports': 'Reports',
    '/reports/reported-posts': 'Reported posts',

};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default function AdminMenu() {
  const classes = useStyles();
  const [openClubs, setOpenClubs] = React.useState(true);
  const [openMembers, setOpenMembers] = React.useState(true);
  const [openReports, setOpenReports] = React.useState(true);

  const handleClickClubs = () => {
    setOpenClubs((prevOpen) => !prevOpen);
  };
  const handleClickMembers = () => {
    setOpenMembers((prevOpen) => !prevOpen);
  };
  const handleClickReports = () => {
    setOpenReports((prevOpen) => !prevOpen);
  };


  return (
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <div className={classes.root}>
        <Route>
          {({ location }) => {
            const pathnames = location.pathname.split('/').filter((x) => x);

            return (
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter color="inherit" to="/">
                  Menu
                </LinkRouter>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                  return last ? (
                    <Typography color="textPrimary" key={to}>
                      {breadcrumbNameMap[to]}
                    </Typography>
                  ) : (
                    <LinkRouter color="inherit" to={to} key={to}>
                      {breadcrumbNameMap[to]}
                    </LinkRouter>
                  );
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
        <nav className={classes.lists}>
          <List>
           
            <ListItemLink to="/clubs-subclubs" open={openClubs} onClick={handleClickClubs} />
            <Collapse component="li" in={openClubs} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink to="/clubs-subclubs/create-subclub" className={classes.nested} />
              </List>
              <List disablePadding>
                <ListItemLink to="/clubs-subclubs/manage-subclub" className={classes.nested} />
              </List>

            </Collapse>
            
            <ListItemLink to="/members" open={openMembers} onClick={(handleClickMembers)} />
            <Collapse component="li" in={openMembers} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink to="/members/member-info" className={classes.nested} />
              </List>
            </Collapse>

            <ListItemLink to="/reports" open={openReports} onClick={(handleClickReports)}/>
            <Collapse component="li" in={openReports} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink to="/reports/reported-posts" className={classes.nested} />
              </List>
            </Collapse>
          </List>
        </nav>
      </div>
    </MemoryRouter>
  );
}
