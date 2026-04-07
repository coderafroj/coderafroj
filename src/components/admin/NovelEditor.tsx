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
    <div className="relative w-full max-w-screen-lg mx-auto">
      <EditorRoot>
        <EditorContent
          initialContent={content}
          extensions={defaultExtensions}
          className="min-h-[500px] w-full p-8 bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-2xl focus:outline-none prose prose-invert prose-headings:font-black prose-headings:italic max-w-none"
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
              class: "focus:outline-none"
            }
          }}
          onUpdate={({ editor }) => {
            const json = editor.getJSON();
            setContent(json);
            onChange(json);
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-2xl border border-white/10 bg-zinc-950 px-2 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
            <EditorCommandEmpty className="px-2 text-zinc-600 font-bold uppercase text-[10px] tracking-widest py-2">No results</EditorCommandEmpty>
            <EditorCommandList>
              {/* Default slash commands pattern */}
              <div className="px-2 mb-2 text-[10px] font-black uppercase tracking-widest text-zinc-700">Commands</div>
              <EditorCommandItem
                value="Heading 1"
                onCommand={({ editor, range }) => {
                  editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-xs font-semibold text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Heading1 size={14} /></div>
                Heading 1
              </EditorCommandItem>
              <EditorCommandItem
                value="Heading 2"
                onCommand={({ editor, range }) => {
                  editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-xs font-semibold text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Heading2 size={14} /></div>
                Heading 2
              </EditorCommandItem>
              <EditorCommandItem
                value="Bullet List"
                onCommand={({ editor, range }) => {
                  editor.chain().focus().deleteRange(range).toggleBulletList().run();
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-xs font-semibold text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><List size={14} /></div>
                Bullet List
              </EditorCommandItem>
              <EditorCommandItem
                value="Code Block"
                onCommand={({ editor, range }) => {
                  editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-xs font-semibold text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Code size={14} /></div>
                Code Block
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
                className="flex w-full items-center gap-3 px-3 py-2 text-xs font-semibold text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><ImageIcon size={14} /></div>
                Upload Image
              </EditorCommandItem>
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
