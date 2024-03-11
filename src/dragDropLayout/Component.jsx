import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT, SIDEBAR_ITEM } from "./constants";
import { SIDEBAR_ITEMS } from "./constants";
import { useSelector } from "react-redux";
import styles from "./component.module.css";
import { update } from "lodash";
import { Trash } from "react-bootstrap-icons";
// import { useDispatch } from "react-redux";
// import { updateFormData } from "../redux/formDataSlice";

const style = {
  // border: "1px dashed black",
  // padding: "5px",
  backgroundColor: "white",
  cursor: "move",
  position: "relative", // Add position relative to position the close icon
};

const Component = ({
  data,
  components,
  path,
  tab,
  layout,
  setLayout,
  tabsData,
  setTabsData,
}) => {
  // const { tabs } = useSelector((state) => state.formData.value);
  const [sidebaritems, setSidebarItems] = useState();
  // const dispatch = useDispatch()
  const [item, setItem] = useState();
  const [allignment, setallignment] = useState(item?.alignment);
  useEffect(() => {
    if (tabsData?.length > 0) {
      let allsidebaritems = tabsData[tab]?.fields?.map((item, index) => {
        return {
          ...item,
          type: SIDEBAR_ITEM,
          component: {
            type: item.field_label,
            content: item.field_label,
          },
        };
      });
      const extraComponents = [
        {
          id: `e-1`,
          field_label: "add_section",
          display_name: "Add Section Title",
          description: "[Validation: Only alphabets]",
          input_type: "text",
          value_type: "string",
          type: SIDEBAR_ITEM,
          component: {
            type: "add_section",
            content: "add_section",
          },
        },
        {
          id: `e-2`,
          field_label: "horizontal_line",
          display_name: "Add Seprator",
          input_type: "Horizontal Line",
          type: SIDEBAR_ITEM,
          component: {
            type: "horizontal_line",
            content: "horizontal_line",
          },
        },
      ];

      allsidebaritems = [...extraComponents, ...allsidebaritems];
      setSidebarItems(allsidebaritems);
    }
  }, [tabsData]);

  useEffect(() => {
    console.log(item?.alignment);
    if (item?.alignment) {
      setallignment(item.alignment);
    }
  }, [item]);

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
    try {
      let todeletecolumn = false;
      let columnIndex;
      let todeleterow = false;
      let rowIndex;
      let todeletecomponent = false;
      let componentIndex;
      let updatedLayout = [...layout];
      updatedLayout[tab]?.layout?.forEach((row, rIndex) => {
        console.log(row, rIndex, "row");
        console.log(row.length, "row leng th");
        row?.children?.forEach((column, cIndex) => {
          column?.children?.forEach((component, compIndex) => {
            if (data.id === component.id) {
              if (column.children.length === 1) {
                todeletecolumn = true;
              }
              if (row.children.length === 1 && column.children.length === 1) {
                todeleterow = true;
              }
              columnIndex = cIndex;
              rowIndex = rIndex;
              todeletecomponent = true;
              componentIndex = compIndex;
            }
          });
        });
      });
      console.log(updatedLayout, "updatedsampleLayout");
      console.log(todeletecolumn, "todeletecolumn");
      console.log(todeleterow, "todeleterow");
      console.log(columnIndex, "columnIndex");
      console.log(rowIndex, "rowIndex");
      console.log(todeletecomponent, "todeletecomponent");
      if (todeleterow) {
        //  newLayout[tab] = { ...newLayout[tab], layout: updatedLayout };
        updatedLayout[tab] = {
          ...updatedLayout[tab],
          layout: updatedLayout[tab]?.layout?.filter(
            (_, index) => index !== rowIndex
          ),
        };
      } else if (todeletecolumn) {
        // updatedLayout[tab]={...updatedLayout[tab], layout: updatedLayout[tab].layout[rowIndex]?.children?.filter((_, index) => index !== columnIndex)}
        console.log(
          "rr",
          updatedLayout[tab].layout[rowIndex]?.children?.filter(
            (_, index) => index !== columnIndex
          )
        );
        // updatedLayout[tab].layout[rowIndex]={...updatedLayout[tab].layout[rowIndex], children: updatedLayout[tab].layout[rowIndex]?.children?.filter((_, index) => index !== columnIndex)}
        const updatedRow = { ...updatedLayout[tab].layout[rowIndex] };
        const updatedChildren = updatedRow.children.filter(
          (_, index) => index !== columnIndex
        );
        const updatedRowWithColumn = {
          ...updatedRow,
          children: [...updatedChildren],
        };
        const updatedLayoutWithRow = [
          ...updatedLayout[tab].layout.slice(0, rowIndex),
          updatedRowWithColumn,
          ...updatedLayout[tab].layout.slice(rowIndex + 1),
        ];
        updatedLayout[tab] = {
          ...updatedLayout[tab],
          layout: updatedLayoutWithRow,
        };
      } else if (todeletecomponent) {
        // updatedLayout[tab]={...updatedLayout[tab], layout: updatedLayout[tab].layout[rowIndex]?.children[columnIndex]?.children?.splice(componentIndex, 1)}
        const updatedRow = { ...updatedLayout[tab].layout[rowIndex] };
        const updatedColumn = { ...updatedRow.children[columnIndex] };
        const updatedChildren = updatedColumn.children.filter(
          (_, index) => index !== componentIndex
        );
        const updatedColumnWithChildren = {
          ...updatedColumn,
          children: updatedChildren,
        };
        const updatedRowWithColumn = {
          ...updatedRow,
          children: [
            ...updatedRow.children.slice(0, columnIndex),
            updatedColumnWithChildren,
            ...updatedRow.children.slice(columnIndex + 1),
          ],
        };
        const updatedLayoutWithRow = [
          ...updatedLayout[tab].layout.slice(0, rowIndex),
          updatedRowWithColumn,
          ...updatedLayout[tab].layout.slice(rowIndex + 1),
        ];
        updatedLayout[tab] = {
          ...updatedLayout[tab],
          layout: updatedLayoutWithRow,
        };
      }
      setLayout(updatedLayout);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = (itemm) => {
    console.log(item, "item");
    if (item.alignment === "Horizontal") {
      item.alignment = "Vertical";
      setallignment("Vertical");
      setAllignmenttoredux(item.alignment);
    } else {
      item.alignment = "Horizontal";
      setallignment("Horizontal");
      setAllignmenttoredux(item.alignment);
    }
  };

  const setAllignmenttoredux = (allignmentt) => {
    let updatedtabs = tabsData.map((tabitem, index) => {
      if (index === tab) {
        return {
          ...tabitem,
          fields: tabitem.fields.map((el) => {
            if (item.id === el.id) {
              return {
                ...el,
                alignment: allignmentt,
              };
            } else {
              return el;
            }
          }),
        };
      } else {
        return tabitem;
      }
    });
    console.log(tabsData);
    console.log(updatedtabs);
    setTabsData(updatedtabs);
    // dispatch(updateFormData({ ...tabsData, tabsData: updatedtabsData }))
  };
  const component = components && components[data.id];

  return (
    <div
      style={{ ...style, opacity }}
      className="component draggable"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <button ref={ref} type="button">drag</button> */}
      {/* {isHovered && ( */}
      {/* <div className={styles.closeIcon}>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => removeComponent()}
        >
         
          <Trash className={styles.trashIcon} />
        </button>
      </div> */}
      {/* )} */}
      {item?.field_label === "horizontal_line" ? (
        <div className={styles.horizontalLine}>
          <hr />
          <div className={styles.closeIcon2}>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => removeComponent()}
            >
              <Trash className={styles.trashIcon} />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {item?.field_label === "add_section" && (
        <div className={styles.addsectoinfield}>
          <input
            className={styles.input}
            key={item.id}
            placeholder="Section Title"
            readOnly
            style={{
              width: item.display_name === "Add Section Title" ? "95%" : "100%",
            }}
          />
          <div className={styles.closeIcon2}>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => removeComponent()}
            >
              <Trash className={styles.trashIcon} />
            </button>
          </div>
        </div>
      )}

      {item?.input_type === "text" && item?.field_label !== "add_section" ? (
        <div>
          {item?.value_type == "number" ? (
            <div className={`${styles.formInputContainer}`}>
              <div className="d-flex justify-content-between">
                <label className="fw-bold">{item.display_name}</label>
                <div className={styles.closeIcon2}>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => removeComponent()}
                  >
                    <Trash className={styles.trashIcon} />
                  </button>
                </div>
              </div>
              <input
                type="number"
                className={styles.input}
                key={item.id}
                placeholder={`Enter ${item.display_name}`}
                readOnly
              ></input>
            </div>
          ) : (
            <div className={styles.formInputContainer}>
              <div className="d-flex justify-content-between">
                <label className="fw-bold">{item.display_name}</label>
                <div className={styles.closeIcon2}>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => removeComponent()}
                  >
                    <Trash className={styles.trashIcon} />
                  </button>
                </div>
              </div>
              <input
                className={styles.input}
                key={item.id}
                placeholder={`Enter ${item.display_name}`}
                readOnly
                style={{
                  width:
                    item.display_name === "Add Section Title" ? "95%" : "100%",
                }}
              />
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
          <div className="d-flex justify-content-between">
            <label className="fw-bold">{item.display_name}</label>
            <div className={styles.closeIcon2}>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => removeComponent()}
              >
                <Trash className={styles.trashIcon} />
              </button>
            </div>
          </div>

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
          <div className="d-flex justify-content-between">
            <label className="fw-bold">{item.display_name}</label>
            <div className={styles.closeIcon2}>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => removeComponent()}
              >
                <Trash className={styles.trashIcon} />
              </button>
            </div>
          </div>
          {/* toogle button */}
          {/* <div>
          <input type="checkbox"  />
          </div> */}
          <div className={styles.togglecontaiiner}>
            <p>Allignment</p>
            <div className={`d-flex`}>
              <p>Horizontal</p>
              <div className={styles.container}>
                <input
                  type="checkbox"
                  id="cup"
                  checked={allignment === "Vertical"}
                  onChange={() => handleToggle(item)}
                />
                <label for="cup"></label>
              </div>
              <p>Vertical</p>
            </div>
          </div>
          <div
            style={{ marginTop: "0.5rem" }}
            className={
              allignment === "Horizontal"
                ? styles.horizontalAllignmentContainer
                : styles.verticalAllignmentContainer
            }
          >
            {item.options.map((item, index) => (
              <div key={index} className={styles.multioptionsitem}>
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
          <div className="d-flex justify-content-between">
            <label className="fw-bold">{item.display_name}</label>
            <div className={styles.closeIcon2}>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => removeComponent()}
              >
                <Trash className={styles.trashIcon} />
              </button>
            </div>
          </div>
          <div className={styles.togglecontaiiner}>
            <p>Allignment</p>
            <div className={`d-flex`}>
              <p>Horizontal</p>
              <div className={styles.container}>
                <input
                  type="checkbox"
                  id="cup"
                  checked={allignment && allignment === "Vertical"}
                  onChange={handleToggle}
                />
                <label for="cup"></label>
              </div>
              <p>Vertical</p>
            </div>
          </div>
          <div
            style={{ marginTop: "0.5rem" }}
            className={
              allignment && allignment === "Horizontal"
                ? styles.horizontalAllignmentContainer
                : styles.verticalAllignmentContainer
            }
          >
            {item.options.map((item, index) => (
              <div key={index} className={styles.multioptionsitem}>
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
              </div>
            ))}
          </div>
        </div>
      )}
      {item?.input_type == "select" && (
        <div>
          <div className="d-flex justify-content-between">
            <label className="fw-bold">{item.display_name}</label>
            <div className={styles.closeIcon2}>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => removeComponent()}
              >
                <Trash className={styles.trashIcon} />
              </button>
            </div>
          </div>
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
