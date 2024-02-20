import { useEffect, useState } from "react";
import styles from "./FormLayout.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { convertIdsToString } from "../util";


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const FormLayout = () => {
  const [items, setItems] = useState([]);
  const [formItems, setFormItems] = useState([]);
  const { tabs } = useSelector((state) => state.formData.value);

  useEffect(() => {
    // console.log(convertIdsToString(tabs[0].feilds));
    console.log(tabs, 'hhh');
    setItems(convertIdsToString(tabs[0]?.fields));
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // if (result.destination.droppableId === "droppable") {

    // }
    else if (result.destination.droppableId === "form-droppable") {
      const item = items.filter((item) => item.id == result.draggableId);

      const valExists = formItems.some((value) => value == item[0]);
      console.log(valExists, item[0], items, "lulz");

      const reorderedItems = reorder(items, result.source.index, result.destination.index);

      console.log({ reorderedItems });
      // setFormItems(reorderedItems);

      if (!valExists) {
        setFormItems((prev) => [...prev, item[0]]);
      }
    }
  };

  return (
    <>
      <div className={styles.main_content}>
        <div style={{ display: "flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={{marginTop:"2rem"}}>
                  {items?.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles.inputContainer}
                        >
                          {item.display_name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div className={styles.formContainer}>
              <h2
                style={{
                  textAlign: "center",
                }}
              >
                Form
              </h2>
              <form>
                <Droppable droppableId="form-droppable">
                  {(provided, snapshot) => (
                    <form ref={provided.innerRef} {...provided.droppableProps}>
                      {formItems?.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.inputContainer}
                            >
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
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </form>
                  )}
                </Droppable>
              </form>
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
