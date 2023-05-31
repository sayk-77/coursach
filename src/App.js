import { Routes, Route } from "react-router-dom";
import React from "react";
import AboutAs from "./pages/AboutUs/AboutUs";
import Home from "./pages/home/home";
import Contacts from "./pages/Сontacts/Contacts";
import Language from "./pages/learning/Language/Language";
import Courses from "./pages/learning/Courses/Courses";
import CourseEnBegin from "./pages/learning/Courses/courseEnBegin/CourseEnBegin";
import News from "./pages/learning/news/News";
import NewsDetail from "./pages/learning/news/newsDetail/NewsDetail";
import Invite from "./pages/Invite/Invite";
import Authorization from "./pages/authorization/Authorization";
import Politic from "./pages/Politic/Politic";
import ProfileData from "./pages/Profile/Data/Data";
import ProfileCourses from "./pages/Profile/Courses/Courses";
import ProfileSettings from "./pages/Profile/Settings/Settings";
import Students from "./pages/Admin Panel/Students/Students";
import StudentInfo from "./pages/Admin Panel/StudentInfo/StudentInfo";
import Course from "./pages/Admin Panel/Course/course";
import CourseInfo from "./pages/Admin Panel/Course/courseInfo";
import NewsAdmin from "./pages/Admin Panel/News/news";
import NewsInfo from "./pages/Admin Panel/News/newsInfo";
import AdminLogin from "./pages/Admin Panel/admin-login/adminLogin";
import PageNotFound from "./pages/PageNotFound";
import ReviewsCreate from "./pages/reviews/reviews-create";
import Reviews from "./pages/reviews/reviews";
import ReviewsAdmin from "./pages/Admin Panel/reviews-admin/reviews-admin";
import AddCourse from "./pages/Admin Panel/addCourse/addCourse";
import AddNewsAdmin from "./pages/Admin Panel/addNews/addNews";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<AboutAs />} />
                <Route path="/contact" element={<Contacts />} />
                <Route path="/language" element={<Language />} />
                <Route path="/invite" element={<Invite />} />
                <Route path="/news" element={<News />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseEnBegin />} />
                <Route path="/profile" element={<ProfileData />} />
                <Route path="/login" element={<Authorization />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/politic" element={<Politic />} />
                <Route path="/profileCourse" element={<ProfileCourses />} />
                <Route path="/settings" element={<ProfileSettings />} />
                <Route path="/panel/admin" element={<AdminLogin />} />
                <Route path="/panel/admin/student" element={<Students />} />
                <Route path="/panel/admin/course" element={<Course />} />
                <Route path="/panel/admin/news" element={<NewsAdmin />} />
                <Route path="/panel/admin/news/detail/:id" element={<NewsInfo />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/panel/admin/student/:id" element={<StudentInfo />} />
                <Route path="/panel/admin/course/detail/:id" element={<CourseInfo />} />
                <Route path="/panel/admin/reviews" element={<ReviewsAdmin />} />
                <Route path="/panel/admin/course/add" element={<AddCourse />} />
                <Route path="/panel/admin/news/add" element={<AddNewsAdmin />} />
            </Routes>
        </>
    );
}

export default App;
