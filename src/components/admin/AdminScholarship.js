import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

import Footer from './Footer';
const AdminScholarship = () => {
    const [formValues, setFormValues] = useState([{
        scholarship: "",
        
        _id:"null"

    }])
    const [mounted, setMounted] = useState();
    const [myAdminId, setAdminId] = useState();

    
    const [data, setdata] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("adminData")) {
            var a = localStorage.getItem('adminData');
            var mydata = JSON.parse(a);
            
            // console.log(mydata);

            var mytoken = mydata.data.token;
            var adminId = mydata.data.admin._id;
            // setAdminId(adminId)
        }
        setMounted(mytoken)
     
        setAdminId(adminId)
        
        //start for select course
        const url = "admin/scholarships/"+adminId;
        // const url = "admin/applications/"+"61ebe571481b8d50d1e005ec";
        console.log("my url");
        console.log(url);
        fetch(url, {
            method: 'GET',
            
        })
            .then(response => response.json())
            .then(data => {
                console.log("data.scholarship");
              
                setFormValues(data.adminScholarships)
              
                // this.setState({ data: data.universityCourses })
            })

    }, [])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, {
            scholarship: "",
            _id: "null"
        }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        console.log("formvalues");
        console.log(formValues);
        // console.log(JSON.stringify(formValues));
        // var myvalues = JSON.stringify(formValues);
        console.log("ITEM");
        console.log(formValues._id==="null");

        formValues.map(async (item) => {
            if(item._id==="null"){
            await axios.post('/admin/scholarships', item, { headers: { 'Authorization': mounted } })
                .then(function (res) {
                    console.log(res.data);
                    if (res.data.success === true) {
                        // alert("courses update successfully");
                    }
                    else {
                        alert("error");
                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
            // alert("application update successfully");
            }
            else{
                await axios.put('/admin/scholarships/' + item._id, item, { headers: { 'Authorization': mounted } })
                .then(function (res) {
                    console.log(res.data);
                    if (res.data.success === true) {
                        console.log(" update successfully");
                    }
                    else {
                        alert("error");
                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
            }
        })

    }

    return (



        <div id="page-top">


            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
                <Sidebar />
                {/* there will be come sidebar */}

                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* <!-- Main Content --> */}
                    <div id="content">

                        {/* topbar will be come there */}
                        <Topbar />
                        {/* <!-- Begin Page Content --> */}
                        {/* the content of each page will be come there */}
                        {/* <ApplicationProfile /> */}
                        <div className="container">

                            {/* <!-- Page Heading --> */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Scholarship</h1>


                            </div>


                            {/* <!-- Content Row --> */}

                            <p>Admin Application</p>
                            <form onSubmit={handleSubmit}>
                                <div className="card-body" >

                                    <div className="from-block" >

                                        {formValues.map((element, index) => (

                                            <div className="row" key={index}>
                                                <div className="mb-3">
                                                    <div className="row">
                                                        <div className="col">
                                                            <label className="form-label">Scholarship
                                                                *</label>
                                                            <input type="text" className="form-control"
                                                                placeholder="scholarship" name="scholarship"
                                                                value={element.scholarship || ""} onChange={e => handleChange(index, e)}

                                                            // value={courseName}
                                                            // onChange={(e) => setcourseName(e.target.value)}
                                                            />
                                                        </div>


                                                    </div>
                                                </div>



                                            </div>
                                        ))}

                                        <div className="mb-3">
                                            <div className="row">
                                                <div className="col-md-6"></div>
                                                <div className="col-md-6 text-right">

                                                    <button className="button add" type="button" className="btn btn-success " onClick={() => addFormFields()}>Add New</button>

                                                    <button type="submit" className="btn btn-secondary">Save
                                                    </button>
                                                    <button type="submit" data-bs-toggle="collapse" href="#collapse4" className="btn btn-success ">Save &
                                                        Next</button>
                                                </div>

                                            </div>

                                        </div>



                                    </div>
                                </div>
                            </form>
                            {/* <!-- Card Body --> */}

                        </div>
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    {/* <!-- Footer --> */}
                    <Footer />
                    {/* <!-- End of Footer --> */}

                </div>
                {/* <!-- End of Content Wrapper --> */}

            </div>
            {/* <!-- End of Page Wrapper --> */}

            {/* <!-- Scroll to Top Button--> */}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            {/* <!-- Logout Modal--> */}

        </div >
    );
}

export default AdminScholarship