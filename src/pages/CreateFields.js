import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Components } from "../components";
import { master_fields } from "../data";
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../redux/formDataSlice';

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
	// const [showDependencies, setShowDependencies] = useState(true)

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

	const addField = (field) => {
		let temp = [...selectedFields]
		temp.push(field)
		setSelectedFields(temp)
		setFieldSearchText('')
	}

	const updateFieldValue = (e, id, key) => {
		let temp = [...selectedFields]
	}

	const saveTab = (e) => {
		setSavingTab(true)
		e.preventDefault()
		let temp = []
		if (reduxFormData.tabs) {
			temp = [...reduxFormData.tabs]
		}
		let thisTabData = { tab_name: tabName, tab_desc: tabDesc, fields: selectedFields }
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
		setTimeout(() => {setSavingTab(false); navigate('/createForm')}, 1000);
	}

    return (
        <div>
			<div style={{margin: 'auto', width: '95%', padding: '0 0 5% 0'}}>
				<div style={{margin: '2% 0'}}>
					<div style={{display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#EBEDF4', padding: '25px 15px', borderRadius: '5px', margin: '10px 0'}}>
						<div>
							<Components.Input placeholder="Enter tab name" value={tabName} onChange={(e) => setTabName(e.target.value)} />
						</div>
						<div>
							<textarea type='text' placeholder="Enter tab description" value={tabDesc} onChange={(e) => setTabDesc(e.target.value)} style={{padding: '5px', outline: 'none', borderRadius: '5px', width: '450px', height: '50px', border: '1px solid black'}} />
						</div>
					</div>
				</div>
				<div>
					<div style={{padding: '1%'}}>
					<div>
						<Components.Input type='text' value={fieldSearchText} onChange={e => setFieldSearchText(e.target.value)} placeholder="Search field"/>
					</div>
					<div style={{position: 'absolute', zIndex: '1', cursor: 'pointer', backgroundColor: 'white', border: '1px solid #EBEDF4', borderRadius: '5px', transition: 'all 1s ease-in-out'}}>
						{filteredFields.map(f => {
							return (
								<div style={{padding: '5px', width: '200px'}} onClick={() => addField(f)}>{f.display_name}</div>
							)
						})}
					</div>
					{/* <div style={{float: 'right'}}><Components.Button onClick={() => setShowDependencies(!showDependencies)}>Show Dependencies</Components.Button></div> */}
					</div>
					<table style={{width: '100%', textAlign: 'center'}}>
						<thead style={{backgroundColor: '#EBEDF4'}}>
							<th style={{width: '15%', padding: '7px 0', borderRadius: '5px 0 0 0'}}>Field name</th>
							<th style={{width: '25%', padding: '7px 0'}}>Description</th>
							<th style={{width: '10%', padding: '7px 0'}}>Input type</th>
							<th style={{width: '20%', padding: '7px 0'}}>Value Options</th>
							<th style={{width: '10%', padding: '7px 0'}}>Show<br/>Field Name</th>
							<th style={{width: '10%', padding: '7px 0'}}>Show<br/>Description</th>
							<th style={{width: '10%', padding: '7px 0', borderRadius: '0 5px 0 0'}}>Required</th>
						</thead>
						<tbody>
							{selectedFields && selectedFields.map((s, i) => {
								return (
									<>
										<tr style={{backgroundColor: i % 2 === 0 ? '#F3F4EB' : 'white'}}>
											<td style={{padding: '10px 0'}} rowSpan={s.preRequisites && s.preRequisites.length > 0 ? 2 : 1}>{s.display_name}</td>
											<td style={{padding: '10px 0'}}>{s.description}</td>
											<td>{s.input_type}</td>
											<td>{s.options?.join(', ')}</td>
											<td><input type='checkbox' onChange={(e) => updateFieldValue(e, s.id, "showFieldName")}/></td>
											<td><input type='checkbox' /></td>
											<td><input type='checkbox' /></td>
										</tr>
										{s.preRequisites && s.preRequisites.length > 0 &&
											<tr style={{backgroundColor: i % 2 === 0 ? '#F3F4EB' : 'white'}}>
												<td colSpan={6} style={{padding: '10px 0'}}>
													<b>Dependencies:</b>
													{s.preRequisites.map(spre => {
														let preReq = master_fields.filter(m => m.field_label === spre.field_label)
														return (
															<span>
																<span style={{color: 'red'}}>{spre.logic?.toUpperCase()} </span>
																<span>{preReq[0].display_name} is </span>
																<span>{spre.value} </span>
															</span>
														)
													})}
												</td>
											</tr>
										}
									</>
								)
							})}
						</tbody>
					</table>
				</div>
				<div style={{float: 'right', margin: '1%'}}>
					<Components.Button onClick={(e) => saveTab(e)} disabled={savingTab}>{savingTab ? '...' : 'Save'}</Components.Button>
				</div>
			</div>
		</div>
    )
}