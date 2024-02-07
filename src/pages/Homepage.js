import React from "react";
import { Components } from "../components";

export function Homepage() {
    return (
        <div style={{margin: 'auto', width: '50%', textAlign: 'center', marginTop: '15%'}}>
            <div>
                <Components.LinkButton text="CREATE NEW FORM" linkTo='/createForm' />
            </div>
        </div>
    )
}