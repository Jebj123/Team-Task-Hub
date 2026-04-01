
import { Link } from "react-router-dom"
import logo from "../assets/TrustFall.jpg"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <header>
        <div className="flex mb-6  border-white border-b-4 pb-4pt-5 rounded-lg">
          <div className="flex justify-around bg-red-500 p-5 rounded-lg border w-full">
          <Link to="/" className="flex items-center gap-2 ">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-lg border-2 " />
          <span className="flex pt-6 pl-10 text-xl font-bold text-white">Team Task Hub</span>
          </Link>
          </div>
          </div>
          <div>
          </div>
      </header>
      <main className="flex min-h-[calc(100vh-180px)] w-full pb-10">
        <div className="flex w-85 shrink-0 border-r-4 border-gray-500 pt-20 pl-10">
          <div className="flex w-full">
            <nav className="flex flex-col gap-10 text-gray-700 text-2xl  pt-35">
            <Link to="/user/project" className="text-5xl pr-10 underline hover:text-blue-300">My Projects</Link>
            </nav>
          </div> 
        </div>
        <div className="min-w-0 flex-1 px-8">
        {children}
        </div>
      </main>
      <footer className="flex justify-center items-center pl-20">
        <p className="text-sm text-gray-500">© 2024 Team Task Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}