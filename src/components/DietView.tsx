import React, { useState } from 'react';
import {
  Utensils,
  Sun,
  Coffee,
  Apple,
  Moon,
  Plus,
  Check,
  Trash2,
  Edit2,
  Flame,
  Award,
  Sparkles,
  Printer,
  RotateCcw,
  ChevronRight,
  Info,
} from 'lucide-react';
import { DayDietPlan, MealItem } from '../types';

interface DietViewProps {
  dietPlan: DayDietPlan[];
  onToggleMeal: (day: DayDietPlan['day'], section: 'breakfast' | 'lunch' | 'snack' | 'dinner', mealId: string) => void;
  onAddMeal: (day: DayDietPlan['day'], section: 'breakfast' | 'lunch' | 'snack' | 'dinner', meal: Omit<MealItem, 'id'>) => void;
  onDeleteMeal: (day: DayDietPlan['day'], section: 'breakfast' | 'lunch' | 'snack' | 'dinner', mealId: string) => void;
  onResetDayChecks: (day: DayDietPlan['day']) => void;
}

const DAYS: DayDietPlan['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const DietView: React.FC<DietViewProps> = ({
  dietPlan,
  onToggleMeal,
  onAddMeal,
  onDeleteMeal,
  onResetDayChecks,
}) => {
  // Determine current day of week or default to Monday
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayDietPlan['day'];
  const initialSelectedDay = DAYS.includes(todayName) ? todayName : 'Monday';

  const [selectedDay, setSelectedDay] = useState<DayDietPlan['day']>(initialSelectedDay);

  // Modal / Add form state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState<'breakfast' | 'lunch' | 'snack' | 'dinner'>('breakfast');
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState<number | ''>('');
  const [protein, setProtein] = useState<number | ''>('');
  const [carbs, setCarbs] = useState<number | ''>('');
  const [fats, setFats] = useState<number | ''>('');
  const [notes, setNotes] = useState('');

  // Find selected day plan
  const dayPlan = dietPlan.find((d) => d.day === selectedDay) || {
    day: selectedDay,
    breakfast: [],
    lunch: [],
    snack: [],
    dinner: [],
  };

  const openAddModal = (section: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
    setModalSection(section);
    setMealName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
    setNotes('');
    setIsAddModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName.trim()) return;

    onAddMeal(selectedDay, modalSection, {
      name: mealName.trim(),
      calories: calories === '' ? undefined : Number(calories),
      proteinGrams: protein === '' ? undefined : Number(protein),
      carbsGrams: carbs === '' ? undefined : Number(carbs),
      fatsGrams: fats === '' ? undefined : Number(fats),
      notes: notes.trim() || undefined,
      completed: false,
    });

    setIsAddModalOpen(false);
  };

  // Calculate day macros
  const allMeals = [...dayPlan.breakfast, ...dayPlan.lunch, ...dayPlan.snack, ...dayPlan.dinner];
  const completedMeals = allMeals.filter((m) => m.completed);

  const totalCaloriesPlanned = allMeals.reduce((acc, m) => acc + (m.calories || 0), 0);
  const totalCaloriesEaten = completedMeals.reduce((acc, m) => acc + (m.calories || 0), 0);

  const totalProteinPlanned = allMeals.reduce((acc, m) => acc + (m.proteinGrams || 0), 0);
  const totalProteinEaten = completedMeals.reduce((acc, m) => acc + (m.proteinGrams || 0), 0);

  const totalCarbsPlanned = allMeals.reduce((acc, m) => acc + (m.carbsGrams || 0), 0);
  const totalFatsPlanned = allMeals.reduce((acc, m) => acc + (m.fatsGrams || 0), 0);

  const completionPct = allMeals.length > 0 ? Math.round((completedMeals.length / allMeals.length) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#003da5] via-[#0050cb] to-[#1a73e8] text-white rounded-3xl p-6 md:p-8 card-shadow shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <Utensils className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-[#ffd700] text-[11px] font-extrabold uppercase tracking-widest border border-white/20 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" /> 7-Day Nutrition Plan
              </span>
              <span className="text-xs text-[#d0e1ff] font-semibold">
                Balanced • High Protein • Clean Eating
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2.5">
              <Utensils className="w-7 h-7 text-[#ffd700]" /> Weekly Diet & Meal Planner
            </h1>
            <p className="text-xs md:text-sm text-[#dae1ff] max-w-2xl">
              Track your daily meals across Breakfast, Lunch, Evening Snack, and Dinner. Check off eaten items to calculate your live daily macros and calorie goals.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onResetDayChecks(selectedDay)}
              className="px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5"
              title="Reset checkmarks for selected day"
            >
              <RotateCcw className="w-4 h-4 text-amber-300" /> Reset Day Checks
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-[#ffd700] hover:bg-[#e6c200] text-[#002b70] font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" /> Print Diet Sheet
            </button>
          </div>
        </div>
      </div>

      {/* 2. Days Selector Bar */}
      <div className="bg-white rounded-2xl p-2.5 card-shadow border border-[#dee8ff] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {DAYS.map((day) => {
          const isSelected = selectedDay === day;
          const isToday = day === todayName;

          // Compute day completion
          const p = dietPlan.find((d) => d.day === day);
          const dayMeals = p ? [...p.breakfast, ...p.lunch, ...p.snack, ...p.dinner] : [];
          const dayCompletedCount = dayMeals.filter((m) => m.completed).length;
          const isAllDone = dayMeals.length > 0 && dayCompletedCount === dayMeals.length;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-center transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-[#0050cb] text-white font-extrabold shadow-sm'
                  : 'bg-[#f4f7ff] text-[#424656] hover:bg-[#e7eeff] font-bold'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-xs">
                <span>{day}</span>
                {isToday && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-amber-300' : 'bg-[#0050cb]'
                    }`}
                    title="Today"
                  />
                )}
              </div>

              <div className="text-[10px] mt-0.5 opacity-90 flex items-center justify-center gap-1">
                {isAllDone ? (
                  <span className="text-emerald-300 font-extrabold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> All Eaten
                  </span>
                ) : (
                  <span>
                    {dayCompletedCount}/{dayMeals.length} Meals
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Selected Day Macro Overview Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Calories */}
        <div className="bg-white rounded-2xl p-4 card-shadow border border-[#dee8ff] flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#72768a] uppercase tracking-wider block">
              Calories (Eaten / Goal)
            </span>
            <div className="text-lg font-black text-[#191c20] flex items-baseline gap-1">
              <span>{totalCaloriesEaten}</span>
              <span className="text-xs font-semibold text-[#72768a]">/ {totalCaloriesPlanned} kcal</span>
            </div>
            <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{
                  width: `${
                    totalCaloriesPlanned > 0
                      ? Math.min(100, (totalCaloriesEaten / totalCaloriesPlanned) * 100)
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Protein */}
        <div className="bg-white rounded-2xl p-4 card-shadow border border-[#dee8ff] flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#72768a] uppercase tracking-wider block">
              Protein
            </span>
            <div className="text-lg font-black text-[#191c20] flex items-baseline gap-1">
              <span>{totalProteinEaten}g</span>
              <span className="text-xs font-semibold text-[#72768a]">/ {totalProteinPlanned}g</span>
            </div>
            <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{
                  width: `${
                    totalProteinPlanned > 0
                      ? Math.min(100, (totalProteinEaten / totalProteinPlanned) * 100)
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Carbs */}
        <div className="bg-white rounded-2xl p-4 card-shadow border border-[#dee8ff] flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Apple className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#72768a] uppercase tracking-wider block">
              Carbohydrates
            </span>
            <div className="text-lg font-black text-[#191c20]">
              {totalCarbsPlanned}g <span className="text-xs font-normal text-[#72768a]">planned</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              Complex grain fiber
            </span>
          </div>
        </div>

        {/* Day Completion % */}
        <div className="bg-white rounded-2xl p-4 card-shadow border border-[#dee8ff] flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-[#0050cb] border border-blue-100">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#72768a] uppercase tracking-wider block">
              Meal Progress
            </span>
            <div className="text-lg font-black text-[#191c20]">{completionPct}%</div>
            <span className="text-[10px] text-[#0050cb] font-semibold block mt-0.5">
              {completedMeals.length} of {allMeals.length} eaten
            </span>
          </div>
        </div>
      </div>

      {/* 4. Meal Sections Grid (Breakfast, Lunch, Evening Snack, Dinner) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Breakfast Section */}
        <MealSectionCard
          title="Breakfast"
          timeWindow="7:00 AM – 9:00 AM"
          icon={Coffee}
          accentBg="bg-amber-50"
          accentText="text-amber-700"
          accentBorder="border-amber-200"
          badgeColor="bg-amber-100 text-amber-800"
          meals={dayPlan.breakfast}
          onToggle={(id) => onToggleMeal(selectedDay, 'breakfast', id)}
          onDelete={(id) => onDeleteMeal(selectedDay, 'breakfast', id)}
          onAdd={() => openAddModal('breakfast')}
        />

        {/* Lunch Section */}
        <MealSectionCard
          title="Lunch"
          timeWindow="12:30 PM – 2:00 PM"
          icon={Sun}
          accentBg="bg-emerald-50"
          accentText="text-emerald-700"
          accentBorder="border-emerald-200"
          badgeColor="bg-emerald-100 text-emerald-800"
          meals={dayPlan.lunch}
          onToggle={(id) => onToggleMeal(selectedDay, 'lunch', id)}
          onDelete={(id) => onDeleteMeal(selectedDay, 'lunch', id)}
          onAdd={() => openAddModal('lunch')}
        />

        {/* Evening Snack Section */}
        <MealSectionCard
          title="Evening Snack"
          timeWindow="4:30 PM – 6:00 PM"
          icon={Apple}
          accentBg="bg-purple-50"
          accentText="text-purple-700"
          accentBorder="border-purple-200"
          badgeColor="bg-purple-100 text-purple-800"
          meals={dayPlan.snack}
          onToggle={(id) => onToggleMeal(selectedDay, 'snack', id)}
          onDelete={(id) => onDeleteMeal(selectedDay, 'snack', id)}
          onAdd={() => openAddModal('snack')}
        />

        {/* Dinner Section */}
        <MealSectionCard
          title="Dinner"
          timeWindow="7:30 PM – 9:00 PM"
          icon={Moon}
          accentBg="bg-blue-50"
          accentText="text-[#0050cb]"
          accentBorder="border-blue-200"
          badgeColor="bg-blue-100 text-blue-800"
          meals={dayPlan.dinner}
          onToggle={(id) => onToggleMeal(selectedDay, 'dinner', id)}
          onDelete={(id) => onDeleteMeal(selectedDay, 'dinner', id)}
          onAdd={() => openAddModal('dinner')}
        />
      </div>

      {/* 5. Add Custom Meal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 card-shadow border border-[#dee8ff] space-y-4 relative animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-[#f0f4ff] pb-3">
              <h3 className="text-lg font-extrabold text-[#191c20] flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#0050cb]" /> Add Meal to {selectedDay} (
                <span className="capitalize text-[#0050cb]">{modalSection}</span>)
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#424656] mb-1">
                  Meal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Grilled Chicken Salad / Paneer Bhurji"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#c2cfeb] focus:border-[#0050cb] focus:ring-1 focus:ring-[#0050cb] text-xs font-semibold outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#424656] mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g., 350"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2cfeb] text-xs font-semibold outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#424656] mb-1">Protein (grams)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g., 25"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2cfeb] text-xs font-semibold outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#424656] mb-1">Carbs (grams)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g., 40"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2cfeb] text-xs font-semibold outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#424656] mb-1">Fats (grams)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g., 10"
                    value={fats}
                    onChange={(e) => setFats(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#c2cfeb] text-xs font-semibold outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#424656] mb-1">Recipe / Ingredient Notes</label>
                <input
                  type="text"
                  placeholder="e.g., Top with sliced almonds & black pepper"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#c2cfeb] text-xs font-semibold outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0050cb] hover:bg-[#003da5] text-white font-extrabold text-xs transition-all cursor-pointer shadow-sm"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for individual Meal Section Cards
interface MealSectionCardProps {
  title: string;
  timeWindow: string;
  icon: React.ElementType;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  badgeColor: string;
  meals: MealItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const MealSectionCard: React.FC<MealSectionCardProps> = ({
  title,
  timeWindow,
  icon: Icon,
  accentBg,
  accentText,
  accentBorder,
  badgeColor,
  meals,
  onToggle,
  onDelete,
  onAdd,
}) => {
  const sectionCalories = meals.reduce((acc, m) => acc + (m.calories || 0), 0);
  const sectionProtein = meals.reduce((acc, m) => acc + (m.proteinGrams || 0), 0);
  const completedCount = meals.filter((m) => m.completed).length;

  return (
    <div className="bg-white rounded-2xl p-5 card-shadow border border-[#dee8ff] hover:border-[#0050cb]/30 transition-all flex flex-col justify-between">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f0f4ff] mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${accentBg} ${accentText} ${accentBorder} border`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#191c20] flex items-center gap-2">
                {title}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${badgeColor}`}>
                  {completedCount}/{meals.length} eaten
                </span>
              </h3>
              <span className="text-xs text-[#72768a] font-medium">{timeWindow}</span>
            </div>
          </div>

          <button
            onClick={onAdd}
            className="p-2 rounded-xl bg-[#f4f7ff] hover:bg-[#0050cb] text-[#0050cb] hover:text-white transition-all cursor-pointer font-bold text-xs flex items-center gap-1 border border-[#dee8ff]"
            title={`Add meal to ${title}`}
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        {/* Meal Items List */}
        {meals.length === 0 ? (
          <div className="py-8 text-center bg-[#fafcff] rounded-xl border border-dashed border-[#dee8ff]">
            <p className="text-xs text-[#72768a] font-semibold">No meals listed for {title}.</p>
            <button
              onClick={onAdd}
              className="mt-2 text-xs text-[#0050cb] font-extrabold hover:underline"
            >
              + Add first item
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  meal.completed
                    ? 'bg-emerald-50/40 border-emerald-200 text-[#72768a]'
                    : 'bg-[#f8fafe] border-[#dee8ff] hover:border-[#0050cb]/40 text-[#191c20]'
                }`}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => onToggle(meal.id)}
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer border ${
                    meal.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white border-[#c2cfeb] hover:border-[#0050cb]'
                  }`}
                >
                  {meal.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                {/* Meal Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-bold break-words ${
                        meal.completed ? 'line-through text-gray-500' : 'text-[#191c20]'
                      }`}
                    >
                      {meal.name}
                    </span>

                    {/* Action buttons */}
                    <button
                      onClick={() => onDelete(meal.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                      title="Delete meal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {meal.notes && (
                    <p className="text-[11px] text-[#72768a] italic mt-0.5">{meal.notes}</p>
                  )}

                  {/* Nutrients Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[10px]">
                    {meal.calories !== undefined && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-800 font-bold">
                        {meal.calories} kcal
                      </span>
                    )}
                    {meal.proteinGrams !== undefined && (
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100/80 text-indigo-800 font-bold">
                        {meal.proteinGrams}g Protein
                      </span>
                    )}
                    {meal.carbsGrams !== undefined && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100/80 text-emerald-800 font-medium">
                        {meal.carbsGrams}g Carbs
                      </span>
                    )}
                    {meal.fatsGrams !== undefined && (
                      <span className="px-2 py-0.5 rounded-md bg-gray-200/80 text-gray-700 font-medium">
                        {meal.fatsGrams}g Fats
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats Summary for Section */}
      <div className="mt-4 pt-3 border-t border-[#f0f4ff] flex items-center justify-between text-xs font-bold text-[#72768a]">
        <span>Section Totals:</span>
        <div className="flex items-center gap-3">
          <span className="text-amber-700 font-extrabold">{sectionCalories} kcal</span>
          <span className="text-indigo-700 font-extrabold">{sectionProtein}g protein</span>
        </div>
      </div>
    </div>
  );
};
