/*
 * @Description:
 * @Author: xi_zi
 * @Date: 2022-01-25 22:47:36
 * @LastEditTime: 2022-01-26 01:10:10
 * @LastEditors: xi_zi
 */
import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

function CodeMirror() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editorIns = monaco.editor.create(container.current, {
      // JSON.stringify({},null,2)
      value: '{\n  "ret": 0,\n  "msg": "",\n  "data": []\n}',
      language: 'json',
      theme: 'vs-dark',
    });
    editorIns.onDidChangeModelContent(() => {
      let val = '';
      try {
        val = editorIns.getValue();
      } catch (error) {
        val = editorIns.getValue();
      }
    });
  }, []);

  return <div style={{ height: '300px' }} ref={container}></div>;
}
export default React.memo(CodeMirror);
