import { useState, useEffect } from "react"
import React from "react"
const API = process.env.REACT_APP_API;


export const Contents = () => { 
    
    const [name, setName]= useState("")
    const [description, setDescription]= useState('')
    const [award, setAward]= useState('')
    const [dialog, setDialog]= useState('')

    const[contests, setContests]=useState([])
    const[editing, setEditing]=useState(false)
    const[id, setId]=useState('')


    const handleSubmit = async (e) => { 
        e.preventDefault();
        if(!editing){
            console.log(name)
            console.log(description)
            console.log(award)
            console.log(dialog)
            const res = await fetch(`${API}/create_contest_post/`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        name,
                        description,
                        award,
                        dialog
                    }
                )
            })
            const data = await res.json();
            console.log(data)
        }else{
            const res= await fetch(`${API}/edit_contest/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contest_name:name,
                    desciption:description,
                    award,
                    dialog,
                    'id_contest'   : id, 
                    'id_user'      : 9,                        
                    'banner_name'  : "banner,name",  
                    'url_contest'  : "/prueba.jpeg", 
                    'start_date'   : '', 
                    'end_date'     : '',  
                })

            })
            const data=await res.json();
            console.log(data)
            setEditing(false);
        }
        await getContents();
        setName('');
        setAward('');
        setDialog('');
        setDescription('');
        
    }
    const getContents = async () => {
        const res = await fetch(`${API}/home`)
        const data = await res.json();
        setContests(data)

    }
   
    useEffect(() =>{
        getContents();
    }, [])

    const deleteContest = async (id) =>{
        const userResponse = window.confirm('¿Seguro que quiere eliminar el evento?')
        if(userResponse===true){
        const res = await fetch(`${API}/delete_contest/${id}`,{
            method:'DELETE'

        })
        await res.json();
        await getContents();
        }
    }
    const editContest = async (id) =>{
        
        const res = await fetch(`${API}/view_contest/${id}`)
        const data = await res.json();
        setEditing(true);
        setId(id);
        
        setName(data.contest_name)
        setDescription(data.desciption)
        setAward(data.award)
        setDialog(data.dialog)

        
    }

    return(
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className= "card card-body">
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e=> setName(e.target.value)}
                        value={name}
                        className='form-control'
                        placeholder="Nombre del Evento"
                        
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e=> setDescription(e.target.value)}
                        value={description}
                        className='form-control'
                        placeholder="Description"
                        
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e=> setAward(e.target.value)}
                        value={award}
                        className='form-control'
                        placeholder="Award"
                        
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e=> setDialog(e.target.value)}
                        value={dialog}
                        className='form-control'
                        placeholder="dialog"
                        />
                    </div>
                    <div className="card">
                        <label>Start date:</label>
                        <input 
                        type="date" 
                        id="start" 
                        name="trip-start" 
                        defaultValue="YYYY-MM-DD" min="2018-01-01" max="2099-12-31" />
                        </div>
                    <div className="card">
                        <label >End date:</label>
                        <input 
                        type="date" 
                        id="End" 
                        name="trip-start" 
                        defaultValue="YYYY-MM-DD" min="2018-01-01" max="2099-12-31" />
                        </div>

                    <div className="input-group mb-3">
                        <input 
                        type="file" 
                        className="form-control" 
                        id="inputGroupFile02" />
                    </div>
                    
                    <button className="btn btn-primary btn-block">
                        CREAR
                    </button>
                </form>
            </div>
            <div className="col-md-4">
                <table className="table  table-striped">
                    <thead>
                    <tr >
                        <th>NAME</th>
                        <th>Description</th>
                        <th>Award</th>
                        <th>dialog</th>
                        <th>Operator</th>
                    </tr>
                    </thead>
                    <tbody>
                        {contests.map(contest =>(
                            <tr key={contest.id_contest}>
                                <td>{contest.contest_name}</td>
                                <td>{contest.desciption}</td>
                                <td>{contest.award}</td>
                                <td>{contest.dialog}</td>
                                <td>
                                <button 
                                className="btn btn-secondary btn-sm btn-block"
                                
                                onClick={(e)=>editContest(contest.id_contest)}
                                >
                                    Editar
                                </button>
                                <button 
                                className="btn btn-danger btn-sm btn-block"
                                onClick={(e)=>deleteContest(contest.id_contest)}
                                >
                                    Eliminar
                                </button>
                                </td>
                                
                        </tr>
                        ))}
                </tbody>
                </table>
            </div>
            

        </div>


    )
    }