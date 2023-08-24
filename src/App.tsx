import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link ,Navigate} from 'react-router-dom';
import ListTasks from './pages/ListTasks';
import CreateTask from './pages/CreateTask';
import BulkDelete from './pages/BulkDelete';
import styled from 'styled-components'; // Import Styled Components
const NavContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px 0;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;

  li {
    margin: 0 10px;
  }

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const App: React.FC = () => {
  return (
    <Router>
      <div>
      <NavContainer>
          <NavList>
            <li><Link to="/list-tasks">List Tasks</Link></li>
            <li><Link to="/create-task">Create Task</Link></li>
            <li><Link to="/bulk-delete">Bulk Delete</Link></li>
          </NavList>
        </NavContainer>


        <Routes>
        <Route path="/" element={<Navigate to="/list-tasks" />} />
          <Route path="/list-tasks" element={<ListTasks />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/bulk-delete" element={<BulkDelete />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
