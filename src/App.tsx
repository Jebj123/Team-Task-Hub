import Layout from './Layout/Layout'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyTasks from "./user/newProjectButton"
import UserDashboard from './user/UserDashboard'
import ViewTaskDetails from "./user/ViewTaskDetails"



function App() {
  return (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/tasks" element={<MyTasks />} />
        <Route path="/user/task/:taskId" element={<ViewTaskDetails />} />
      </Routes>
    </Layout>
   </BrowserRouter>
  )
}

export default App
