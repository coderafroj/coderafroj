"use client";

import React, { useState } from "react";
import { EditorRoot, EditorContent, EditorCommand, EditorCommandItem, EditorCommandEmpty, EditorCommandList } from "novel";
import { defaultExtensions } from "@/lib/novel-extensions";
import { handleCommandNavigation } from "novel";
import { storageService } from "@/lib/storage-service";
import { Image as ImageIcon, FileText, Code, Heading1, Heading2, List, Type } from "lucide-react";

interface NovelEditorProps {
  initialValue?: any;
  onChange: (value: any) => void;
  onImageUpload?: (url: string) => void;
}

export default function NovelEditor({ initialValue, onChange, onImageUpload }: NovelEditorProps) {
  const [content, setContent] = useState(initialValue);

  return (
    <div className="relative w-full max-w-screen-xl mx-auto group">
      <EditorRoot>
        <EditorContent
          initialContent={content}
          extensions={defaultExtensions}
          className="min-h-[600px] w-full p-10 md:p-14 bg-zinc-900/10 backdrop-blur-[50px] border border-white/5 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] focus:outline-none prose prose-invert prose-headings:font-black prose-headings:italic prose-headings:tracking-tighter prose-p:text-zinc-400 prose-p:font-medium prose-p:leading-relaxed max-w-none selection:bg-emerald-500/30 transition-all duration-1000 group-hover:bg-zinc-900/20"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) => {
              const items = Array.from(event.clipboardData?.items || []);
              for (const item of items) {
                if (item.type.indexOf("image") === 0) {
                  const file = item.getAsFile();
                  if (file) {
                    storageService.uploadFile(file).then((url) => {
                      onImageUpload?.(url);
                      // Image insertion logic would go here
                    });
                  }
                  return true;
                }
              }
              return false;
            },
            attributes: {
              class: "focus:outline-none min-h-[500px]"
            }
          }}
          onUpdate={({ editor }) => {
            const json = editor.getJSON();
            setContent(json);
            onChange(json);
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[400px] w-80 overflow-y-auto rounded-[2rem] border border-white/10 bg-zinc-950/90 backdrop-blur-3xl px-3 py-4 shadow-[0_30px_100px_rgba(0,0,0,1)] transition-all animate-in fade-in zoom-in-95 duration-300">
            <EditorCommandEmpty className="px-4 text-zinc-700 font-black uppercase text-[10px] tracking-[0.3em] py-4 italic">Brain_Data_Not_Found</EditorCommandEmpty>
            <EditorCommandList className="custom-scrollbar">
              <div className="px-4 mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/50">Neural_Commands</div>
              <EditorCommandItem
                value="Heading 1"
                onCommand={({ editor, range }) => {
                  editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
                }}
                className="flex w-full items-center gap-4 px-4 py-3 text-xs font-black text-zinc-500 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-2xl transition-all group/item"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-emerald-500 group-hover/item:text-black transition-all duration-500 shadow-xl"><Heading1 size={18} /></div>
                PRIMARY_HEADER
              </EditorCommandItem>
              <EditorCommandItem
                value="Heading 2"
                onCommand={({ editor, range }) => {
                  editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
                }}
                className="flex w-full items-center gap-4 px-4 py-3 text-xs font-black text-zinc-500 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-2xl transition-all group/item"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-emerald-500 group-hover/item:text-black transition-all duration-500 shadow-xl"><Heading2 size={18} /></div>
                SECONDARY_SEGMENT
              </EditorCommandItem>
              <EditorCommandItem
                value="Bullet List"
                onCommand={({ editor, range }) => {
                  editor.chain().focus().deleteRange(range).toggleBulletList().run();
                }}
                className="flex w-full items-center gap-4 px-4 py-3 text-xs font-black text-zinc-500 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-2xl transition-all group/item"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-emerald-500 group-hover/item:text-black transition-all duration-500 shadow-xl"><List size={18} /></div>
                DATA_POINTS
              </EditorCommandItem>
              <EditorCommandItem
                value="Code Block"
                onCommand={({ editor, range }) => {
                  editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
                }}
                className="flex w-full items-center gap-4 px-4 py-3 text-xs font-black text-zinc-500 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-2xl transition-all group/item"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-emerald-500 group-hover/item:text-black transition-all duration-500 shadow-xl"><Code size={18} /></div>
                RAW_CODE_BLOCK
              </EditorCommandItem>
              <EditorCommandItem
                value="Upload Image"
                onCommand={({ editor, range }) => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = async () => {
                    const file = input.files?.[0];
                    if (file) {
                      const url = await storageService.uploadFile(file);
                      editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
                      onImageUpload?.(url);
                    }
                  };
                  input.click();
                }}
                className="flex w-full items-center gap-4 px-4 py-3 text-xs font-black text-zinc-500 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-2xl transition-all group/item"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-emerald-500 group-hover/item:text-black transition-all duration-500 shadow-xl"><ImageIcon size={18} /></div>
                VISUAL_DATA_LINK
              </EditorCommandItem>
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
