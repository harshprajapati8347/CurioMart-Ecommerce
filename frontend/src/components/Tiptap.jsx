import { useState } from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import { FloatingMenu as TiptapFloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

// --- Material UI v4 (already in your project) ---
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Popover from "@material-ui/core/Popover";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

// --- Icons (lucide-react is just an icon set, no framework dependency) ---
import {
  BoldIcon,
  CodeIcon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  Quote,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
} from "lucide-react";

// -----------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  },
  toolbar: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.paper,
  },
  divider: {
    width: 1,
    height: 24,
    margin: theme.spacing(0, 0.5),
  },
  content: {
    minHeight: 300,
    padding: theme.spacing(1.5, 2),
    "& .ProseMirror": {
      outline: "none",
    },
    "& p": { margin: theme.spacing(1, 0) },
    "& h2": { fontSize: "1.5rem", fontWeight: 600, margin: theme.spacing(2, 0, 1) },
    "& h3": { fontSize: "1.25rem", fontWeight: 600, margin: theme.spacing(2, 0, 1) },
    "& h4": { fontSize: "1.1rem", fontWeight: 600, margin: theme.spacing(1.5, 0, 1) },
    "& ul": {
      listStyleType: "disc",
      paddingLeft: theme.spacing(3),
    },
    "& ol": {
      listStyleType: "decimal",
      paddingLeft: theme.spacing(3),
    },
    "& ul li, & ol li": {
      display: "list-item",
      listStylePosition: "outside",
    },
    // Tiptap nests list items as <li><p>text</p></li> — strip the paragraph's
    // own margin so bullets/numbers line up tightly with the text
    "& li p": {
      margin: 0,
    },
    // nested lists should still show markers, just a different style per level
    "& ul ul": { listStyleType: "circle" },
    "& ul ul ul": { listStyleType: "square" },
    "& blockquote": {
      borderLeft: `3px solid ${theme.palette.divider}`,
      margin: theme.spacing(1, 0),
      paddingLeft: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    "& code": {
      background: theme.palette.action.hover,
      padding: "2px 4px",
      borderRadius: 4,
      fontSize: "0.9em",
    },
    "& a": { color: theme.palette.primary.main },
  },
  floating: {
    display: "flex",
    alignItems: "center",
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    padding: 2,
  },
  popoverContent: {
    padding: theme.spacing(2),
    width: 300,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  popoverActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
  },
}));

// -----------------------------------------------------------------------
// Small building block: replaces the Radix/Shadcn <Toggle />
// A plain MUI IconButton that highlights itself when `active` is true.
// -----------------------------------------------------------------------
function ToolbarToggle({ active, onClick, label, disabled, children }) {
  return (
    <Tooltip title={label} disableFocusListener>
      <span>
        <IconButton
          size="small"
          onClick={onClick}
          disabled={disabled}
          aria-label={label}
          color={active ? "primary" : "default"}
          style={active ? { background: "rgba(25,118,210,0.12)" } : undefined}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
}

// -----------------------------------------------------------------------
// Link popover: replaces Radix Popover + shadcn Input/Button
// -----------------------------------------------------------------------
function LinkPopover({ editor }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [linkUrl, setLinkUrl] = useState("");
  const classes = useStyles();

  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setLinkUrl("");
  };

  const handleSetLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    handleClose();
  };

  const isLink = editor.isActive("link");

  if (isLink) {
    return (
      <ToolbarToggle
        active
        label="Remove link"
        onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}
      >
        <UnlinkIcon size={16} />
      </ToolbarToggle>
    );
  }

  return (
    <>
      <ToolbarToggle active={false} label="Insert link" onClick={handleOpen}>
        <LinkIcon size={16} />
      </ToolbarToggle>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <div className={classes.popoverContent}>
          <TextField
            autoFocus
            label="URL"
            placeholder="https://example.com"
            type="url"
            fullWidth
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSetLink();
            }}
          />
          <div className={classes.popoverActions}>
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button size="small" color="primary" variant="contained" onClick={handleSetLink}>
              Save
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
}

// -----------------------------------------------------------------------
// Shared formatting buttons, used by ToolBar, BubbleMenu and FloatingMenu
// -----------------------------------------------------------------------
function useFormattingState(editor) {
  return useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isStrike: ctx.editor.isActive("strike"),
      isCode: ctx.editor.isActive("code"),
      isHighlight: ctx.editor.isActive("highlight"),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isBlockquote: ctx.editor.isActive("blockquote"),
      isLink: ctx.editor.isActive("link"),
      canRedo: ctx.editor.can().redo(),
      canUndo: ctx.editor.can().undo(),
      isHeading2: ctx.editor.isActive("heading", { level: 2 }),
      isHeading3: ctx.editor.isActive("heading", { level: 3 }),
      isHeading4: ctx.editor.isActive("heading", { level: 4 }),
      isHeading5: ctx.editor.isActive("heading", { level: 5 }),
      isHeading6: ctx.editor.isActive("heading", { level: 6 }),
      isParagraph: ctx.editor.isActive("paragraph"),
    }),
  });
}

function FormattingButtons({ editor, state, classes }) {
  return (
    <>
      <ToolbarToggle
        active={state.isBold}
        label="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon size={16} />
      </ToolbarToggle>
      <ToolbarToggle
        active={state.isItalic}
        label="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon size={16} />
      </ToolbarToggle>
      <ToolbarToggle
        active={state.isUnderline}
        label="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon size={16} />
      </ToolbarToggle>
      <ToolbarToggle
        active={state.isStrike}
        label="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon size={16} />
      </ToolbarToggle>
      <ToolbarToggle
        active={state.isHighlight}
        label="Highlight"
        onClick={() => editor.chain().focus().toggleHighlight({ color: "#fdeb80" }).run()}
      >
        <HighlighterIcon size={16} />
      </ToolbarToggle>
      <ToolbarToggle
        active={state.isCode}
        label="Code"
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <CodeIcon size={16} />
      </ToolbarToggle>
      <Divider orientation="vertical" className={classes.divider} />
      <ToolbarToggle
        active={state.isBulletList}
        label="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon size={16} />
      </ToolbarToggle>
      <ToolbarToggle
        active={state.isOrderedList}
        label="Ordered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon size={16} />
      </ToolbarToggle>
      <ToolbarToggle
        active={state.isBlockquote}
        label="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={16} />
      </ToolbarToggle>
      <Divider orientation="vertical" className={classes.divider} />
      <LinkPopover editor={editor} />
    </>
  );
}

// -----------------------------------------------------------------------
// Toolbar (fixed, sticky top) — includes the heading Select
// -----------------------------------------------------------------------
function ToolBar({ editor }) {
  const classes = useStyles();
  const state = useFormattingState(editor);

  const headingValue = state.isHeading2
    ? "heading2"
    : state.isHeading3
    ? "heading3"
    : state.isHeading4
    ? "heading4"
    : state.isHeading5
    ? "heading5"
    : state.isHeading6
    ? "heading6"
    : "paragraph";

  const handleHeadingChange = (e) => {
    const value = e.target.value;
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number.parseInt(value.replace("heading", ""), 10);
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  return (
    <div className={classes.toolbar}>
      <Select
        value={headingValue}
        onChange={handleHeadingChange}
        variant="outlined"
        margin="dense"
        style={{ minWidth: 140, marginRight: 8 }}
      >
        <MenuItem value="paragraph">Paragraph</MenuItem>
        <MenuItem value="heading2">Heading 1</MenuItem>
        <MenuItem value="heading3">Heading 2</MenuItem>
        <MenuItem value="heading4">Heading 3</MenuItem>
        <MenuItem value="heading5">Heading 4</MenuItem>
        <MenuItem value="heading6">Heading 5</MenuItem>
      </Select>

      <FormattingButtons editor={editor} state={state} classes={classes} />

      <Divider orientation="vertical" className={classes.divider} />
      <ToolbarToggle
        active={false}
        disabled={!state.canUndo}
        label="Undo"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <UndoIcon size={16} />
      </ToolbarToggle>
      <ToolbarToggle
        active={false}
        disabled={!state.canRedo}
        label="Redo"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <RedoIcon size={16} />
      </ToolbarToggle>
    </div>
  );
}

// -----------------------------------------------------------------------
// Bubble menu (appears next to a text selection)
// -----------------------------------------------------------------------
function BubbleMenu({ editor }) {
  const classes = useStyles();
  const state = useFormattingState(editor);
  return (
    <TiptapBubbleMenu editor={editor} className={classes.floating}>
      <FormattingButtons editor={editor} state={state} classes={classes} />
    </TiptapBubbleMenu>
  );
}

// -----------------------------------------------------------------------
// Floating menu (appears on an empty line)
// -----------------------------------------------------------------------
function FloatingMenu({ editor }) {
  const classes = useStyles();
  const state = useFormattingState(editor);
  return (
    <TiptapFloatingMenu editor={editor} className={classes.floating}>
      <FormattingButtons editor={editor} state={state} classes={classes} />
    </TiptapFloatingMenu>
  );
}

// -----------------------------------------------------------------------
// Main exported editor
// -----------------------------------------------------------------------
const Tiptap = ({ content, onChange }) => {
  const classes = useStyles();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: "tiptap-editor-content",
      },
    },
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className={classes.wrapper}>
      {editor && (
        <>
          <ToolBar editor={editor} />
          <BubbleMenu editor={editor} />
          <FloatingMenu editor={editor} />
        </>
      )}
      <EditorContent editor={editor} className={classes.content}/>
    </div>
  );
};

export default Tiptap;