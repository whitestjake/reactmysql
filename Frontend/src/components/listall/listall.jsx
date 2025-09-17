

import './listall.css';
import React, {useEffect, useState} from 'react'    // Imports the React library

const ListAll = () => {

    const [data, setData] = useState([]);            //  Initializes a state variable called data and a function setData to update this state.
        
       useEffect(() => {                               // define the userEffect hook, useEffect(() => { ... }, [])
          fetch('http://localhost:8081/listall')       // call backend route
          .then(response => response.json())           // Converts the response from the fetch request into JSON format.
          .then(data => setData(data))                 // Updates the state variable data with the fetched data using the setData function.
          .catch(err => console.log(err));             // logs the error msg to the console.
       }, [])                                          // The empty dependency array [] means it only runs once when the component is first rendered.

    return(                                             // to be rendered in the UI
        <div>
            <div>
                <table className="styled-table">
                    <thead>
                    <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>birthday</th>
                    <th>gpa</th>
                    </tr>
                    </thead> 
                    <tbody>
                        {data.map((d, i) => (         // Maps over the data array to create a table row (<tr>) for each item d in data. The index i is used as a unique key for each row.
                                <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{new Date(d.birthday).toLocaleDateString()}</td>
                                <td>{d.gpa}</td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default ListAll