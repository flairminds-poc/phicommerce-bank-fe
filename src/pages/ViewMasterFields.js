import React from "react";
import { master_fields } from "../data";

export function MasterFields() {
    return (
        <div>
            <table style={{margin: '15px', textAlign: 'center', fontSize: 'small'}}>
                <thead style={{position: 'sticky', top: 0, backgroundColor: 'white'}}>
                    <th style={{padding: '8px', width: '3%'}}>#</th>
                    <th style={{padding: '8px', width: '10%'}}>Field name</th>
                    <th style={{padding: '8px', width: '15%'}}>Display name</th>
                    <th style={{padding: '8px', width: '12%'}}>Description</th>
                    <th style={{padding: '8px', width: '8%'}}>Input Type</th>
                    <th style={{padding: '8px', width: '8%'}}>Value Type</th>
                    <th style={{padding: '8px', width: '10%'}}>Options</th>
                    <th style={{padding: '8px', width: '20%'}}>Validation(s)</th>
                    <th style={{padding: '8px', width: '15%'}}>Dependencies</th>
                </thead>
                <tbody>
                    {master_fields.map((mf, i) => {
                        return (
                            <tr style={{backgroundColor: i % 2 === 0 ? '#F3F4EB' : 'white'}}>
                                <td>{i+1}</td>
                                <td style={{padding: '5px'}}>{mf.field_label}</td>
                                <td style={{padding: '5px'}}>{mf.display_name}</td>
                                <td style={{padding: '5px'}}>{mf.description}</td>
                                <td style={{padding: '5px'}}>{mf.input_type}</td>
                                <td style={{padding: '5px'}}>{mf.value_type}</td>
                                <td style={{padding: '5px'}}>{mf.options?.join(', ')}</td>
                                <td style={{padding: '5px'}}>{mf.validation.map(v => {
                                    return (
                                        <div>
                                            <div>{v.logic}</div>
                                            <div style={{backgroundColor: '#ECECEC', textAlign: 'left', margin: '2px 0', borderRadius: '5px', padding: '5px 8px'}}>
                                                <div><b>Type: </b>{v.key}</div>
                                                <div><b>Condition: </b>{v.type}</div>
                                                <div><b>{v.value ? `Value: ` : `Field: `}</b>{v.value ? v.value : v.field_label}</div>
                                                <div><b>Error message: </b>{v.error_message}</div>
                                            </div>
                                        </div>
                                    )
                                })}</td>
                                <td style={{padding: '5px'}}>{mf.preRequisites?.map(p => {
                                    return (
                                        <div>
                                            <div>{p.logic}</div>
                                            <div style={{backgroundColor: '#ECECEC', textAlign: 'left', margin: '2px 0', borderRadius: '5px', padding: '5px 8px'}}>
                                                <div><b>Field: </b>{p.field_label}</div>
                                                <div><b>Value: </b>{p.value}</div>
                                            </div>
                                        </div>
                                    )
                                })}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}