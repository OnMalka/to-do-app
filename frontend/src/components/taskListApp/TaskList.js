import React from "react";

const TaskList = ({ tasks, onClickDeleteTask, onChangeSetCompleted }) => {
    return (
        <div className='task-list'>
            {
                tasks?.length > 0 ?
                tasks.map((task) => (
                    <div  key={ task._id }>
                        <form>
                            <p className={ task.completed ? 'greyed-out' : ''}>{ task.description }</p>
                            <div>
                                <label>Completed</label>
                                <input 
                                    task-id={ task._id } 
                                    onChange={ onChangeSetCompleted } 
                                    defaultChecked={ task.completed }
                                    type='checkbox'
                                />
                                <button task-id={ task._id } onClick={ onClickDeleteTask } type='submit'>X</button>
                            </div>
                        </form>
                    </div>                    
                )) :
                <p>No tasks</p>
            }
        </div>
    );
};

export default TaskList;