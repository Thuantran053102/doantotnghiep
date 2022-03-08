import React, {useState, useRef, useEffect} from 'react';
import JoditEditor from "jodit-react";

const Example = ({myState}) => {
	const [editorValue,setEditorValue]=myState

	const editor = useRef(null)

	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

	return (
            <JoditEditor
            	ref={editor}
                value={editorValue}
                config={config}
		        tabIndex={1} // tabIndex of textarea
		        onBlur={newContent => setEditorValue(newContent.slice(newContent))} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
            />
        );
}
export default Example