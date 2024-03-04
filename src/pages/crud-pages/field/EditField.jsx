import { useState } from "react"
import "../../../style/EditField.scss"
import { useParams } from "react-router-dom"
import { ModifyField } from "../../../components/crud/fields-CRUD"

const EditField = () => {
  const [data, setData] = useState({
    field: "",
  })
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    ModifyField(id, data)
  }

  return (
    <div className='edit-field'>
      <div className="wrapper">
        <div className="title">
          <h1>Edit Field</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="field">Field:</label>
            <input type="text" name='field' placeholder="Edit Field" onChange={handleChange} />
            <button type='submit' style={{ backgroundColor: "#007bff" }}>Edit Field</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditField