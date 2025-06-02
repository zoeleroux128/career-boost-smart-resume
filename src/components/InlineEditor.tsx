
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Check, X, Edit } from 'lucide-react';

interface InlineEditorProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  className?: string;
}

const InlineEditor = ({ value, onSave, multiline = false, className = '' }: InlineEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} pr-20`}
            autoFocus
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} pr-20`}
            autoFocus
          />
        )}
        <div className="absolute right-2 top-2 flex space-x-1">
          <Button size="sm" variant="ghost" onClick={handleSave} className="h-6 w-6 p-0">
            <Check className="h-3 w-3 text-green-600" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel} className="h-6 w-6 p-0">
            <X className="h-3 w-3 text-red-600" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${className} relative group cursor-pointer hover:bg-gray-50 rounded p-1 border border-transparent hover:border-gray-200`}
      onClick={() => setIsEditing(true)}
    >
      {value || 'Click to edit...'}
      <Edit className="h-3 w-3 text-gray-400 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default InlineEditor;
