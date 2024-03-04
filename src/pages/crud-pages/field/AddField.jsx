import { useState } from "react"
import "../../../style/AddField.scss"
import { CreateField } from "../../../components/crud/fields-CRUD"

const AddField = () => {
  const [data,setData] = useState({
    field:"",
  })
  const handleSubmit = (e)=>{
    e.preventDefault();
    CreateField(data);
  }
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setData({...data,[name]:value})
  }
  return (
    <div className='add-field'>
      <div className="wrapper">
        <div className="title">
          <h1>Add New Field</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="field">Field:</label>
            <input type="text" name='field' placeholder="Enter New Field" onChange={handleChange}/>
            <button type='submit' style={{ backgroundColor: "#007bff" }}>Add New Field</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddField