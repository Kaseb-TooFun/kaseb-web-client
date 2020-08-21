import {RouteComponentProps} from "@reach/router";
import AceEditor from "react-ace";
import React from "react";
import "ace-builds/src-noconflict/mode-jsx";

let theme = "tomorrow"

require('ace-builds/src-noconflict/mode-css')
require('ace-builds/src-noconflict/snippets/css')
require(`ace-builds/src-noconflict/theme-${theme}`)

import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

interface CssEditorProps extends RouteComponentProps {
	value: string
	setValue: (qs: string) => void;
}

const placeholder = `#my-id {
	color: red;
}

.my-class {
	font-size: 13px;
}
`

const CssEditor = (props: CssEditorProps) => {
	const {value, setValue} = props;

	return (
		<AceEditor
			style={{width: "300px", height: "200px"}}
            // placeholder={placeholder}
            mode={"css"}
            theme={theme}
            // name=""
            // onLoad={this.onLoad}
            onChange={setValue}
            // onSelectionChange={this.onSelectionChange}
            // onCursorChange={this.onCursorChange}
            // onValidate={this.onValidate}
            value={value}
            fontSize={14}
            // showPrintMargin={this.state.showPrintMargin}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              useWorker: false,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2
            }}
          />
	)
}

export default CssEditor;
