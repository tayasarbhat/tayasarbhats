import { useState } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function EditableText({ value, onChange, className = "" }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setIsEditing(true)}
      onBlur={(e) => {
        setIsEditing(false);
        onChange(e.currentTarget.textContent || "");
      }}
      className={`
        outline-none relative
        ${isEditing ? 'ring-2 ring-blue-400 bg-white/50 rounded cursor-text' : 'hover:ring-2 hover:ring-blue-200 hover:rounded'}
        ${className}
      `}
      style={{
        caretColor: 'black',
        minWidth: '1ch',
        minHeight: '1em',
      }}
    >
      {value}
    </div>
  );
}