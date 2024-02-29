import React from "react";
import { Components } from "../../components";
import { useSelector, useDispatch } from 'react-redux'
import { updateFormData } from '../../redux/formDataSlice'
import axios from "axios";
import styles from './CreateNewFrom.module.css'
import { useNavigate } from "react-router-dom";
export function CreateNewForm() {
    const reduxFormData = useSelector((state) => state.formData.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateReduxFormData = (key, value) => {
        dispatch(updateFormData({ ...reduxFormData, [key]: value }))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        console.log(reduxFormData)
        try {
            let response = await axios.post("http://localhost:8080/formConfigurationService/saveConfiguration", reduxFormData)
            if (response.data) {
                alert(response.data)
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.createFormContainer}>
            <div className={styles.homeBtn}>
                <Components.LinkButton customStyle={{ backgroundColor: 'grey' }} text="Home" linkTo='/' />
            </div>
            <div className={styles.formContainer} >
                <form>
                    <div className={styles.formHeading} >
                        Form Details
                    </div>
                    <div className={styles.formBody} >
                        <div>
                            <Components.Input placeholder="Enter form name" onChange={(e) => dispatch(updateFormData({ ...reduxFormData, form_name: e.target.value }))} value={reduxFormData.form_name} />
                        </div>
                        <div>
                            <textarea type='text' placeholder="Enter form description" className={`form-control ${styles.descTextArea}`} onChange={(e) => updateReduxFormData("form_description", e.target.value)} value={reduxFormData.form_description} />
                        </div>
                        <div>
                            <select defaultValue={reduxFormData.bank_name} className={`form-control ${styles.selectBank}`} onChange={(e) => updateReduxFormData("bank_name", e.target.value)}>
                                <option disabled selected value={''}>-- Select Bank --</option>
                                <option value={'HDFC'}>HDFC</option>
                                <option value={'SBI'}>SBI</option>
                                <option value={'ICICI'}>ICICI</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.tableContainer} >
                        <table className={styles.table} >
                            <thead className={styles.tHead}>
                                <th>S. No.</th>
                                <th>Tab name</th>
                                <th>Description</th>
                                <th>No of Fields</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {reduxFormData.tabs && reduxFormData.tabs.length > 0 ? reduxFormData.tabs.map((t, i) => {
                                    return (
                                        <tr className={i % 2 === 0 ? styles.evenTableRow : styles.oddTableRow}>
                                            <td>{i + 1}</td>
                                            <td>{t.tab_name}</td>
                                            <td>{t.tab_desc}</td>
                                            <td>{t.fields.length || 0}</td>
                                            <td><Components.LinkButton linkTo="/createForm/addFields" dataToPass={{ index: i }} text="Edit" /></td>
                                        </tr>
                                    )
                                }) : <>
                                    <tr className={styles.noTabAdded} >
                                        <td colSpan={5}>No tabs added</td>
                                    </tr>
                                </>}
                            </tbody>
                        </table>
                        <div className={styles.addTabBtn} >
                            <Components.LinkButton linkTo="/createForm/addFields" text="+ Add Tab" />
                        </div>
                    </div>
                    <div className={styles.submitBtn} >
                        <Components.Button onClick={(e) => submitForm(e)}>Submit</Components.Button>
                        <Components.Button onClick={()=>navigate('/layoutForm')}>Create layout</Components.Button>
                    </div>
                </form>
            </div>
        </div>
    )
}