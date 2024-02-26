import React, { useEffect, useState } from "react";
import { Components } from "../../components";
import { useSelector, useDispatch } from 'react-redux'
import { updateFormData } from '../../redux/formDataSlice'
import axios from "axios";
import styles from './HomePage.module.css'
export function Homepage() {
    const reduxFormData = useSelector((state) => state.formData.value)
    const dispatch = useDispatch()

    const [formExist, setFormExist] = useState(false)

    useEffect(() => {
		async function getFormData() {
			try {
				let response = await axios.get("http://localhost:8080/formConfigurationService/getConfiguration")
				console.log("Response", response.data)
                dispatch(updateFormData({ ...response.data }))
                setFormExist(true)
			} catch (error) {
				console.log(error.message)
			}
		}
		getFormData()
    // eslint-disable-next-line
	}, [])
    return (
        <div className={styles.mainContainer} >
            {formExist ? <Components.LinkButton linkTo='/createForm'
                text={`${reduxFormData?.bank_name || '[bank]'} - ${reduxFormData?.form_name || '[form]'}`} />: <></>}
            <div className={styles.createformBtn} >
                <Components.LinkButton text="CREATE NEW FORM" linkTo='/createForm' buttonAction={() => dispatch(updateFormData({}))} />
            </div>
        </div>
    )
}