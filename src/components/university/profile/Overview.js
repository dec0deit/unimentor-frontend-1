import React, { useState, useEffect } from "react";
import axios from 'axios';

// start for personal information
export default function Overview() {
    const [mounted, setMounted] = useState();
    const [foundedYear, setfoundedYear] = useState("");
    const [ranking, setranking] = useState("");
    const [rate, setrate] = useState("");
    const [course, setcourse] = useState("");
    const [courseNo, setcourseNo] = useState("");
    const [month, setmonth] = useState("");
    const [year, setyear] = useState("");
    const [english, setenglish] = useState("");
    const [cgpa, setcgpa] = useState("");
    const [acceptanceRate, setacceptanceRate] = useState("");
    useEffect(() => {
        if (localStorage.getItem("universityData")) {
            var a = localStorage.getItem('universityData');
            var mydata = JSON.parse(a);
         var  myuniversityid = mydata.data.university._id;
          
            var user_email = mydata.data.university.email;
            var mytoken = mydata.data.token;
           
        }
        setMounted(mytoken)
        //start for fetch personal information
        // axios.get('/university/'+'61dab27e05671a193cca5f81'+'/overview')
        axios.get('/university/'+myuniversityid+'/overview')

            .then(function (res) {
            
                if (res.data.success === true) {
                    var student_universityOverview = res.data.universityOverview;

                    setfoundedYear(student_universityOverview.foundedYear);
                    setranking(student_universityOverview.ranking);
                    setrate(student_universityOverview.rate);
                    setcourse(student_universityOverview.course);
                    setcourseNo(student_universityOverview.courseNo);
                    setmonth(student_universityOverview.month);
                    setyear(student_universityOverview.year);
                    setenglish(student_universityOverview.english);
                    setcgpa(student_universityOverview.cgpa);
                    setacceptanceRate(student_universityOverview.acceptanceRate);


                }
                else {
                    alert("error");
                }

            })
            .catch(error => {
                console.log(error.response)
            });
    }, [])


    function overview(event) {
        event.preventDefault();
        const obj = {
            foundedYear: foundedYear,
            ranking: ranking,

            rate: rate,
            course: course,
            courseNo: courseNo,
            month: month,
            year: year,
            english: english,
            cgpa: cgpa,
            acceptanceRate: acceptanceRate

        };
      
        axios.put('/university/overview', obj, { headers: { 'Authorization': mounted } })
            .then(function (res) {
            
                if (res.data.success === true) {
                    alert("overview update successfully");
                }
                else {
                    alert("error");
                }

            })
            .catch(error => {
                console.log(error.response)
            });
    }
    return (
        <div>
            <div className="card">

                <a className="card-header" data-bs-toggle="collapse" href="#collapseTwo"><strong>2</strong>
                    Overview
                </a>
                <div id="collapseTwo" className="collapse" data-bs-parent="#accordion">
                    <form onSubmit={overview}>
                        <div className="card-body">

                            <div className="d-flex flex-wrap" id="Address">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label>Founded year </label>
                                        <select className="form-control" name="country" required=""
                                            value={foundedYear}
                                            onChange={(e) => setfoundedYear(e.target.value)}
                                        >
                                            <option>Select Year</option>
                                            <option>2021</option>
                                            <option>2020</option>
                                            <option>2019</option>
                                            <option>2018</option>
                                            <option>2017</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="State/Province">Ranking                                                             </label>
                                        <input type="text" className="form-control"

                                            value={ranking}
                                            onChange={(e) => setranking(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group"><label htmlFor="City/Town">International Student Rate </label>
                                        <select
                                            value={rate}
                                            onChange={(e) => setrate(e.target.value)}
                                            className="form-control" name="city" required="">
                                            <option>Select Student Rate</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label>Popular Courses </label>
                                        <select
                                            value={course}
                                            onChange={(e) => setcourse(e.target.value)}

                                            className="form-control" name="city" required="">
                                            <option>Select Courses</option>
                                            <option>IELTS</option>
                                            <option>TOEFL</option>
                                            <option>GMAT</option>
                                            <option>GRE</option>
                                            <option>SAT</option>
                                            <option>ACT</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="Zipcode">No. of courses </label>
                                        <select

                                            value={courseNo}
                                            onChange={(e) => setcourseNo(e.target.value)}
                                            className="form-control" name="city" required="">
                                            <option>Select Courses</option>
                                            <option>IELTS</option>
                                            <option>TOEFL</option>
                                            <option>GMAT</option>
                                            <option>GRE</option>
                                            <option>SAT</option>
                                            <option>ACT</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Add Month </label>
                                                <input type="text" className="form-control"
                                                    value={month}
                                                    onChange={(e) => setmonth(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Year</label>
                                                <input type="text" className="form-control"
                                                    value={year}
                                                    onChange={(e) => setyear(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="State/Province"> English Proficiency                                                             </label>
                                            <input type="text" className="form-control" placholder="ielts/Pte etc.. "
                                                value={english}
                                                onChange={(e) => setenglish(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="State/Province"> CGPA                                                            </label>
                                            <input type="text" className="form-control" placholder="CGPA"

                                                value={cgpa}
                                                onChange={(e) => setcgpa(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="State/Province">  Acceptance rate                                                            </label>
                                            <input type="text" className="form-control" placholder=" acceptance rate"
                                                value={acceptanceRate}
                                                onChange={(e) => setacceptanceRate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="clearfix"></div>

                            </div>

                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6 text-right">
                                        <button type="submit"

                                            className="btn btn-secondary">Save
                                        </button>
                                        <button type="button" data-bs-toggle="collapse" href="#collapse3" className="btn btn-success">Save &
                                            Next</button>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};


