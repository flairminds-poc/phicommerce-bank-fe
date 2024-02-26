import { useEffect, useState } from "react";
import styles from "./FormLayout.module.css";
import { DragDropContext, Droppable, Draggable, } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { convertIdsToString } from "../util";
import SortableContainer from "./Container";

const constainersArray =[
  {
  id: 1001,
  container:true,
  row:true,
	field_label: 'row',
	input_type: 'row',
  },
  {
  id: 1002,
  container:true,
  column:true,
	field_label: 'column',
	input_type: 'column',
  }
]


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


const FormLayout = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState({
    items: []
  });
  const [formItems, setFormItems] = useState([]);
  const { tabs } = useSelector((state) => state.formData.value);

  useEffect(() => {
    // console.log(convertIdsToString(tabs[0].feilds));
    console.log(tabs, 'hhh');
    if(tabs?.length > 0){
      let newarr=[...constainersArray]
      newarr=newarr.concat(...convertIdsToString(tabs[0].fields))
      setItems(convertIdsToString(newarr));
    }
  }, []);

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    else if (result.destination.droppableId.includes("formcontainer-droppable")) {
      let droppableId=result.destination.droppableId.split('-')[2];
      
      let draggableId
      if(droppableId){
        if(result.draggableId.includes("main")){
          draggableId=result.draggableId.split('-')[1];
          let itemarr = items.filter((item) => item.id == draggableId);
          let item={...itemarr[0],parent : droppableId }
          const valExists = formItems.some((value) => value == item[0]);
          // const reorderedItems = reorderfromstatic(items, result.source.index, result.destination.index);
          const reorderedItems = addElementAtIndex(formItems, result.destination.index,item);
          if (!valExists) {
            setFormItems(reorderedItems);
            return
          }
        }else if(result.draggableId.includes("form")){
          const valExists = formItems.filter((value) => value.id == draggableId);
          let item={...valExists[0],parent:droppableId}
        // const reorderedItems = reorderfromstatic(items, result.source.index, result.destination.index);
        const reorderedItems = insertAtSpecificIndex(formItems,result.source.index ,result.destination.index,item);
        if (reorderedItems) {
          setFormItems(reorderedItems);
          return
        }
        }
      }
     
    }

   

    // if (result.destination.droppableId === "droppable") {

    // }
    else if (result.destination.droppableId === "form-droppable") {
      let draggableId
      if(result.draggableId.includes("main")){
          draggableId=result.draggableId.split('-')[1];
          const item = items.filter((item) => item.id == draggableId);
          const valExists = formItems.some((value) => value == item[0]);
          // const reorderedItems = reorderfromstatic(items, result.source.index, result.destination.index);
          const reorderedItems = addElementAtIndex(formItems, result.destination.index,item[0]);

          if (!valExists) {
            setFormItems(reorderedItems);
            return
          }
      }else if(result.draggableId.includes("form")){
        draggableId=result.draggableId.split('-')[1];
        // const item = items.filter((item) => item.id == draggableId);
        const valExists = formItems.filter((value) => value.id == draggableId);
       
        // const reorderedItems = reorderfromstatic(items, result.source.index, result.destination.index);
        const reorderedItems = insertAtSpecificIndex(formItems,result.source.index ,result.destination.index);
        if (reorderedItems) {
          setFormItems(reorderedItems);
          return
        }
      }
      const item = items.filter((item) => item.id == draggableId);

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

  
  function getItems(parent) {
    console.log(formItems);
    return formItems.filter((item) => {
      if (!parent) {
        return !item.parent;
      }

      return item.parent === parent;
    });
  }


  // useEffect(() => {
  //   setData((prev) => {
  //     const activeIndex = data.items.findIndex((item) => item.id === id);
  //     const overIndex = data.items.findIndex((item) => item.id === overId);
  //     let newIndex = overIndex;
  //     const isBelowLastItem =
  //       over &&
  //       overIndex === prev.items.length - 1 &&
  //       draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

  //     const modifier = isBelowLastItem ? 1 : 0;

  //     newIndex = overIndex >= 0 ? overIndex + modifier : prev.items.length + 1;

  //     let nextParent;
  //     if (overId) {
  //       nextParent = overIsContainer ? overId : overParent;
  //     }

  //     prev.items[activeIndex].parent = nextParent;
  //     const nextItems = arrayMove(prev.items, activeIndex, newIndex);

  //     return {
  //       items: nextItems
  //     };
  //   });
  // }, [third])
  

  function addElementAtIndex(arr, index, element) {
    const result = Array.from(formItems);
    result.splice(index, 0, element);
    return result;
}


function insertAtSpecificIndex(array, elementToMove, targetIndex,item) {
  if (elementToMove < 0 || elementToMove >= array.length || targetIndex < 0 || targetIndex > array.length) {
    throw new Error("Invalid index provided!");
  }

  const element = array.splice(elementToMove, 1)[0]; 
  if(item){
    array.splice(targetIndex, 0, item);
  }else{
    array.splice(targetIndex, 0, element);
  }
  return array; 
}




  return (
    <>
      <div className={styles.main_content}>
        <div style={{ display: "flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={{marginTop:"2rem"}}>
                  {items?.map((item, index) => (
                    <Draggable key={item.id} draggableId={`main-${item.id}`} index={index}>
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
                        <Draggable key={item.id} draggableId={`form-${item.id}`} index={index}>
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
                                    row={true}
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
              </form>
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
