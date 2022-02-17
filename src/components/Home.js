import { useState, useEffect } from "react"
import React from "react"
const API = process.env.REACT_APP_API;

export const Home = () => {

    const [nameContent, setNameContent]= useState("")
    const [descriptionContent, setDescriptionContent]= useState('')
    const [nombreLocutor, setNombreLocutor]= useState('')
    const [emailLocutor, setEmailLocutor]= useState('')
    const [observacionLocutor, setObservacionLocutor]= useState('')

    const[contests, setContests]=useState([])
    const[aplicando, setAplicar]=useState(false)
    const[idContent, setIdContent]=useState('')


    const handleSubmit = async (e) => { 
        e.preventDefault();
        if(!aplicando){
            window.alert('Por Favor seleccione un evento')
        }else{

            const res = await fetch(`${API}/apply/`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        nameContent,
                        descriptionContent,
                        nombreLocutor,
                        emailLocutor,
                        observacionLocutor,
                        idContent
                    }
                )
            })
            const data = await res.text();
            console.log(data)
            setAplicar(false);
        }
        await getContents();
        setNameContent('');
        setNombreLocutor('');
        setEmailLocutor('');
        setDescriptionContent('');
        setObservacionLocutor('');
        
    }
    const getContents = async () => {
        const res = await fetch(`${API}/home`)
        const data = await res.json();
        setContests(data)

    }
   
    useEffect(() =>{
        getContents();
    }, [])

    const aplyContest = async (id) =>{
        
        const res = await fetch(`${API}/apply/${id}`)
        const data = await res.json();
        setAplicar(true);
        setIdContent(id);
        setNameContent(data.contest_name)
        setDescriptionContent(data.desciption)      
    }

    return(
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className= "card card-body">
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e=> setNameContent(e.target.value)}
                        value={nameContent}
                        className='form-control'
                        placeholder="Nombre del Evento"
                        
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e=> setDescriptionContent(e.target.value)}
                        value={descriptionContent}
                        className='form-control'
                        placeholder="Description del Evento"
                        
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e=> setNombreLocutor(e.target.value)}
                        value={nombreLocutor}
                        className='form-control'
                        placeholder="Nombre Locutor"
                        
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e=> setEmailLocutor(e.target.value)}
                        value={emailLocutor}
                        className='form-control'
                        placeholder="Email Locutor"
                        />
                    
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e=> setObservacionLocutor(e.target.value)}
                        value={observacionLocutor}
                        className='form-control'
                        placeholder="Observación del Locutor"
                        
                        />
                    </div>
                    
                    <div className="input-group mb-3">
                        <input 
                        type="file" 
                        className="form-control" 
                        id="inputGroupFile02" />
                    </div>
                    
                    <button className="btn btn-primary btn-block">
                        apply
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
                                
                                onClick={(e)=>aplyContest(contest.id_contest)}
                                >
                                    Aplicar
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