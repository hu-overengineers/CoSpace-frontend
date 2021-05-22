import {React, useEffect, useState} from "react";
import {AdminService} from '../../service/AdminService'
import {PostService} from '../../service/PostService'
import {Container, Button, Typography} from "@material-ui/core";




function ReportedPosts() {

    const [postReports, setPostReports] = useState([]);
    const [reportedPosts, setReportedPosts] = useState([]);

    useEffect(() => {
        AdminService.getPostReports().then(response => {
            setPostReports(response.data);
            console.log(response.data);
        });
    })

    useEffect(() => {
        
    }, [postReports])

    return (
        <Container>
            <Button onClick={() => {
                postReports.map((postReport) => (
                    PostService.getPostById(postReport.postId).then(response => {
                        console.log(response.data);
                    })
                ))
            }}>get postss</Button>

            {postReports.map((postReport) => (
                
                <li>
                    {JSON.stringify(postReport)}

                </li>
            ))}


        </Container>)
}


export default ReportedPosts;