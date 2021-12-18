const express = require('express');
const Task = require('../models/taskModel');

const router = express.Router();

router.post('/tasks/new', async (req, res) => {
    const task = new Task({
        ...req.body
    });

    try{
        await task.save();
        res.send(task);
    }catch(err){
        res.status(400).send(err);
    };
});

router.delete('/tasks/delete', async (req, res) => {    
    const _id = req.query.id;

    try{
        const task = await Task.findByIdAndDelete(_id);

        if(!task)
            return res.status(404).send({
                status: 404,
                message: "Task not found"
                        });
        
        res.send();

    }catch(err){
        res.status(500).send(err);
    };
});

router.patch('/tasks/edit', async (req, res) => {
    const allowdUpdates = ['completed'];    

    try{
        if(Object.getOwnPropertyNames(req.body).length > allowdUpdates.length)
            return res.status(400).send({
                status: 400,
                message: "Too many properties",
                allowdUpdates
            });

        for(let update in req.body){
            if(!allowdUpdates.includes(update)){
                return res.status(400).send({
                    status: 400,
                    message: "Update property invalid",
                    property: update
                });
            }
        }

        const _id = req.query.id;
        const task = await Task.findByIdAndUpdate(
            _id, 
            req.body, 
            {new:true, runValidators:true}
            );

        await task.save();

        res.send(task);
    }catch(err){
        res.status(400).send({
            status: 400,
            message: err.message
        });
    };
});

router.get('/tasks/all', async (req, res) => { 

    try{
        const tasks = await Task.find();
        res.send(tasks);
    }catch(err){
        res.status(500).send(err);
    };
});

module.exports = router;