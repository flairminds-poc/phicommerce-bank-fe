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

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import shortid from "shortid";
import { useSelector } from "react-redux";
import { Components } from "../components";
import styles from "./component.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFormData } from "../redux/formDataSlice";
const style = {
  padding: "5px 10px",
  height: "35px",
};

const ActiveBtnstyle = {
  backgroundColor: "#467590",
};

const samplelayout = {
  tabId: "",
  tabName:"",
  tabDesc:"",
  layout: []
}
const Container = () => {
  const { tabs ,Layouts} = useSelector((state) => state.formData.value);

  const reduxFormData = useSelector((state) => state.formData.value);
  console.log("tabs",tabs);
  const [sidebaritems, setSidebarItems] = useState({});
  const [tab, setTab] = useState(0);
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState();
  const [components, setComponents] = useState({});
  const [layout1, setLayout1] = useState([]);
  const [components1, setComponents1] = useState({});

  useEffect(() => {
    setTab(0);
  }, []);
  console.log(tabs);
  useEffect(() => {
    if(Layouts){
      setLayout(Layouts)
      // setLayout([Object.assign(Layouts)])
    }else{
      const newLayout = tabs?.map((items, index) => ({
        tabId: items.order,
        tabName: items.tab_name,
        tabDesc: items.tab_desc,
        layout: []
      }));
      setLayout(newLayout);
      const newComponenet = tabs?.map((items) => {});
      setComponents(newComponenet);
    }
  }, [tabs]);

  useEffect(() => {
    console.log("layout", Layouts);
    console.log("components", components);
  }, [layout, components]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateReduxFormData = (key, value) => {
    dispatch(updateFormData({ ...reduxFormData, ["Layouts"]: layout }));
  };


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
  }, [tabs, tab]);
  

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
      // console.log('dropZone', dropZone)
      console.log('item', item)
      // console.log('layout', layout)

      let isexist = layout[tab]?.layout?.some((obj) => {
        return obj.children.some((obj1) => {
          if (
            obj1.children &&
            obj1.children.some((child) => child.id === item.id)
          ) {
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

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
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
        console.log(layout[tab].layout,"tab");
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

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components[tab]}
        path={currentPath}
        tab={tab}
        layout={layout}
        setLayout={setLayout}
      />
    );
  };

  const submit = () => {
    updateReduxFormData()
    navigate("/createForm")
  };
  return (
    <div className="body">
      <div className={styles.header}>
        <h4>
          {reduxFormData?.bank_name} - {reduxFormData?.form_name}
        </h4>
        <p>{reduxFormData?.form_description}</p>
      </div>
      <div className={styles.content}>
        <div className="sideBar">
          {Object?.values(sidebaritems && sidebaritems).map(
            (sideBarItem, index) => (
              <SideBarItem key={sideBarItem.id} data={sideBarItem} />
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
              {tabs &&
                tabs.map((item, index) => {
                  return (
                    <Components.Button
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
            <TrashDropZone
              data={{
                layout: layout && layout[tab]?.layout,
              }}
              onDrop={handleDropToTrashBin}
            />
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
