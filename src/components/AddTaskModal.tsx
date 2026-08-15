import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { PriorityLevel, TaskCategory } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskData: { title: string; subtitle?: string; priority?: PriorityLevel; category: TaskCategory }) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('Medium');
  const [category, setCategory] = useState<TaskCategory>('Work');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      priority,
      category,
    });
    setTitle('');
    setSubtitle('');
    setPriority('Medium');
    setCategory('Work');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md card-shadow border border-[#dee8ff]">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-bold text-[#111c2d] flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#0050cb]" /> Add New Task
          </h3>
          <button
            onClick={onClose}
            className="text-[#5c5f61] hover:text-[#111c2d] p-1 rounded-lg hover:bg-[#f0f3ff] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#111c2d] mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Review presentation slides"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#f0f3ff] border border-[#c2c6d8]/50 text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#111c2d] mb-1">
              Subtitle / Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Check Notion board for updates"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#f0f3ff] border border-[#c2c6d8]/50 text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-[#111c2d] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#f0f3ff] border border-[#c2c6d8]/50 text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              >
                <option value="Work">Work</option>
                <option value="Fitness">Fitness</option>
                <option value="Wellness">Wellness</option>
                <option value="Personal">Personal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111c2d] mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#f0f3ff] border border-[#c2c6d8]/50 text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#5c5f61] hover:bg-[#f0f3ff] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#0066ff] hover:bg-[#0050cb] text-white shadow-sm transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
