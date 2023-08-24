import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TaskCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
`;
const MessageDiv = styled.div`
  text-align: center;
  font-size: 18px;
  color: #555;
  padding: 20px;
`;

const ListTasks: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: number; name: string }[]>([]);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id}>{task.name}</TaskCard>
        ))
      ) : (
        <MessageDiv>No tasks found. Start by creating a new task!</MessageDiv>
      )}
    </div>
  );
};

export default ListTasks;
