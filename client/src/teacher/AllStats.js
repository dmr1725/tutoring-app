import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TeacherHeader from './TeacherHeader'
import {all_stats} from '../actions'

const AllStats = (props)=>{
    const data = useSelector(state => state.allStatsReducer) 
    const dispatch = useDispatch()
    const {id} = props.match.params

    useEffect(()=>{
        dispatch(all_stats(id))
    }, [dispatch, id])


    const renderStats = ()=>{
        if(!data){
            return <h1>Loading list of students...</h1>
        }

        if(data !== null){
            if(data.message){
                return <h1>{data.message}</h1>
            }
        }
        let i = 1
        return (
            <div>
                <h1>List of students for {data.stats[0].course_name}</h1>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Paid</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.stats.map((stat)=>{
                            return (
                                <tr key={stat.id}>
                                    <td data-label="Number">{i++}</td>
                                    <td data-label="Name">{stat.name}</td>
                                    <td data-label="Last Name">{stat.last_name}</td>
                                    <td data-label="Paid">
                                        {stat.paid === 1 ? 
                                         <button className="ui button green">Paid</button>
                                         : 
                                         <button className="ui button negative">Not Paid</button>
                                         }
                                    </td>
                                    <td data-label="Status">
                                        {stat.status === 'PRESENT' ? 
                                         <button className="ui button green">Present</button>
                                         : 
                                         <button className="ui button negative">Not Present</button>
                                         }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )

        
    }

    console.log(data)
    return (
        <div>
            <TeacherHeader/>
            {renderStats()}
        </div>
    )
}

export default AllStats