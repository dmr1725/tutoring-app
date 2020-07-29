import React from 'react'
import Script1 from './Script'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import TeacherRoute from '../auth/TeacherRoute'
import StudentRoute from '../auth/StudentRoutes'
import Home from './Home'
import Welcome from '../teacher/Welcome'
import Hello from '../student/Hello'
import Login from './Login'
import CoursesTeaching from '../teacher/CoursesTeaching'
import SendEmail from '../teacher/SendEmail'
import PaidStudents from '../teacher/PaidStudents'
import NotPaidStudents from '../teacher/NotPaidStudents'
import TodayCoursesTeacher from '../teacher/TodayCoursesTeacher'
import StudentsPresent from '../teacher/StudentsPresent'
import StudentsNotPresent from '../teacher/StudentsNotPresent'
import AllStats from '../teacher/AllStats'
import CreateCourse from '../teacher/CreateCourse'
import EditSpots from '../teacher/EditSpots'

import CoursesToEnroll from '../student/CoursesToEnroll'
import MyCourses from '../student/MyCourses'
import UnpaidCourses from '../student/UnpaidCourses'
import Checkout from '../student/Checkout'
import TodaySession from '../student/TodaySession'
import UpdateCode from '../student/UpdateCode'
import ConfirmCode from '../student/ConfirmCode'
import Register from './Register'


const App = ()=>{
    
    
    return (
       <div className="ui container">
            <Script1 url={"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"}/>
            <Script1 url={"https://www.athmovil.com/api/js/v2/athmovilV2.js"}/>
            
            <BrowserRouter>
               <div>
                  <Switch>
                     <Route path="/" exact component={Home}/>
                     <Route path="/login" exact component={Login}/>
                     <Route path="/register" exact component={Register}/>
                     <TeacherRoute path="/teacher/welcome" exact component={Welcome}/>
                     <TeacherRoute path="/teacher/courses" exact component={CoursesTeaching}/>
                     <TeacherRoute path="/teacher/sendEmail/:id" exact component={SendEmail}/>
                     <TeacherRoute path="/teacher/paidStudents/:id" exact component={PaidStudents}/>
                     <TeacherRoute path="/teacher/notPaidStudents/:id" exact component={NotPaidStudents}/>
                     <TeacherRoute path="/teacher/todayCourses" exact component={TodayCoursesTeacher}/>
                     <TeacherRoute path="/teacher/studentsPresent/:id" exact component={StudentsPresent}/>
                     <TeacherRoute path="/teacher/studentsNotPresent/:id" exact component={StudentsNotPresent}/>
                     <TeacherRoute path="/teacher/allStudentStats/:id" exact component={AllStats}/>
                     <TeacherRoute path="/teacher/createCourse" exact component={CreateCourse}/>
                     <TeacherRoute path="/teacher/editSpots/:id" exact component={EditSpots}/>
                     <StudentRoute path="/student/hello" exact component={Hello}/>
                     <StudentRoute path="/student/coursesToEnroll" exact component={CoursesToEnroll}/>
                     <StudentRoute path="/student/myCourses" exact component={MyCourses}/>
                     <StudentRoute path="/student/unpaid" exact component={UnpaidCourses}/>
                     <StudentRoute path="/student/checkout/:id" exact component={Checkout}/>
                     <StudentRoute path="/student/todaySession" exact component={TodaySession}/>
                     <StudentRoute path="/student/sendCode/:id" exact component={UpdateCode}/>
                     <StudentRoute path="/student/confirmCode/:id" exact component={ConfirmCode}/>
                  </Switch>
               </div>
            </BrowserRouter>
           
       </div>
    )
}

export default App