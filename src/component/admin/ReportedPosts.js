import {React, useEffect, useState} from "react";
import {AdminService} from '../../service/AdminService'
import {Container, Button, Typography} from "@material-ui/core";




function ReportedPosts() {

    const [postReports, setPostReports] = useState([]);

    useEffect(() => {
        AdminService.getPostReports().then(response => {
            setPostReports(response.data);
            console.log(response.data);
        });
    })

    return (
        <Container>

            {postReports.map((postReport) => (
                <li>
                    "Author": {postReport.author} <br/>
                    "Content": {postReport.content}
                </li>
            ))}


        </Container>)
}


export default ReportedPosts;