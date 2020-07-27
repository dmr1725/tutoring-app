import {combineReducers} from 'redux'
import signInReducer from './signInReducer'
import teacherCoursesReducer from './TeacherReducers/teacherCoursesReducer'
import sendEmailReducer from './TeacherReducers/sendEmailReducer'
import studentsPaidReducer from './TeacherReducers/studentsPaidReducer'
import studentsNotPaidReducer from './TeacherReducers/studentsNotPaidReducer'
import teachingTodayReducer from './TeacherReducers/teachingTodayReducer'
import studentsPresentReducer from './TeacherReducers/studentsPresentReducer'
import studentsNotPresentReducer from './TeacherReducers/studentsNotPresentReducer'
import allStatsReducer from './TeacherReducers/allStatsReducer'
import createCourseReducer from './TeacherReducers/createCourseReducer'
import editSpotsReducer from './TeacherReducers/editSpotsReducer'
import getNameReducer from './getNameReducer'
import coursesToEnrollReducer from './StudentReducer/coursesToEnrollReducer'
import enrollReducer from './StudentReducer/enrollReducer'
import myCoursesReducer from './StudentReducer/myCoursesReducer'
import unPaidCourseReducer from './StudentReducer/unPaidCoursesReducer'
import payCourseReducer from './StudentReducer/payCourseReducer'
import todayStudentReducer from './StudentReducer/todayStudentReducer'
import checkPresenceReducer from './StudentReducer/checkPresenceReducer'
import updateCodeReducer from './StudentReducer/updateCodeReducer'
import confirmCodeReducer from './StudentReducer/confirmCodeReducer'

const reducers = combineReducers({
    signInReducer,
    teacherCoursesReducer,
    sendEmailReducer,
    studentsPaidReducer,
    studentsNotPaidReducer,
    teachingTodayReducer,
    studentsPresentReducer,
    studentsNotPresentReducer,
    allStatsReducer,
    createCourseReducer,
    editSpotsReducer,
    getNameReducer,
    coursesToEnrollReducer,
    enrollReducer,
    myCoursesReducer,
    unPaidCourseReducer,
    payCourseReducer,
    todayStudentReducer,
    checkPresenceReducer,
    updateCodeReducer,
    confirmCodeReducer
})

export default reducers