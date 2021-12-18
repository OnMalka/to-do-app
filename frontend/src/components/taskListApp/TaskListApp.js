import React, { useEffect, useState } from 'react';
import { addTaskToDB, deleteTaskFromDB, editTaskComletedInDB, getTasksFromDb } from '../../server/db';
import Loader from '../main/Loader';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

const TaskListApp =  ({ tasksCounter, setTasksCounter }) => {
      const [tasks, setTasks] = useState([])
      const [showLoader, setShowLoader] = useState(true);
      const [isInputValid, setIsInputValid] = useState(false);
      const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
      const [errorMessage, setErrorMessage] = useState('');

      const hanldeErrors = (err) => {
            if(err.message === 'Network Error')
                  setErrorMessage('Server error! Please try again later');
            else
                  setErrorMessage(err?.status >= 500 ? 'Server error! Please try again later' : err.response.data.message);
            setDisplayErrorMessage(true);
            setTimeout(()=>{
                  setDisplayErrorMessage(false);
                  setErrorMessage('');
            }, 5000);
      };

      useEffect(() => {
            getTasksFromDb().then((theTasks) => {
                  setShowLoader(false);
                  if(theTasks.message === 'Network Error')
                        return hanldeErrors({ status: 500 });
                  if(theTasks?.data?.length > 0){
                        setTasks(theTasks.data);
                        let counter = 0;
                        for(let task of theTasks.data)
                              if(task.completed === false)
                                    counter++;
                        setTasksCounter(counter); 
                  };
                  
            }).catch((err) => {
                  hanldeErrors(err);
            });
      }, [setTasksCounter]);

      const onchangeSetIsInputValid = (event) => {
            // console.log('value: ', event.target.value.trim());
            setIsInputValid(event.target.value.trim() !== '');
      };

      const onSubmitAddTask = async (event) => {
            event.preventDefault();
            event.target.children[1].className = 'button--loading';
            const description = event.target.children[0].value;
            const result = await addTaskToDB(description);
            if(result.status === 200){
                  event.target.children[0].value = '';
                  setIsInputValid(false);
                  setTasks([...tasks, result.data]);
                  setTasksCounter(tasksCounter + 1);
            }else
                  hanldeErrors(result);
            event.target.children[1].className = '';
      };

      const onClickDeleteTask = async (event) => {
            event.preventDefault();
            event.target.className = 'button--loading';
            const taskId = event.target.getAttribute('task-id');
            const result = await deleteTaskFromDB(taskId);
            if(result.status === 200){
                  if(tasks.find((task)=>task._id === taskId).completed === false)
                        setTasksCounter(tasksCounter - 1);
                  setTasks(tasks.filter((task)=>task._id !== taskId));
            }else
            hanldeErrors(result);;
      };

      const onChangeSetCompleted = async (event) => {
            const taskId = event.target.getAttribute('task-id');
            const completed = event.target.checked;
            const result = await editTaskComletedInDB(taskId, completed);
            if(result.status === 200){
                  const theTasks = tasks;
                  theTasks.find((task) => task._id === taskId).completed = completed;
                  setTasks(theTasks);
                  setTasksCounter(tasksCounter + (completed ? -1 : 1));
            }else
            hanldeErrors(result);;
      };

      return (
            showLoader ?
            <Loader /> :
            (<div className='task-list-app'>
                  <div>Task List</div>
                  <TaskList
                        tasks={ tasks } 
                        onClickDeleteTask={ onClickDeleteTask } 
                        onChangeSetCompleted={ onChangeSetCompleted } 
                  />
                  <AddTaskForm
                        onchangeSetIsInputValid={ onchangeSetIsInputValid } 
                        isInputValid={ isInputValid } 
                        onSubmitAddTask={ onSubmitAddTask } 
                  />
                  {displayErrorMessage && <p className='error-message'>{ errorMessage }</p>}
            </div>)        
      );
};

export default TaskListApp;