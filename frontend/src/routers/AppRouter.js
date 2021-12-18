import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import PageNotFound from "../components/main/PageNotFound";
import TaskListApp from "../components/taskListApp/TaskListApp";

const AppRouter = () => {
    const [tasksCounter, setTasksCounter] = useState(0);

    return(
        <BrowserRouter>
            <Header tasksCounter={ tasksCounter } />
            <Routes>
                <Route path='/tasks' element={<TaskListApp tasksCounter={ tasksCounter } setTasksCounter={ setTasksCounter } />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default AppRouter;