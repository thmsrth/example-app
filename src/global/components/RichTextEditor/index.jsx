import React from 'react';

import PropTypes from 'prop-types';

import ReactQuill, { Quill } from 'react-quill';

import 'react-quill/dist/quill.snow.css';

// use inline styles instead of classes
const AlignStyle = Quill.import('attributors/style/align');
const DirectionStyle = Quill.import('attributors/style/direction');
const FontStyle = Quill.import('attributors/style/font');
Quill.register(AlignStyle, true);
Quill.register(DirectionStyle, true);
Quill.register(FontStyle, true);

const RichTextEditor = ({
  placeholder, value, onChange, onBlur,
}) => {
  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'align',
    'list', 'bullet',
    'link',
  ];

  return (
    <ReactQuill
      theme="snow"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
    />
  );
};

export default RichTextEditor;

RichTextEditor.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

RichTextEditor.defaultProps = {
  value: '',
  placeholder: '',
  onChange: () => {},
  onBlur: () => {},
};
