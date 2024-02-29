import React from "react";
import ReactDOM from "react-dom";
import Example from "./example";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import "./styles.css";
export function DragDrop() {
  return (
    <div>
      <DndProvider backend={Backend}>
        <Example />
      </DndProvider>
    </div>
  );
}


