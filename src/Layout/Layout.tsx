
import { Link } from "react-router-dom"
import logo from "../assets/TrustFall.jpg"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border rounded-sm w-full h-full">
      <header className="">
        <div className="flex mb-6  border-white border-b-2 pb-4pt-5 rounded-lg">
          <div className="flex justify-around bg-red-500 p-5 rounded-lg border">
          <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-lg " />
          <span className="flex pt-6 pl-10 text-xl font-bold text-white">Team Task Hub</span>
          </Link>
          </div>
          </div>
          <div>
          </div>
      </header>
      <main className="pb-10">
        <div className="flex pt-20 pl-10 gap-10">
          <div className="flex ">
            <nav className="">
            <Link to="/user/project" className="text-5xl pr-10 underline hover:text-blue-300">My Projects</Link>
            </nav>
          </div> 
        {children}
        </div>
      </main>
      <footer className="flex justify-center align-bottom ">
        <p className="text-sm text-gray-500">© 2024 Team Task Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}