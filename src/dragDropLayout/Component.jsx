import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT, SIDEBAR_ITEM } from "./constants";
import { SIDEBAR_ITEMS } from "./constants";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./component.module.css";
import { useSelector } from "react-redux";
const style = {
  border: "1px dashed black",
  padding: "5px",
  backgroundColor: "white",
  cursor: "move",
};
const Component = ({ data, components, path }) => {
  const { tabs } = useSelector((state) => state.formData.value);
  const [sidebaritems, setSidebarItems] = useState();

  useEffect(() => {
    if (tabs?.length > 0) {
      let allsidebaritems = tabs[0]?.fields?.map((item, index) => {
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

  const [item, setItem] = useState();
  useEffect(() => {
    if (sidebaritems) {
      const ele = sidebaritems?.filter((item, index) => item.id === data?.id);
      setItem(ele && ele[0]);
    }
  }, [sidebaritems, data]);

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: COMPONENT, id: data.id, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const component = components[data.id];

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="component draggable"
    >
      {item?.input_type === "text" ? (
        <div>
          {item?.value_type == "number" ? (
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
          <div style={{ marginTop: "0.5rem" }}>
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
