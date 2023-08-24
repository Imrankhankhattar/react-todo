import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TaskInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const CreateButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const CreateTask: React.FC = () => {

    const [task, setTaskName] = useState('');
    const [tasks, setTasks] = useState<{ id: number; name: string }[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const handleCreateTask = () => {
        if (task.trim() !== '') {
            const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 0;
            const newTask = { id: newId, name: task }
            const newTasks = [...tasks, newTask];
            setTasks(newTasks);
            setTaskName('');
            localStorage.setItem('tasks', JSON.stringify(newTasks))
            navigate('/list-tasks');
        } else {
            console.log('invalid task')
        }
    }

    return (
        <CenteredContainer>
            <InputContainer>
                <TaskInput
                    type="text"
                    placeholder="Task Name"
                    value={task}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <CreateButton onClick={handleCreateTask}>Create Task</CreateButton>
            </InputContainer>
        </CenteredContainer>
    );
};

export default CreateTask;
