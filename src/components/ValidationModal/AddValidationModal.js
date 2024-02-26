import React from 'react'
import styles from './AddValidationModal.module.css'

function AddValidationModal({addvalidation,handlevalidationchange,setsampleValidation,samplevalidation,field,index,isLogic}) {

    const submit =(index)=>{
        console.log(samplevalidation);
        if(!samplevalidation.logic){
			delete  samplevalidation.logic;
		}
        console.log(samplevalidation);
        if (Object.values(samplevalidation).some(v => !v)) {
			alert("should not be null")
			return;
		  }
        addvalidation(index)
        closemodal()    
    }
    const closemodal =()=>{
        setsampleValidation({
            key: '',
            type: '',
            value: '',
            error_message: '',
            logic: ""
        })
    }
    return (
        <div className="modal fade" id="validation" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Validation</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>closemodal()}></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-column">
                            {isLogic ? <div className="d-flex">
                                <p className={styles.inputLabel}>Logic</p>
                                <input type="text" className="form-control  mb-2" value={samplevalidation.logic} onChange={(e) => handlevalidationchange(e, index, "logic")} placeholder="Logic"></input>
                            </div> : ""}
                            <div className="d-flex">
                                <p  className={styles.inputLabel}>Key</p>
                                <input type="text" className="form-control  mb-2" value={samplevalidation.key} onChange={(e) => handlevalidationchange(e, index, "key")} placeholder="key"></input>
                            </div>
                            <div className="d-flex">
                                <p  className={styles.inputLabel}>Type</p>
                                <input type="text" className="form-control  mb-2" value={samplevalidation.type} onChange={(e) => handlevalidationchange(e, index, "type")} placeholder="type"></input>
                            </div>
                            <div className="d-flex">
                                <p  className={styles.inputLabel}>Value</p>
                                <input type="text" className="form-control  mb-2" value={samplevalidation.value} onChange={(e) => handlevalidationchange(e, index, "value")} placeholder="value"></input>
                            </div>
                            <div className="d-flex">
                                <p className={styles.inputLabel}>error message</p>
                                <input type="text" className="form-control  mb-2" value={samplevalidation.error_message} onChange={(e) => handlevalidationchange(e, index, "error_message")} placeholder="error message"></input>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>closemodal()}>Close</button>
                        <button type="button" className={`btn ${styles.saveBtn}`} onClick={() => submit(index)} data-bs-dismiss="modal">Save </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddValidationModal