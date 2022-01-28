import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// start for personal information
export default function AllUniversity() {
    const [mounted, setMounted] = useState();


    const [data, setdata] = useState([]);

    const [foundedYear, setfoundedYear] = useState("");
    const [formValues, setFormValues] = useState([{
        name: ""
    }])
    useEffect(() => {
        if (localStorage.getItem("universityData")) {
            var a = localStorage.getItem('universityData');
            var mydata = JSON.parse(a);
            var myuniversityid = mydata.data.university._id;

            var user_email = mydata.data.university.email;
            var mytoken = mydata.data.token;

        }
        setMounted(mytoken)


        // start for fetch university

        const url = "https://unimentor-backend.herokuapp.com/universities";
        fetch(url, {
            method: 'GET',
            headers: { 'Authorization': mytoken }
        })
        .then(response => response.json())
        .then(data => {
            console.log("data.universities");
            console.log(data.universities);
            setdata(data.universities);
            setFormValues(data.universities)
        })
    }, [])



    return (
        <div>








            <div className="card shadow mb-4">
                <div className="table-responsive-sm">





                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>University Name</th>


                            </tr>
                        </thead>
                        <tbody>




                            {formValues.map((object, i) => {

                                return (

                                    <tr key={i}>
                                        <td>{object._id}</td>
                                        <td><a href="object.name">{object.name}</a></td>
                                        <Link to={'/UniveristyPage/'+object._id} className="nav-link" >
                                            <i className="fas fa-file-alt"></i>
                                            <span>Partner Team</span></Link>

                                    </tr>

                                )
                            })}
                        </tbody>


                    </table>





                </div>
            </div>

        </div>


    );
};


