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
  handleRemoveItemFromLayout
} from "./helpers";

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import shortid from "shortid";
import { useSelector } from "react-redux";

const Container = () => {
  const { tabs } = useSelector((state) => state.formData.value);
  const [sidebaritems,setSidebarItems]=useState({})

  useEffect(() => {
    // console.log(convertIdsToString(tabs[0].feilds));
    console.log(tabs, 'hhh');
    // type: SIDEBAR_ITEM,
    // component: {
    //   type: "first_name",
    //   content: "first_name"
    // },
    if(tabs?.length > 0){
      let allsidebaritems = tabs[0]?.fields?.map((item,index)=>{
        return (
          {
            ...item,
            type: SIDEBAR_ITEM,
            component: {
            type: item.field_label,
            content: item.field_label
            }
          }
        )
      })
      setSidebarItems(allsidebaritems);
      console.log(allsidebaritems);
    }
  }, [tabs]);
  console.log(tabs);
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  console.log(layout);
  const [components, setComponents] = useState(initialComponents);

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log('dropZone', dropZone)
      console.log('item', item)

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
          ...item.component
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent
        });
        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, components]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
      />
    );
  };

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(sidebaritems && sidebaritems).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="page">
          {layout.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length
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
              path: `${layout.length}`,
              childrenCount: layout.length
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>

        <TrashDropZone
          data={{
            layout
          }}
          onDrop={handleDropToTrashBin}
        />
      </div>
    </div>
  );
};
export default Container;
