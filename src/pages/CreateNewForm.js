import React from "react";
import { Components } from "../components";
import { useSelector, useDispatch } from 'react-redux'
import { updateFormData } from '../redux/formDataSlice'
import axios from "axios";

export function CreateNewForm() {
    const reduxFormData = useSelector((state) => state.formData.value)
    const dispatch = useDispatch()

    const updateReduxFormData = (key, value) => {
        dispatch(updateFormData({ ...reduxFormData, [key]: value }))
    }

    const submitForm = async(e) => {
        e.preventDefault()
        console.log(reduxFormData)
        try {
            let response = await axios.post("http://localhost:8080/formConfigurationService/saveConfiguration", reduxFormData)
            if(response.data) {
                alert(response.data)
                window.location.reload()
            }
        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <div style={{margin: '2% 0'}}>
            <div style={{width: '70%', margin: '1% auto'}}>
                <Components.LinkButton customStyle={{backgroundColor: 'grey'}} text="Home" linkTo='/' />
            </div>
            <div style={{border: '1px solid grey', borderRadius: '5px', minWidth: '500px', width: '70%', margin: 'auto', padding: '7px'}}>
                <form>
                    <div style={{fontWeight: 'bold', textAlign: 'center', backgroundColor: '#EBEDF4', padding: '10px', borderRadius: '5px'}}>
                        Form Details
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '15px', margin: '15px 0 0 0', padding: '2%'}}>
                        <div>
                            <Components.Input placeholder="Enter form name" onChange={(e) => dispatch(updateFormData({ ...reduxFormData, form_name: e.target.value }))} value={reduxFormData.form_name} />
                        </div>
                        <div>
                            <textarea type='text' placeholder="Enter form description" style={{padding: '5px', outline: 'none', borderRadius: '5px', width: '350px', height: '60px', border: '1px solid black'}} onChange={(e) => updateReduxFormData("form_description", e.target.value)} value={reduxFormData.form_description}/>
                        </div>
                        <div>
                            <select defaultValue={reduxFormData.bank_name} style={{padding: '5px', cursor: 'pointer', outline: 'none', borderRadius: '5px', width: '200px', border: '1px solid black'}} onChange={(e) => updateReduxFormData("bank_name", e.target.value)}>
                                <option disabled selected value={''}>-- Select Bank --</option>
                                <option value={'HDFC'}>HDFC</option>
                                <option value={'SBI'}>SBI</option>
                                <option value={'ICICI'}>ICICI</option>
                            </select>
                        </div>
                    </div>
                    <div style={{margin: '15px 0 0 0', padding: '2%'}}>
                        <table style={{width: '100%', textAlign: 'center'}}>
                            <thead style={{backgroundColor: '#EBEDF4'}}>
                                <th style={{width: '10%', padding: '7px 0', borderRadius: '5px 0 0 0'}}>S. No.</th>
                                <th style={{width: '25%', padding: '7px 0'}}>Tab name</th>
                                <th style={{width: '30%', padding: '7px 0'}}>Description</th>
                                <th style={{width: '15%', padding: '7px 0'}}>No of Fields</th>
                                <th style={{width: '20%', padding: '7px 0', borderRadius: '0 5px 0 0'}}></th>
                            </thead>
                            <tbody>
                                {reduxFormData.tabs && reduxFormData.tabs.length > 0 ? reduxFormData.tabs.map((t, i) => {
                                    return(
                                        <tr style={{backgroundColor: i % 2 === 0 ? '#F3F4EB' : 'white'}}>
                                            <td style={{padding: '7px 0'}}>{i+1}</td>
                                            <td style={{padding: '7px 0'}}>{t.tab_name}</td>
                                            <td style={{padding: '7px 0'}}>{t.tab_desc}</td>
                                            <td style={{padding: '7px 0'}}>{t.fields.length || 0}</td>
                                            <td style={{padding: '7px 0'}}><Components.LinkButton linkTo="/createForm/addFields" dataToPass={{index: i}} text="Edit" /></td>
                                        </tr>
                                    )
                                }) : <>
                                    <tr style={{backgroundColor: '#F3F4EB'}}>
                                        <td colSpan={5} style={{padding: '7px 0'}}>No tabs added</td>
                                    </tr>
                                </>}
                            </tbody>
                        </table>
                        <div style={{margin: '20px 0'}}>
                            <Components.LinkButton linkTo="/createForm/addFields" text="+ Add Tab" />
                        </div>
                    </div>
                    <div style={{textAlign: 'right', margin: '15px 0 0 0', padding: '2%'}}>
                        <Components.Button onClick={(e) => submitForm(e)}>Submit</Components.Button>
                    </div>
                </form>
            </div>
        </div>
    )
}