import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>1. Be civil and constructive.</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          This club works best when people are kind, considerate, and thoughtful. We want people to feel comfortable and safe here, regardless of who they are.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}> 2. Get help if you think you need it.</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          If you have to ask whether you should see a doctor, then you should just go ahead and do it. No one on /r/adhd can tell you whether you have ADHD or any other disorder; whether a specific behavior or thing you do is due to ADHD or another disorder; what your doctor will diagnose you with; what you’ll be prescribed; or what your doctor’s diagnostic procedure might be like.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

