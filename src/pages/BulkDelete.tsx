import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TaskCardWithCheckbox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
`;
const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 16px;
  cursor: pointer;
`;
const MessageDiv = styled.div`
  text-align: center;
  font-size: 18px;
  color: #555;
  padding: 20px;
`;
const Checkbox = styled.input`
  margin-right: 15px
`;
const BulkDelete: React.FC = () => {
    const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
    const [tasks, setTasks] = useState<{ id: number; name: string }[]>([]);
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const handleTaskSelection = (taskId: number) => {
        if (selectedTasks.includes(taskId)) {
            setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
        } else {
            setSelectedTasks([...selectedTasks, taskId]);
        }
    };

    const handleBulkDelete = () => {
        const updatedTasks = tasks.filter(task => !selectedTasks.includes(task.id));
        setTasks(updatedTasks);
        setSelectedTasks([]);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <div>
          {tasks && tasks.length > 0 ? (
            <>
              {tasks.map((task) => (
                <TaskCardWithCheckbox key={task.id}>
                  <Checkbox
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                onChange={() => handleTaskSelection(task.id)}
              />
                  <span>{task.name}</span>
                </TaskCardWithCheckbox>
              ))}
              <Button onClick={handleBulkDelete}>Delete Selected</Button>
            </>
          ) : (
            <MessageDiv>No tasks found. Start by creating a new task!</MessageDiv>
          )}
        </div>
      );
      
};

export default BulkDelete;
