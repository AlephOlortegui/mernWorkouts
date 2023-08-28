import SRC from '../imgs/patrickworkout1.png'

const Empty = () => {
  return (
    <div className='empty'>
        <h1>No workouts yet</h1>
        <img src={SRC} alt="no-workouts" width={400}/>
    </div>
  )
}

export default Empty