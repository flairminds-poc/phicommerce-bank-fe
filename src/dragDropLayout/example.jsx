import React, { useState, useCallback, useEffect } from "react";

import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import SideBarItem from "./SideBarItem";
import Row from "./Row";
import initialData from "./initial-data";
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout,
} from "./helpers";

// import {data} from './../data';

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import shortid from "shortid";
// import { useSelector } from "react-redux";
import { Components } from "../components";
import styles from "./component.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateFormData } from "../redux/formDataSlice";
// import { updateFormData } from "../redux/formDataSlice";
const style = {
  padding: "5px 10px",
  height: "35px",
};

const ActiveBtnstyle = {
  backgroundColor: "#467590",
};




const Container = () => {
  // const { tabs ,Layouts} = useSelector((state) => state.formData.value);
  const reduxFormData = useSelector((state) => state.formData.value);
  const [data,setdata]=useState()
  useEffect(() => {
   setdata(reduxFormData)
  }, [reduxFormData])
  
  console.log(data);
  const [sidebaritems, setSidebarItems] = useState({});
  const [tab, setTab] = useState(0);
  const [tabsData,setTabsData]=useState()
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState();
  const [components, setComponents] = useState({});
  const [layout1, setLayout1] = useState([]);
  const [components1, setComponents1] = useState({});
  const dispatch=useDispatch()
  useEffect(() => {
    setTab(0);
  }, []);

  useEffect(() => {
    if(data){
      setTabsData(data?.tabs)
    }
  }, [data])
  
  useEffect(() => {
    if(data){
      setLayout(data?.Layouts)
    }else{
      const newLayout = data?.tabs?.map((items, index) => ({
        tabId: items.order,
        tabName: items.tab_name,
        tabDesc: items.tab_desc,
        layout: []
      }));
      setLayout(newLayout);
      const newComponenet = data?.tabs?.map((items) => {});
      setComponents(newComponenet);
    }
  }, [data]);

  useEffect(() => {
    console.log("layout", data?.Layouts);
    console.log("components", components);
    console.log("tabsData", tabsData);
  }, [layout, components,tabsData]);
  const navigate = useNavigate();

  const updateReduxFormData = (key, value) => {
    console.log(layout,tabsData);
    dispatch(updateFormData({ ...reduxFormData, ["Layouts"]: layout , ["tabs"]: tabsData }));
  };


  useEffect(() => {
    if (data?.tabs?.length > 0) {
      let allsidebaritems = data?.tabs[tab]?.fields?.map((item, index) => {
        return {
          ...item,
          type: SIDEBAR_ITEM,
          component: {
            type: item.field_label,
            content: item.field_label,
          },
        };
      });
      const extraComponents=[
        {
          id: `e-1`,
          field_label: 'add_section',
          display_name: 'Add Section Title',
          description: '[Validation: Only alphabets]',
          input_type: 'text',
          value_type: 'string',
          type: SIDEBAR_ITEM,
          component: {
            type: "add_section",
            content:"add_section",
          },
        },
        {
          id: `e-2`,
          field_label: 'horizontal_line',
          display_name: 'Add Seprator',
          // input_type: 'Horizontal Line',
          type: SIDEBAR_ITEM,
          component: {
            type: "horizontal_line",
            content:"horizontal_line",
          },
        },
      ]
      
      
      allsidebaritems=[...extraComponents,...allsidebaritems]
      console.log(allsidebaritems);
      setSidebarItems(allsidebaritems);
    }
  }, [tab,data]);
  

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      const updatedLayout = handleRemoveItemFromLayout(
        layout[tab].layout,
        splitItemPath
      );
      setLayout((prev) => {
        const newLayout = [...prev];
        newLayout[tab] = { ...newLayout[tab], layout: updatedLayout };
        return newLayout;
      });
    },
    [layout]
  );

  const toggleTab = (index) => {
    console.log("index", index);
    setTab(index);
  };

  const handleDrop = useCallback(
    (dropZone, item) => {

      let isexist = layout[tab]?.layout?.some((obj) => {
        return obj.children.some((obj1) => {
          if (
            obj1.children &&
            obj1.children.some((child) => child.id === item.id)
          ) {
            if(item.id === "e-1" || item.id ==="e-2" ){
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
      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }
      if (item.type === SIDEBAR_ITEM) {
        const newComponent = {
          id: item.id,
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };

        setComponents((prev) => {
          const components = { ...prev };
          components[tab] = {
            ...components[tab],
            [newComponent.id]: newComponent,
          };
          return components;
        });

        console.log(layout[tab],tab,layout[tab].layout,"tab");
        const updatedLayout1 = handleMoveSidebarComponentIntoParent(
          layout[tab].layout,
          splitDropZonePath,
          newItem
        );
        console.log("updatedLayout1",updatedLayout1,tab);
        setLayout((prev) => {
          const newLayout = [...prev];
          newLayout[tab] = { ...newLayout[tab], layout: updatedLayout1 };
          return newLayout;
        });
        return;
      }
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");
      if (splitItemPath.length === splitDropZonePath.length) {
        if (pathToItem === pathToDropZone) {
          const updatedLayout = handleMoveWithinParent(
            layout[tab].layout,
            splitDropZonePath,
            splitItemPath
          );
          setLayout((prev) => {
            const newLayout = [...prev];
            newLayout[tab] = { ...newLayout[tab], layout: updatedLayout };
            return newLayout;
          });
          return;
        }
        const updatedLayout2 = handleMoveToDifferentParent(
          layout[tab].layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        );
        setLayout((prev) => {
          const newLayout = [...prev];
          newLayout[tab] = { ...newLayout[tab], layout: updatedLayout2 };
          return newLayout;
        });
        return;
      }

      const updatedLayout3 = handleMoveToDifferentParent(
        layout[tab].layout,
        splitDropZonePath,
        splitItemPath,
        newItem
      );
      setLayout((prev) => {
        const newLayout = [...prev];
        newLayout[tab] = { ...newLayout[tab], layout: updatedLayout3 };
        return newLayout;
      });
    },
    [layout, components,tab]
  );

  useEffect(() => {
    handleLayoutAfterChange()
  }, [layout])
  

  const handleLayoutAfterChange = () => {
    try {
      let updatedLayout = [...layout];
      let toDeleteColumns = [];
      let toDeleteRows = [];
  
      updatedLayout[tab]?.layout?.forEach((row, rIndex) => {
        let toDeleteRow = true;
        row?.children?.forEach((column, cIndex) => {
          if (column.children.length === 0) {
            toDeleteColumns.push({ rowIndex: rIndex, columnIndex: cIndex });
          } else {
            toDeleteRow = false;
          }
        });
        if (toDeleteRow) {
          toDeleteRows.push(rIndex);
        }
      });
  
      // Delete columns with no children
      toDeleteColumns.forEach(({ rowIndex, columnIndex }) => {
        updatedLayout[tab]?.layout[rowIndex]?.children?.splice(columnIndex, 1);
      });
  
      // Delete rows with no children
      toDeleteRows.reverse().forEach(rowIndex => {
        updatedLayout[tab]?.layout?.splice(rowIndex, 1);
      });
      if(toDeleteColumns.length>0 || toDeleteRows.length>0){
        setLayout(updatedLayout);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components && components[tab]}
        path={currentPath}
        tab={tab}
        layout={layout}
        setLayout={setLayout}
        tabsData={tabsData}
        setTabsData={setTabsData}
      />
    );
  };
  const submit = () => {
    let flag = true;
    data?.tabs?.forEach((tab, tabIndex) => {
      let allSidebarItems = tab?.fields?.map((item, index) => {
        return {
          ...item,
          type: SIDEBAR_ITEM,
          component: {
            type: item.field_label,
            content: item.field_label,
          },
        };
      });
      allSidebarItems.forEach((el) => {
        let itemFound = false;
        layout[tabIndex]?.layout?.forEach((row) => {
          row?.children?.forEach((column) => {
            column?.children?.forEach((component) => {
              if (component.id === el.id) {
                itemFound = true;
              }
            });
          });
        });
        if (!itemFound) {
          flag = false;
          return;
        }
      });
    });
    if (flag) {
      updateReduxFormData();
      navigate("/createForm");
    } else {
      alert("Not all items are present in the layout.");
      console.log("Not all items are present in the layout.");
    }
  };
  
  return (
    <div className="body">
      <div className={styles.header}>
        <h4>
          {data?.bank_name} - {data?.form_name}
        </h4>
        {/* <p>{data?.form_description}</p> */}
      </div>
      <div className={styles.content}>
        <div className="sideBar">
          <div className={styles.sidebarHeading}>
            <p>Drag & Drop Field</p>
          </div>
          {Object?.values(sidebaritems && sidebaritems).map(
            (sideBarItem, index) => (
              <SideBarItem key={sideBarItem.id} data={sideBarItem} layout={layout} setLayout={setLayout} tab={tab}/>
            )
          )}
        </div>
        <div className="pageContainer">
          <div className="page">
            {layout &&
              layout[tab]?.layout &&
              layout[tab]?.layout?.map((row, index) => {
                const currentPath = `${index}`;

                return (
                  <React.Fragment key={row.id}>
                    <DropZone
                      data={{
                        path: currentPath,
                        childrenCount: layout?.length,
                      }}
                      onDrop={handleDrop}
                      path={currentPath}
                    />
                    {renderRow(row, currentPath)}
                  </React.Fragment>
                );
              })}
            <DropZone
              data={{
                path: `${layout?.length}`,
                childrenCount: layout?.length,
              }}
              onDrop={handleDrop}
              isLast
            />
          </div>
          <div className={`${styles.footerBtns}`}>
            <div className={styles.btnGroup}>
              {data?.tabs &&
                data?.tabs.map((item, index) => {
                  return (
                    <Components.Button
                    key={index}
                      customStyle={{
                        ...style,
                        ...(tab === index && ActiveBtnstyle),
                      }}
                      onClick={() => toggleTab(index)}
                    >
                      {item.tab_name}
                    </Components.Button>
                  );
                })}
            </div>
            {/* <TrashDropZone
              data={{
                layout: layout && layout[tab]?.layout,
              }}
              onDrop={handleDropToTrashBin}
            /> */}
          </div>
          <div  className={styles.submitButton}>
          <Components.Button  onClick={(e) => submit(e)}  >Submit</Components.Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Container;
