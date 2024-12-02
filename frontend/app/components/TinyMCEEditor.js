"use client"
import React, { useEffect, useRef } from 'react';
import Script from 'next/script'; // To load the TinyMCE script

const TinyMCEEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Dynamically import TinyMCE only in the client side
    if (typeof window !== 'undefined' && !window.tinymce) {
      return;
    }

    if (editorRef.current && window.tinymce) {
      window.tinymce.init({
        target: editorRef.current,
        plugins: 'link image lists',
        skin: 'oxide-dark',
  content_css: 'dark',
        menubar: true,
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
        
        setup: (editor) => {
          editor.on('Change', () => {
            onChange(editor.getContent());
          });
        },
      });
    }

    return () => {
      if (editorRef.current && window.tinymce) {
        window.tinymce.remove(editorRef.current);
      }
    };
  }, [editorRef.current]);

  return (
    <div>
      {/* Load the TinyMCE script dynamically */}
      <Script
        src="https://cdn.tiny.cloud/1/cfpg9rn667iwt7r1vki2w71u26ra5wrs1pam1jfudi10si90/tinymce/6/tinymce.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (editorRef.current && window.tinymce) {
            window.tinymce.init({
                plugins: 'link image lists wordcount',
        menubar: true,
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | wordcount',
        
              selector: 'textarea', 
              skin: 'oxide-dark',
  content_css: 'dark',// Use the textarea inside this component
              setup: (editor) => {
                editor.on('Change', () => {
                  onChange(editor.getContent());
                });
              },
            });
          }
        }}
      />
      <textarea ref={editorRef} defaultValue={value} />
    </div>
  );
};

export default TinyMCEEditor;
