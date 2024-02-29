import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT, SIDEBAR_ITEM } from "./constants";
import { SIDEBAR_ITEMS } from "./constants";
import { useSelector } from "react-redux";
import styles from "./component.module.css";
import { update } from "lodash";

const style = {
  border: "1px dashed black",
  padding: "5px",
  backgroundColor: "white",
  cursor: "move",
  position: "relative", // Add position relative to position the close icon
};

const Component = ({ data, components, path, tab ,layout,setLayout}) => {
  const { tabs } = useSelector((state) => state.formData.value);
  const [sidebaritems, setSidebarItems] = useState();
  const [item, setItem] = useState();
const [sampleLayout,setSampleLayout]=useState(layout)
const [allignment,setallignment]=useState(item?.alignment)
  useEffect(() => {
    if (tabs?.length > 0) {
      let allsidebaritems = tabs[tab]?.fields?.map((item, index) => {
        return {
          ...item,
          type: SIDEBAR_ITEM,
          component: {
            type: item.field_label,
            content: item.field_label,
          },
        };
      });
      setSidebarItems(allsidebaritems);
    }
  }, [tabs]);

  useEffect(() => {
    console.log(item?.alignment);
    if(item?.alignment){
      setallignment(item.alignment)
    }
  }, [item])
  

  
  useEffect(() => {
    if (sidebaritems) {
      const ele = sidebaritems?.filter((item, index) => item.id === data?.id);
      setItem(ele && ele[0]);
    }
  }, [sidebaritems, data]);

  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    item: { type: COMPONENT, id: data.id, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);
  const removeComponent = () => {
    try{
    let todeletecolumn = false;
    let columnIndex;
    let todeleterow = false;
    let rowIndex;
    let todeletecomponent = false;
    let componentIndex
    let updatedLayout = [...layout];
    updatedLayout[tab]?.layout.forEach((row, rIndex) => {
      console.log(row,rIndex,"row");
      console.log(row.length,"row leng th");
        row.children.forEach((column, cIndex) => {
            column.children.forEach((component, compIndex) => {
                if (data.id === component.id) {
                    if (column.children.length === 1) {
                        todeletecolumn = true;
                    }
                    if (row.children.length === 1  &&  column.children.length === 1) {
                        todeleterow = true;
                    }
                    columnIndex = cIndex;
                    rowIndex = rIndex; 
                    todeletecomponent = true;
                    componentIndex=compIndex  
                }
            });
        });
    });
    console.log(updatedLayout,"updatedsampleLayout");
    console.log(todeletecolumn,"todeletecolumn");
    console.log(todeleterow,"todeleterow");
    console.log(columnIndex,"columnIndex");
    console.log(rowIndex,"rowIndex");
    console.log(todeletecomponent,"todeletecomponent");
    if (todeleterow) {
      updatedLayout[tab].layout = updatedLayout[tab]?.layout?.filter((_, index) => index !== rowIndex);
  } else if (todeletecolumn) {
        updatedLayout[tab]?.layout[rowIndex]?.children?.splice(columnIndex, 1);
    } else if (todeletecomponent) {
        updatedLayout[tab]?.layout[rowIndex]?.children[columnIndex]?.children?.splice(componentIndex, 1);
    }
    setLayout(updatedLayout);
  }catch(error){
    console.log(error);
  }
};

const handleToggle=()=>{
  if(item.alignment === "Horizontal"){
    item.alignment="Vertical"
    setallignment("Vertical")
  }else{
    item.alignment = "Horizontal"
    setallignment("Horizontal")
  }
}


  const component = components && components[data.id];

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="component draggable"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className={styles.closeIcon}>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() =>removeComponent()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      {item?.input_type === "text" ? (
        <div>
          {item?.value_type == "number" ? (
            <div className={`${styles.formInputContainer}`}>
              <label className="fw-bold">{item.display_name}</label>
              <input
                type="number"
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
                key={item.id}
                placeholder={`Enter ${item.display_name}`}
              ></input>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* <div>{data.id}</div>   */}
          {/* <div>{component.content}</div> */}
        </>
      )}

      {item?.input_type == "password" && (
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
      {item?.input_type == "checkbox" && (
        <div className={styles.formInputContainer}>
          <label className="fw-bold">{item.display_name}</label>
          {/* toogle button */}
          {/* <div>
          <input type="checkbox"  />
          </div> */}
          <div className={styles.togglecontaiiner}>
          <p>Allignment</p>
          <div className={`d-flex`}>
          <p>Horizontal</p>
          <div className={styles.container}>
            <input type="checkbox" id="cup" onChange={handleToggle} />
            <label for="cup"></label>
          </div>
          <p>Vertical</p>
          </div>
          </div>
          <div style={{ marginTop: "0.5rem" }} className={allignment ==="Horizontal" ?styles.verticalAllignmentContainer: styles.horizontalAllignmentContainer}>
            {item.options.map((item) => (
              <div className={styles.multioptionsitem}>
                <input disabled={true} type="checkbox" value={item} />
                <label className={styles.formOptions} key={item}>
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      {item?.input_type == "radio" && (
        <div>
          <label className="fw-bold">{item.display_name}</label>
          <div style={{ marginTop: "0.5rem" }}>
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
      {item?.input_type == "select" && (
        <div>
          <label className="fw-bold">{item.display_name}</label>
          <div>
            <select style={{ margin: "1rem 0rem", padding: "0.25rem" }}>
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
  );
};
export default Component;
