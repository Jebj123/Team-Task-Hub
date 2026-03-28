
import { Link } from "react-router-dom"
import logo from "../assets/TrustFall.jpg"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
      <nav>
        <div className="flex mb-6  border-white border-b-2 pb-4pt-5 rounded-lg">
          <div className="flex justify-around bg-red-500 p-5 rounded-lg">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-lg " />
          <span className="flex pt-6 pl-10 text-xl font-bold text-white">Team Task Hub</span>
          </div>
          <div className="flex pl-195">
            <Link to="/user/project" className="text-5xl pr-10 pt-8">My Projects</Link>
          </div>
          </div>
        </nav>
          <div>
          </div>
      </header>
      <main>
        {children}
      </main>
      <footer className="flex justify-center align-bottom">

      </footer>
    </div>
  )
}