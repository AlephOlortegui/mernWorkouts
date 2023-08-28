import { useState, useEffect } from 'react';
import useWorkoutsContext from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const {dispatch, state: {workoutToEdit}} = useWorkoutsContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  //I want to force a re-render => useEffect
  useEffect(()=>{
    //since useEffect its going to run on 1rst render 
    if(workoutToEdit){
      setTitle(workoutToEdit.title)
      setLoad(workoutToEdit.load)
      setReps(workoutToEdit.reps)
    }else return
  },[workoutToEdit])

  const setDefaultValues = () => { 
    setError(null)
    setTitle('')
    setLoad('')
    setReps('')
    setEmptyFields([])
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const newWorkout = {title, load, reps}
    const res = await fetch('/api/workouts', {
      method: "POST",
      body: JSON.stringify(newWorkout),
      headers: {'Content-Type': 'application/json'}
    })
    const json = await res.json()
    console.log(json)
    if(!res.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if(res.ok) {
      setDefaultValues()
      //console.log('new workout added:', json)
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  const handleEdit = async (e) => { 
    e.preventDefault();
    let id = workoutToEdit._id;
    const editedWorkout = {title, load, reps}
    const res = await fetch(`/api/workouts/${id}`,{
      method: "PATCH",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(editedWorkout)
    })
    const json = await res.json()
    //console.log(json) //{_id,editedWorkout, others props}
    if(!res.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if(res.ok) {
        setDefaultValues()
        console.log('workout updated:', json)
        dispatch({type: 'PATCH_WORKOUT', payload: json})
    }
  }

  const cancelEdit = () => { 
    setDefaultValues()
    dispatch({type: "CANCEL_EDIT"})
  }

  return (
    <form className='form' onSubmit={!workoutToEdit ? handleSubmit : handleEdit}>
        <h3>{!workoutToEdit ? "Add a New Workout" : "Edit Workout"}</h3>
        <label>Excersize Title:</label>
        <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Load (in kg):</label>
        <input 
            type="number" 
            onChange={(e) => setLoad(e.target.value)} 
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
        />

        <label>Number of Reps:</label>
        <input 
            type="number" 
            onChange={(e) => setReps(e.target.value)} 
            value={reps} 
            className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <button type="submit">{!workoutToEdit ? "Add Workout" : "Edit Workout"}</button>
        { workoutToEdit && <button className='cancel' type='button'
          onClick={cancelEdit}>Cancel</button> }
        {error && <div className="error" onClick={()=> setDefaultValues()}>{error}</div>}
    </form>
  )
}

export default WorkoutForm