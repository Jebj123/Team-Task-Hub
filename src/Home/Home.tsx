import Handshake  from "../assets/Handshake.jpg"

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full gap-10 pl-70'>
        <h1 className='text-5xl font-bold underline'>Welcome to Team Task Hub</h1>
        <p className='text-xl text-gray-600'>Your ultimate project management tool for seamless collaboration and efficient task tracking.</p>
        <img src={Handshake} alt="Handshake" className='w-150 h-117 rounded-lg shadow-lg border-3 border-gray-700 mb-19' />
    </div>
  )
}

export default Home