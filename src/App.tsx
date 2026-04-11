import Layout from './Layout/Layout'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ViewProjectDetails } from "./Pages/ProjectTasksPage"
import NewProject from './Pages/ProjectRoute'
import Home from './Home/Home'
import NotFound from './Pages/404'




function App() {
  return (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/project" element={<NewProject />} />
        <Route path="/user/task" element={<NotFound />} />
        <Route path="/user/task/:projectId" element={<ViewProjectDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
   </BrowserRouter>
  )
}

export default App
