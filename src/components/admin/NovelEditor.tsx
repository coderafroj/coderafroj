import React, { useState } from "react";
import { EditorRoot, EditorContent, JSONContent, EditorInstance, EditorCommand, EditorCommandItem, EditorCommandList, EditorCommandEmpty, createImageUpload, handleCommandNavigation, UpdatedImage } from "novel";
import { defaultExtensions } from "@/lib/novel-extensions";
import { suggestionItems } from "../../lib/slash-command";
import { storageService } from "@/lib/storage-service";
import { cn } from "@/lib/utils";

const onUpload = (file: File) => {
  return storageService.uploadFile(file);
};

const uploadHandler = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      alert("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      alert("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});

interface NovelEditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
}

export default function NovelEditor({ initialValue, onChange }: NovelEditorProps) {
  const [content, setContent] = useState<JSONContent | string>(initialValue || "");

  const extensions = [...defaultExtensions];

  return (
    <div className="relative w-full group/editor">
      {/* Protocol Status Bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3 px-3 py-1.5 rounded-full glass border border-white/5 opacity-0 group-hover/editor:opacity-100 transition-opacity pointer-events-none">
         <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
         <span className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-500">PROTOCOL_ACTIVE // SECURE_SYNC</span>
      </div>

      <EditorRoot>
        <EditorContent
          className={cn(
            "relative min-h-[500px] w-full border-stone-200 bg-white p-12 px-8 sm:rounded-lg sm:border sm:shadow-lg dark:border-stone-800 dark:bg-black",
            "prose prose-lg dark:prose-invert prose-headings:font-black prose-headings:italic prose-headings:tracking-tighter prose-p:leading-relaxed max-w-full"
          )}
          {...(initialValue && { defaultValue: JSON.parse(initialValue) })}
          extensions={extensions}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class: `focus:outline-none max-w-full`,
            },
          }}
          onUpdate={({ editor }) => {
            const json = editor.getJSON();
            onChange(JSON.stringify(json));
          }}
        >
          <EditorCommand className='z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all dark:border-stone-800 dark:bg-black'>
            <EditorCommandEmpty className='px-2 text-stone-400'>No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item: any) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command(val)}
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-stone-100 aria-selected:bg-stone-100 dark:hover:bg-stone-800 dark:aria-selected:bg-stone-800`}
                  key={item.title}
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white dark:border-stone-800 dark:bg-black'>
                    {item.icon}
                  </div>
                  <div>
                    <p className='font-medium'>{item.title}</p>
                    <p className='text-xs text-stone-400'>{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
