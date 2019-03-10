import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools'; // Enables autocompletion support
import 'brace/mode/html';
import 'brace/theme/textmate';

const HtmlEditorView = ({
  name, className, value, readOnly, required, onChange, onValidate,
}) => (
  <AceEditor
    mode="html"
    theme="textmate"
    name={name}
    value={value}
    readOnly={readOnly}
    className={className}
    style={{ width: '100%', resize: 'vertical' }}
    showGutter
    required={required}
    highlightActiveLine
    enableLiveAutocompletion
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
    }}
    onLoad={editor => editor.getSession().setUseWorker(true)}
    onChange={onChange}
    onValidate={onValidate}
  />
);

export default HtmlEditorView;

HtmlEditorView.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onValidate: PropTypes.func,
};

HtmlEditorView.defaultProps = {
  value: '',
  required: false,
  className: '',
  readOnly: false,
  onChange: () => {},
  onValidate: () => {},
};
