import React, { useState } from 'react';
import { Task, TaskCategory, PriorityLevel } from '../types';
import { Plus, Trash2, CheckCircle, Circle, Filter, Search, Check } from 'lucide-react';

interface TasksViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenAddTask: () => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onOpenAddTask,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Work', 'Fitness', 'Wellness', 'Personal'];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory !== 'All' && task.category !== selectedCategory) return false;
    if (selectedPriority !== 'All' && task.priority !== selectedPriority) return false;
    if (statusFilter === 'Active' && task.completed) return false;
    if (statusFilter === 'Completed' && !task.completed) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchSub = task.subtitle?.toLowerCase().includes(q);
      if (!matchTitle && !matchSub) return false;
    }
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-6 w-full">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl p-5 card-shadow border border-[#dee8ff] flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-[#5c5f61] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#f0f3ff] text-sm text-[#111c2d] border border-transparent focus:border-[#0066ff] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <div className="flex bg-[#f0f3ff] p-1 rounded-xl">
            {(['All', 'Active', 'Completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-white text-[#0050cb] shadow-xs'
                    : 'text-[#5c5f61] hover:text-[#111c2d]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenAddTask}
            className="px-4 py-2.5 rounded-xl bg-[#0066ff] text-white text-sm font-semibold hover:bg-[#0050cb] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </div>

      {/* Category Pills & Priority Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-[#5c5f61] uppercase mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0050cb] text-white shadow-xs'
                  : 'bg-white text-[#424656] hover:bg-[#f0f3ff] border border-[#dee8ff]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#5c5f61] uppercase mr-1">Priority:</span>
          {priorities.map((pri) => (
            <button
              key={pri}
              onClick={() => setSelectedPriority(pri)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedPriority === pri
                  ? 'bg-[#dae1ff] text-[#003fa4]'
                  : 'bg-white text-[#5c5f61] hover:bg-[#f0f3ff] border border-[#dee8ff]'
              }`}
            >
              {pri}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List Card */}
      <div className="bg-white rounded-2xl p-6 card-shadow border border-[#dee8ff]">
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#f0f3ff]">
          <h3 className="text-lg font-bold text-[#111c2d]">
            Tasks ({filteredTasks.length})
          </h3>
          <span className="text-xs font-semibold text-[#5c5f61]">
            {completedCount} of {tasks.length} Completed
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-[#5c5f61]">
            <p className="text-base font-medium">No tasks found matching your filters.</p>
            <button
              onClick={onOpenAddTask}
              className="mt-3 px-4 py-2 bg-[#e7eeff] text-[#0050cb] rounded-xl text-xs font-bold hover:bg-[#dee8ff] transition-colors"
            >
              Create New Task
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#f0f3ff]">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="py-3.5 px-2 flex items-center justify-between hover:bg-[#f0f3ff]/50 rounded-xl transition-colors group"
              >
                <div className="flex items-start gap-4 flex-1 pr-4">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className="mt-1 text-[#0050cb] hover:scale-110 transition-transform cursor-pointer"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-6 h-6 text-[#0050cb] fill-[#dae1ff]" />
                    ) : (
                      <Circle className="w-6 h-6 text-[#c2c6d8] hover:text-[#0066ff]" />
                    )}
                  </button>

                  <div className="flex-1">
                    <span
                      className={`text-base font-medium block ${
                        task.completed ? 'line-through text-[#727687]' : 'text-[#111c2d]'
                      }`}
                    >
                      {task.title}
                    </span>
                    {task.subtitle && (
                      <p className="text-xs text-[#424656] mt-0.5">{task.subtitle}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      {task.category && (
                        <span className="px-2 py-0.5 rounded bg-[#f0f3ff] text-[#4b5a70] text-[11px] font-semibold">
                          {task.category}
                        </span>
                      )}
                      {task.priority && (
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            task.priority === 'High'
                              ? 'bg-[#ffdad6] text-[#93000a]'
                              : task.priority === 'Medium'
                              ? 'bg-[#e0e3e5] text-[#191c1e]'
                              : 'bg-[#f0f3ff] text-[#5c5f61]'
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  title="Delete task"
                  className="opacity-0 group-hover:opacity-100 p-2 text-[#ba1a1a] hover:bg-[#ffdad6]/50 rounded-lg transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
