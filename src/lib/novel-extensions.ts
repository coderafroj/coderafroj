import {
  TiptapImage,
  TiptapLink,
  CharacterCount,
  TaskList,
  TaskItem,
  Placeholder,
  StarterKit,
  HorizontalRule,
  TiptapUnderline,
  Color,
  TextStyle,
  HighlightExtension,
  Youtube,
  GlobalDragHandle,
} from "novel";

import { cx } from "class-variance-authority";

const placeholder = Placeholder.configure({
  placeholder: ({ node }: { node: any }) => {
    if (node.type.name === "heading") {
      return `Heading ${node.attrs.level}`;
    }
    return "Press '/' for commands...";
  },
});

const tiptapImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx("rounded-lg border border-stone-200 dark:border-stone-800"),
  },
});

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
    ),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2"),
  },
});

const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex items-start my-4"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-stone-300 dark:border-stone-700"),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-l-4 border-stone-700 dark:border-stone-300"),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx("rounded-sm bg-stone-100 dark:bg-stone-900 p-5 font-mono font-medium"),
    },
  },
  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-stone-200 dark:bg-stone-800 px-1.5 py-1 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapImage,
  tiptapLink,
  CharacterCount,
  taskList,
  taskItem,
  horizontalRule,
  TiptapUnderline,
  TextStyle,
  Color,
  HighlightExtension,
  Youtube,
  GlobalDragHandle,
];
