import axios from 'axios';

const DB_URL = process.env.REACT_APP_DB;

export const addTaskToDB = async (description) => {
    try{
        const result = await axios.post(DB_URL + 'tasks/new', {
            description
        }, {            
            headers: {
                "Content-Type": "application/json"
            }
        });
        return result;
    }catch(err){
        return err;
    };
};

export const getTasksFromDb = async () => {
    try{
        const tasks = await axios.get(DB_URL + 'tasks/all');
        return tasks;
    }catch(err){        
        return err;
    };
};

export const deleteTaskFromDB = async (taskId) => {
    try{
        const result = await axios.delete(DB_URL + `tasks/delete?id=${taskId}`);
        return result;
    }catch(err){        
        return err;
    };
};

export const editTaskComletedInDB = async (taskId, completed) => {
    try{
        const result = await axios.patch(DB_URL + `tasks/edit?id=${taskId}`, {
            completed
        }, {            
            headers: {
                "Content-Type": "application/json"
            }
        });
        return result;
    }catch(err){        
        return err;
    };
};