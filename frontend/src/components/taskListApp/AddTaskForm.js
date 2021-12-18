import React from "react";

const AddTaskForm = ({ onSubmitAddTask, isInputValid, onchangeSetIsInputValid }) => {

    return (
        <form className='add-task-form' onSubmit={ onSubmitAddTask }>
            <input onChange={ onchangeSetIsInputValid } type='text' placeholder='New task'/>
            <button disabled={ !isInputValid } type='submit'>Submit</button>
        </form>
    )
};

export default AddTaskForm;