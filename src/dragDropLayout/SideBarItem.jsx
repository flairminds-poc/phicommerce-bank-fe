import React from "react";
import { useDrag } from "react-dnd";
import styles from "./sidebarItem.module.css"
import shortid from "shortid";

const SideBarItem = ({ data,layout,setLayout,tab }) => {
  const [{ opacity }, drag] = useDrag({
    item: data,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  

  const addfieldinLayout = () => {
    let isexist = layout[tab]?.layout?.some((obj) => {
      return obj.children.some((obj1) => {
        if (
          obj1.children &&
          obj1.children.some((child) => child.id === data.id)
        ) {
          if(data.id === "e-1" || data.id ==="e-2" ){
            return false;
          }
          return true;
        }
        return false;
      });
    });
    if (isexist) {
      return;
    }
    let updatedLayout = [...layout];
    console.log(data);
    const component={
        id: data.id,
        type: "component"
    }

    const column={
      type: "column",
      id: shortid.generate(),
      children: [{...component}]
    }

    const row={
      type: "row",
      id: shortid.generate(),
      children:[{...column}]
    }
    
    const updatedLayoutWithRow = [
      ...updatedLayout[tab].layout,
      row
    ];
    updatedLayout[tab] ={ ...updatedLayout[tab], layout: updatedLayoutWithRow}
    setLayout(updatedLayout)
  }
  console.log(data);
  return (
    <div className={styles.sideBarItem} ref={drag} style={{ opacity }}>
      <div>
      <p>{data.display_name}</p>
      <p>{data.input_type}</p>
      </div>
      <div>
      <button type="button" className={styles.addButton} onClick={()=>addfieldinLayout()}>+</button>
      </div>
    </div>
  );
};
export default SideBarItem;
