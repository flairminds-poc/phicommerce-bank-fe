import { Container } from "react-bootstrap";
import styles from './FormLayout.module.css'
import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
export default function SortableContainer(props) {
 const {key,id,getItems,row,ref} = props
    const [items,setItems]=useState()
    // const itemIds = items.map((item) => item.id);

    useEffect(() => {
      setItems(getItems(id))
    }, [])
    // console.log(items);
  
    // const { isOver, setNodeRef } = useDroppable({
    //   id
    // });
    // if (isOver) {
    //   console.log("is over", id);
    // }

  
    
  
    return (
        <Container
          style={{ backgroundColor: row ? "black" : "transparent",height:"50px" }}
        >
              <Droppable droppableId={`formcontainer-droppable-${id}`}>
                  {(provided, snapshot) => (
                    <form ref={provided.innerRef} {...provided.droppableProps}>
                      {getItems(id)?.map((item, index) => (
                        <Draggable key={item.id} draggableId={`formcontainer-${item.id}`} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.inputContainer}
                            >{
                             item.container ?
                                  <SortableContainer
                                    key={item.id}
                                    id={item.id}
                                    getItems={getItems}
                                    row={item.row}
                                    ref={provided}
                                  /> :(
                                    <>
                                  {item.input_type == "text" && (
                                <div>
                                  {item.value_type == "number" ? (
                                    <div className={styles.formInputContainer}>
                                      <label className="fw-bold">{item.display_name}</label>
                                      <input
                                        type="number"
                                        readOnly
                                        className={styles.input}
                                        key={item.id}
                                        placeholder={`Enter ${item.display_name}`}
                                      ></input>
                                    </div>
                                  ) : (
                                    <div className={styles.formInputContainer}>
                                      <label className="fw-bold">{item.display_name}</label>
                                      <input
                                        className={styles.input}
                                        readOnly
                                        key={item.id}
                                        placeholder={`Enter ${item.display_name}`}
                                      ></input>
                                    </div>
                                  )}
                                </div>
                              )}
                              {item.input_type == "password" && (
                                <div className={styles.formInputContainer}>
                                  <label className="fw-bold">{item.display_name}</label>
                                  <input
                                    type="password"
                                    readOnly
                                    className={styles.input}
                                    key={item.id}
                                    placeholder={`Enter ${item.display_name}`}
                                  ></input>
                                </div>
                              )}
                              {item.input_type == "checkbox" && (
                                <div className={styles.formInputContainer}>
                                  <label className="fw-bold">{item.display_name}</label>
                                  <div style={{marginTop:"0.5rem"}}>
                                    {item.options.map((item) => (
                                      <>
                                        <input disabled={true} type="checkbox" value={item} />
                                        <label className={styles.formOptions} key={item}>
                                          {item}
                                        </label>
                                      </>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {item.input_type == "radio" && (
                                <div>
                                  <label className="fw-bold">{item.display_name}</label>
                                  <div style={{marginTop:"0.5rem"}}>
                                    {item.options.map((item) => (
                                      <>
                                        <input
                                          disabled={true}
                                          readOnly
                                          type="radio"
                                          value={item}
                                          name="radioGroupName"
                                        />
                                        <label className={styles.formOptions} key={item}>
                                          {item}
                                        </label>
                                      </>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {item.input_type == "select" && (
                                <div>
                                  <label className="fw-bold">{item.display_name}</label>
                                  <div>
                                    <select style={{margin:"1rem 0rem" ,padding:"0.25rem"}}>
                                      {item.options.map((el) => (
                                        <>
                                          <option disabled={true} value={el}>
                                            {el}
                                          </option>
                                        </>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              )}
                              </>
                                      )
                                      }
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </form>
                  )}
                </Droppable>
              {/* <Droppable droppableId="form-droppable">
            {items && items.map((item) => {
  
              if (item.container) {
                return (
                  <SortableContainer
                  key={item.id}
                  id={item.id}
                  getItems={getItems}
                  row={item.row}
                  ref={ref}
                  />
                );
              }else{
                return (
                    (
                        (item.input_type == "text" && (
                      <div>
                        {item.value_type == "number" ? (
                          <div className={styles.formInputContainer}>
                            <label className="fw-bold">{item.display_name}</label>
                            <input
                              type="number"
                              readOnly
                              className={styles.input}
                              key={item.id}
                              placeholder={`Enter ${item.display_name}`}
                            ></input>
                          </div>
                        ) : (
                          <div className={styles.formInputContainer}>
                            <label className="fw-bold">{item.display_name}</label>
                            <input
                              className={styles.input}
                              readOnly
                              key={item.id}
                              placeholder={`Enter ${item.display_name}`}
                            ></input>
                          </div>
                        )}
                      </div>
                    ))
                    (item.input_type == "password" && (
                      <div className={styles.formInputContainer}>
                        <label className="fw-bold">{item.display_name}</label>
                        <input
                          type="password"
                          readOnly
                          className={styles.input}
                          key={item.id}
                          placeholder={`Enter ${item.display_name}`}
                        ></input>
                      </div>
                    ))
                    (item.input_type == "checkbox" && (
                      <div className={styles.formInputContainer}>
                        <label className="fw-bold">{item.display_name}</label>
                        <div style={{marginTop:"0.5rem"}}>
                          {item.options.map((item) => (
                            <>
                              <input disabled={true} type="checkbox" value={item} />
                              <label className={styles.formOptions} key={item}>
                                {item}
                              </label>
                            </>
                          ))}
                        </div>
                      </div>
                    ))
                    (item.input_type == "radio" && (
                      <div>
                        <label className="fw-bold">{item.display_name}</label>
                        <div style={{marginTop:"0.5rem"}}>
                          {item.options.map((item) => (
                            <>
                              <input
                                disabled={true}
                                readOnly
                                type="radio"
                                value={item}
                                name="radioGroupName"
                              />
                              <label className={styles.formOptions} key={item}>
                                {item}
                              </label>
                            </>
                          ))}
                        </div>
                      </div>
                    ))
                    (item.input_type == "select" && (
                      <div>
                        <label className="fw-bold">{item.display_name}</label>
                        <div>
                          <select style={{margin:"1rem 0rem" ,padding:"0.25rem"}}>
                            {item.options.map((el) => (
                              <>
                                <option disabled={true} value={el}>
                                  {el}
                                </option>
                              </>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                            )
                  );
              }
  
              
            })}
          </Droppable> */}
          
        </Container>
    );
  }
  