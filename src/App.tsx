import Layout from './Layout/Layout'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ViewProjectDetails } from "./user/ViewProjectDetails"
import NewProject from './user/newProject'




function App() {
  return (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/user/project" element={<NewProject />} />
        <Route path="/user/task/:projectId" element={<ViewProjectDetails />} />
      </Routes>
    </Layout>
   </BrowserRouter>
  )
}

export default App
