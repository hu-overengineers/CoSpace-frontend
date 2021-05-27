import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import QuestionLayout from "../../layout/QuestionLayout";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    question: {
        marginBottom:theme.spacing(1)
    },
    radioGroup: {
        display: "flex",
        flexDirection:"row",
        flexGrow:"1",
    },
    radioButton: {
        marginLeft:theme.spacing(3)
    }
  }));


function QuestionTextField({id, callBackOnChange}){
    const choices = ["Q","A","B","C","D"];
    return (
    <Box display="flex" flexDirection="row" margin="4px">
            <TextField
            autoFocus
            required
            variant="outlined"
            margin="dense"
            id={choices[id]}
            label={choices[id]}
            type="email"
            onChange={event => {callBackOnChange(choices[id], event.target.value)}}
            fullWidth
            />
    </Box>
    )
}


export default function CreateQuestion({callBackOnSave, qid}) {
    const classes = useStyles();
    const [questionObject, setQuestion] = React.useState({
            content:"", 
            answer1:"",
            answer2:"",
            answer3:"",
            answer4:"",
            groundTruth:""
        });
    const id2Field = new Map()
    id2Field.set("A", "answer1")
    id2Field.set("B", "answer2")
    id2Field.set("C", "answer3")
    id2Field.set("D", "answer4")
    id2Field.set("Q", "content")
    const [radioValue, setRadioValue] = React.useState('');
    const onRadioChange = (event) => {
        const updatingField = id2Field.get(event.target.value);
        const groundTruth = questionObject[updatingField]
        setQuestion({...questionObject, groundTruth:groundTruth});
        setRadioValue(event.target.value);
    };

    function onSaveClick() {
        callBackOnSave(qid, questionObject);
    }

    function onTextFieldChange(id, value) {
        const updatingField = id2Field.get(id);
        const tempObj = {...questionObject};
        tempObj[updatingField] = value
        // console.log(tempObj);
        setQuestion(tempObj);
        
    }



    return (
        <Box>

            <QuestionLayout
                question={<QuestionTextField id={0} callBackOnChange={onTextFieldChange}/>}
                answer1={<QuestionTextField  id={1} callBackOnChange={onTextFieldChange}/>}
                answer2={<QuestionTextField  id={2} callBackOnChange={onTextFieldChange}/>}
                answer3={<QuestionTextField  id={3} callBackOnChange={onTextFieldChange}/>}
                answer4={<QuestionTextField  id={4} callBackOnChange={onTextFieldChange}/>}
            />

            <Box display="flex" justifyContent="space-between" marginTop="10px" flexDirection="row">
                <FormControl component="fieldset"> 
                    <FormLabel component="legend">Answer</FormLabel>
                    <RadioGroup className={classes.radioGroup} aria-label="realAnswer" name="realAnswer" value={radioValue} onChange={onRadioChange}>
                        <FormControlLabel className={classes.radioButton} value="A" control={<Radio />} label="A" />
                        <FormControlLabel className={classes.radioButton} value="B" control={<Radio />} label="B" />
                        <FormControlLabel className={classes.radioButton} value="C" control={<Radio />} label="C" />
                        <FormControlLabel className={classes.radioButton} value="D" control={<Radio />} label="D" />
                    </RadioGroup>
                </FormControl>

                <Button
                    size="medium"
                    style={{margin:"10px"}}
                    variant="outlined"
                    color="primary"
                    onClick={() => {onSaveClick()}}
                    disableElevation> Save
                </Button>

            </Box>
        </Box>
    )
}