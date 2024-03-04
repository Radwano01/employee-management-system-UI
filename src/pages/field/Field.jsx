import { useNavigate } from "react-router-dom";
import "../../style/Field.scss";
import { useEffect, useState } from "react";
import { DeleteField, GetField } from "../../components/crud/fields-CRUD";
import { toast } from "react-toastify";

const Field = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const navigate = useNavigate();

    const toggleNavigateToAdd = () => {
        navigate("/homepage/add-field");
    };

    const toggleNavigateToEdit = (id) => {
        navigate(`/homepage/edit-field/${id}`);
    };

    const toggleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Field?");
        if (isConfirmed) {
            DeleteField(id);
            GetField().then(result => setData(result));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Result = await GetField();
                setData(Result);
            } catch (error) {
                toast.error("An error occurred, Please try again later. " + error);
            }
        };
        fetchData();
    }, []);

    // Pagination Logic
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const changePage = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="field">
            <div className="title">
                <h1>Fields List</h1>
            </div>
            <div className="wrapper">
                <button style={{ backgroundColor: "green" }} onClick={toggleNavigateToAdd}>Add New Field</button>
                <div className="list">
                    <h2>Fields:</h2>
                    {currentItems && currentItems.length > 0 ?
                        currentItems.map((item) => {
                            return (
                                <div className="map-data" key={item.id}>
                                    <h3>{item.field}</h3>
                                    <div className="actions">
                                        <button style={{ background: "#3498db", color: "#ffffff" }} onClick={() => toggleNavigateToEdit(item.id)}>Edit</button>
                                        <button style={{ background: "#e74c3c", color: "#ffffff" }} onClick={() => toggleDelete(item.id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        }) :
                        <p>No data available</p>
                    }
                </div>
                <ul className="pagination">
                    {Array(Math.ceil(data.length / perPage))
                        .fill()
                        .map((_, i) => (
                            <li key={i} className="page-item">
                                <button onClick={() => changePage(i + 1)} className="page-link">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default Field;
