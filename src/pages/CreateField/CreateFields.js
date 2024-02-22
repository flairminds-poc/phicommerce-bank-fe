import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Components } from "../../components";
import { master_fields } from "../../data";
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../redux/formDataSlice';
import DeleteIcon from '../../assets/delete-icon.png';
import AddValidationModal from "../../components/ValidationModal/AddValidationModal";
import styles from './CreateField.module.css'
export function CreateFields() {
	const reduxFormData = useSelector((state) => state.formData.value)
	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()

	const [tabName, setTabName] = useState('')
	const [tabDesc, setTabDesc] = useState('')

	const [fieldSearchText, setFieldSearchText] = useState('')
	const [filteredFields, setFilteredFields] = useState([])
	const [selectedFields, setSelectedFields] = useState([])
	const [savingTab, setSavingTab] = useState(false)
	const [samplevalidation, setSamplevalidation] = useState({
		key: '',
		type: '',
		value: '',
		error_message: '',
		logic: ""
	})
	const [validationindex, setindex] = useState()
	const [validationField, setValidationField] = useState()
	const [isLogic, setIsLogic] = useState(false)
	const [option, setOption] = useState()
	const [isoptionInputBox, setIsoptionInputBox] = useState(false)
	useEffect(() => {
		if (location.state && location.state.index >= 0) {
			let thisTabData = reduxFormData.tabs[location.state.index]
			if (thisTabData.tab_name) {
				setTabName(thisTabData.tab_name)
			}
			if (thisTabData.tab_desc) {
				setTabDesc(thisTabData.tab_desc)
			}
			if (thisTabData.fields) {
				setSelectedFields(thisTabData.fields)
			}
		}
	}, [location.state, reduxFormData.tabs])

	useEffect(() => {
		if (!fieldSearchText || fieldSearchText === '') { setFilteredFields([]); return }
		let temp = master_fields.filter(m => m.field_label.includes(fieldSearchText) || m.display_name.includes(fieldSearchText))
		setFilteredFields(temp.slice(0, 5))
	}, [fieldSearchText])

	const updateFieldValue = (e, index, key) => {
		let temp = [...selectedFields]
		let thisField = temp[index]
		thisField = {
			...thisField,
			[key]: e.target.checked
		}
		temp.splice(index, 1, thisField)
		setSelectedFields(temp)
	}

	const handlechange = (e, index, key) => {
		let temp = [...selectedFields]
		let thisField = temp[index]
		thisField = {
			...thisField,
			[key]: e.target.value
		}
		temp.splice(index, 1, thisField)
		setSelectedFields(temp)
	}

	const handlevalidationchange = (e, index, key) => {
		setSamplevalidation({ ...samplevalidation, [key]: e.target.value })
	}

	const handleValueOptionChange = (e, index, key) => {
		const valueOptionArr = e.target.value.split(",")
		let temp = [...selectedFields]
		let thisField = temp[index]
		thisField = {
			...thisField,
			[key]: valueOptionArr
		}
		temp.splice(index, 1, thisField)
		setSelectedFields(temp)
	}

	const removeOptions = (field, index, option, key) => {
		let temp = [...selectedFields]
		let thisField = temp[index]
		let filteredField = thisField[key]?.filter((item, index) => item !== option)
		thisField = {
			...thisField,
			[key]: filteredField
		}
		temp.splice(index, 1, thisField)
		setSelectedFields(temp)
	}

	const addoption = (e, field, index, key) => {
		if (e.key === 'Enter') {
			let temp = [...selectedFields]
			let thisField = temp[index]
			console.log(thisField);
			if (!thisField.options) {
				thisField = { ...thisField, options: [e.target.value] }
			} else {
				if(thisField.options.includes("Others")){
					thisField.options.pop()
					thisField.options.push(option)
					thisField.options.push("Others")
				}else{
					thisField.options.push(option)
				}
			}
			thisField = {
				...thisField,
				[key]: thisField.options
			}
			temp.splice(index, 1, thisField)
			console.log(temp);
			setSelectedFields(temp)
			setIsoptionInputBox(false)
		}
	}
	const handleAddOptionChange = (e, field, index, key) => {
		setOption(e.target.value);
	}

	const addvalidation = (i) => {
		console.log(samplevalidation);
		
		console.log(samplevalidation);
		let temp = [...selectedFields]
		let thisField = temp[validationindex]
		thisField = {
			...thisField,
			"validation": [...thisField.validation, samplevalidation]
		}
		temp.splice(validationindex, 1, thisField)
		setSelectedFields(temp)

	}

	const addField = (field) => {
		let temp = [...selectedFields]
		let thisField = {
			...field,
			order: selectedFields.length + 1,
			showFieldName: true,
			showField: true,
			showDescription: true,
			required: false,
		}
		temp.push(thisField)
		setSelectedFields(temp)
		setFieldSearchText('')
	}

	const deleteField = (e, index) => {
		e.preventDefault();
		let temp = [...selectedFields]
		temp.splice(index, 1)
		setSelectedFields(temp)
	}


	const saveTab = (e) => {
		setSavingTab(true)
		e.preventDefault()
		let temp = []
		if (reduxFormData.tabs) {
			temp = [...reduxFormData.tabs]
		}
		let order = 1
		if (!temp || temp.length === 0) order = 1
		else {
			if (location.state && location.state.index >= 0) order = location.state.index + 1
			else order = temp.length + 1
		}
		let thisTabData = { tab_name: tabName, tab_desc: tabDesc, order: order, fields: selectedFields }
		if (!temp || temp.length === 0) {
			temp = [thisTabData]
		} else {
			if (location.state && location.state.index >= 0) {
				temp.splice(location.state.index, 1, thisTabData);
			} else {
				temp.push(thisTabData)
			}
		}
		dispatch(updateFormData({ ...reduxFormData, tabs: temp }))
		setTimeout(() => { setSavingTab(false); navigate('/createForm') }, 500);
	}

	const openvalidation = (i, s) => {
		setindex(i)
		setValidationField(s)
		if (s.validation.length > 0) {
			setIsLogic(true)
		} else {
			setIsLogic(false)
		}
	}



	return (
		<div>
			<div className={styles.mainContainer}>
				<div className={styles.headContainer}>
					<div>
						<Components.Input placeholder="Enter tab name" value={tabName} onChange={(e) => setTabName(e.target.value)} />
					</div>
					<div>
						<textarea type='text' className={`form-control ${styles.DesctextArea}`} placeholder="Enter tab description" value={tabDesc} onChange={(e) => setTabDesc(e.target.value)} />
					</div>
				</div>
				<div>
					<div style={{ padding: '1%' }}>
						<div>
							<Components.Input type='text' value={fieldSearchText} onChange={e => setFieldSearchText(e.target.value)} placeholder="Search field" />
						</div>
						<div className={styles.filteredFieldsDropdown} >
							{filteredFields.map(f => {
								return (
									<div className={styles.dropdownfield} onClick={() => addField(f)}>{f.display_name}</div>
								)
							})}
						</div>
					</div>
					<table className={styles.table}>
						<thead className={styles.tHead}>
							<th >Field name</th>
							<th >Field label</th>
							<th >Description</th>
							<th>Input type</th>
							<th >Value Options</th>
							<th >Show<br />Field Name</th>
							<th >Show<br />Description</th>
							<th>Required</th>
							<th></th>
						</thead>
						<tbody>
							{selectedFields && selectedFields.map((s, i) => {
								let rowspan = 1
								if (s.preRequisites && s.preRequisites.length > 0) rowspan++
								if (s.validation && s.validation.length >= 0) rowspan++
								return (
									<>
										<tr className={i % 2 === 0 ? styles.evenTableRow : styles.oddTableRow}>
											<td rowSpan={rowspan}>
												<input className={i % 2 === 0 ? styles.evenfieldnameinputbox : styles.oddfieldnameinputbox} type='text' value={s.display_name} placeholder={s.display_name} onChange={(e) => handlechange(e, i, "display_name")} 
												onFocus={(e) => e.target.classList.add(styles.focusBorder)} 
												onBlur={(e) => e.target.classList.remove(styles.focusBorder)} 
												/>
											</td>
											<td>{s.field_label}</td>
											<td >{s.description}</td>
											<td>{s.input_type}</td>
											<td className={`${styles.valueOptionsTd}`}>
												<div className={`${styles.valueOptions}`}>
													{
														s?.options?.length > 0 &&
														s.options.map((item, j) => {
															return (<span >{item}
																<button type="button" class="close" aria-label="Close" className={styles.closeIcon} onClick={() => removeOptions(s, i, item, "options")}> <span aria-hidden="true">&times;</span></button>
															</span>)
														})
													}
													{
														(s.input_type ==="select" || s.input_type ==="radio" || s.input_type ==="checkbox") && 
														<button type="button" className={`btn ${styles.addOptionBtn}`} onClick={() => setIsoptionInputBox(i)}>+ Add option</button>
													}
													{isoptionInputBox === i &&
														<div className={`${styles.optionsinputBoxcontainer} ${i % 2 === 0 ? styles.eveninputbox : styles.oddinputbox}`} >
															<input type="text" className={`${styles.optionsInputBox}`} name="options" onChange={(e) => handleAddOptionChange(e, s, i, "options")} onKeyDown={(e) => addoption(e, s, i, "options")}></input>
															<button type="button" className={`close ${styles.closeIcon}`} aria-label="Close" onClick={() => setIsoptionInputBox(false)}> <span aria-hidden="true">&times;</span></button>
														</div>
													}
												</div>


											</td>
											<td><input type='checkbox' checked={s.showFieldName} onChange={(e) => updateFieldValue(e, i, "showFieldName")} /></td>
											<td><input type='checkbox' checked={s.showDescription} onChange={(e) => updateFieldValue(e, i, "showDescription")} /></td>
											<td><input type='checkbox' checked={s.required} onChange={(e) => updateFieldValue(e, i, "required")} /></td>
											<td rowSpan={rowspan}><button onClick={(e) => deleteField(e, i)} className={styles.deleteIcon} ><img src={DeleteIcon} alt="delete" width={20} /></button></td>
										</tr>
										{s.preRequisites && s.preRequisites.length > 0 &&
											<tr className={`${i % 2 === 0 ? styles.evenTableRow : styles.oddTableRow} ${styles.validationfield}`}>
												<td colSpan={7} className="p-2">
													<b>Dependencies:</b>
													<div className="d-flex flex-column" >
														{s.preRequisites.map((spre, i) => {
															let preReq = master_fields.filter(m => m.field_label === spre.field_label)
															return (
																<span className={styles.validatioMsg}>
																	<span>{i + 1}]</span>
																	<span className="text-danger">{spre.logic?.toUpperCase()} </span>
																	<span>{preReq[0].display_name} is </span>
																	<span>{spre.value} </span>
																</span>
															)
														})}
													</div>
												</td>
											</tr>
										}
										{s.validation && s.validation.length > 0 &&
											<tr className={`${i % 2 === 0 ? styles.evenTableRow : styles.oddTableRow} ${styles.validationfield}`}>
												<td colSpan={7} className="p-2">
													<b>Validations: </b>
													<div className="d-flex flex-column">
														{s.validation.map((spre, i) => {
															return (
																<span>
																	<span className={styles.validatioMsg}>{i + 1}]{spre.error_message} </span>
																</span>
															)
														})}
													</div>
													<button type="button" className={`btn ${styles.addBtn}`} data-bs-toggle="modal" data-bs-target="#validation" onClick={() => setindex(i)}>
														+ADD
													</button>

												</td>
											</tr>}
										{
											s.validation.length === 0 ?
												<tr  className={`${i % 2 === 0 ? styles.evenTableRow : styles.oddTableRow} ${styles.validationfield}`}>
													<td colSpan={7}  className="p-2">
														<b>Validations: </b>
														<button type="button" className={`btn ${styles.addBtn}`} data-bs-toggle="modal" data-bs-target="#validation" onClick={() => openvalidation(i, s)}>
															+ADD
														</button>
													</td>

												</tr> : ""
										}
									</>
								)
							})}
						</tbody>
					</table>
				</div>
				<div className={styles.footer}>
					<div className={styles.cancelBtn}>
						<Components.LinkButton text="Cancel" linkTo='/createForm' />
					</div>
					<div  className={styles.saveBtn}>
						<Components.Button onClick={(e) => saveTab(e)} disabled={savingTab}>{savingTab ? '...' : 'Save'}</Components.Button>
					</div>
				</div>
			</div>
			<AddValidationModal addvalidation={addvalidation} handlevalidationchange={handlevalidationchange} samplevalidation={samplevalidation} setsampleValidation={setSamplevalidation} field={validationField} index={validationindex} isLogic={isLogic} />
		</div>
	)
}