import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  Plus,
  CheckCircle2,
  Circle,
  Flame,
  Target,
  TrendingUp,
  X,
  BarChart2,
  Loader2,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";
import { useUserHabitsSummary } from "@/hooks/queries/useHabits";
import { useCreateUserHabit, useUpdateUserHabit, useDeleteUserHabit, useLogUserHabit } from "@/hooks/mutations/useHabitsMutations";

const COLOR_OPTIONS = [
  "#3b82f6",
  "#10b981",
  "#06b6d4",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#14b8a6",
];

const UserHabits = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newColor, setNewColor] = useState(COLOR_OPTIONS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editColor, setEditColor] = useState(COLOR_OPTIONS[0]);

  const summaryQuery = useUserHabitsSummary();
  const createMutation = useCreateUserHabit();
  const logMutation = useLogUserHabit();
  const updateMutation = useUpdateUserHabit();
  const deleteMutation = useDeleteUserHabit();

  const summary = summaryQuery.data;
  const habitItems = summary?.habits ?? [];

  const completedToday = summary?.completedTodayCount ?? 0;
  const totalHabits = summary?.totalHabits ?? 0;
  const bestStreak = habitItems.reduce(
    (max, h) => Math.max(max, h.longestStreak),
    0
  );
  const totalCompletions = habitItems.reduce(
    (sum, h) => sum + h.totalCompletions,
    0
  );

  const handleToggleLog = (habitId: string, completedToday: boolean) => {
    if (!completedToday) {
      logMutation.mutate(habitId);
    }
  };

  const handleCreateHabit = () => {
    if (!newTitle.trim()) return;
    createMutation.mutate(
      {
        title: newTitle.trim(),
        description: newDescription.trim() || undefined,
        color: newColor,
      },
      {
        onSuccess: () => {
          setNewTitle("");
          setNewDescription("");
          setNewColor(COLOR_OPTIONS[0]);
          setShowForm(false);
        },
      }
    );
  };

  const startEdit = (habit: { id: string; title: string; description?: string | null; color: string }) => {
    setEditingId(habit.id);
    setEditTitle(habit.title);
    setEditDescription(habit.description ?? "");
    setEditColor(habit.color);
  };

  const confirmEdit = (habitId: string) => {
    if (!editTitle.trim()) return;
    updateMutation.mutate(
      {
        habitId,
        data: {
          title: editTitle.trim(),
          description: editDescription.trim() || undefined,
          color: editColor,
        },
      },
      { onSuccess: () => setEditingId(null) }
    );
  };

  const handleDelete = (habitId: string) => {
    deleteMutation.mutate(habitId);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">My Habits</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          {/* Header */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">My Habits</h1>
              <p className="text-gray-600">Build consistency with daily habits</p>
            </div>
            <Button
              onClick={() => setShowForm((v) => !v)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Habit
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Done Today</p>
                  <p className="text-xl font-bold text-gray-900">
                    {completedToday}/{totalHabits}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Flame className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Best Streak</p>
                  <p className="text-xl font-bold text-gray-900">{bestStreak} days</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Completions</p>
                  <p className="text-xl font-bold text-gray-900">{totalCompletions}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Habit Form */}
          {showForm && (
            <Card className="mb-6 border-2 border-blue-200 bg-blue-50/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-blue-500" />
                    Add New Habit
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setShowForm(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Habit title (e.g. Drink 8 glasses of water)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border-gray-200"
                />
                <Input
                  placeholder="Description (optional)"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="border-gray-200"
                />
                <div>
                  <p className="text-xs text-gray-500 mb-2">Pick a color</p>
                  <div className="flex gap-2 flex-wrap">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewColor(color)}
                        className={`w-7 h-7 rounded-full transition-all ${
                          newColor === color
                            ? "ring-2 ring-offset-2 ring-gray-500 scale-110"
                            : "hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    onClick={handleCreateHabit}
                    disabled={!newTitle.trim() || createMutation.isPending}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                  >
                    {createMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 mr-1" />
                    )}
                    Add Habit
                  </Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mobile Add Button */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setShowForm((v) => !v)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Habit
            </Button>
          </div>

          {/* Loading */}
          {summaryQuery.isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          )}

          {/* Error */}
          {summaryQuery.isError && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-red-500 font-medium">Failed to load habits.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => summaryQuery.refetch()}
              >
                Retry
              </Button>
            </div>
          )}

          {/* Habits List */}
          {!summaryQuery.isLoading && !summaryQuery.isError && (
            habitItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">No habits yet</h3>
                <p className="text-gray-500 mb-4">Create your first habit to start building consistency</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Habit
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {habitItems.map((item) => {
                  const { habit, currentStreak, totalCompletions: completions, completedToday: logged } = item;
                  const isLogging = logMutation.isPending && logMutation.variables === habit.id;
                  const isEditing = editingId === habit.id;
                  const isSaving = updateMutation.isPending && updateMutation.variables?.habitId === habit.id;
                  const isDeleting = deleteMutation.isPending && deleteMutation.variables === habit.id;

                  return (
                    <Card
                      key={habit.id}
                      className={`border-2 transition-all duration-200 ${
                        logged
                          ? "border-green-200 bg-green-50/40"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          {/* Color dot + toggle */}
                          <button
                            onClick={() => handleToggleLog(habit.id, logged)}
                            disabled={logged || isLogging || isEditing}
                            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-80"
                            style={{
                              backgroundColor: logged
                                ? habit.color
                                : `${habit.color}20`,
                              border: `2px solid ${habit.color}`,
                            }}
                          >
                            {isLogging ? (
                              <Loader2 className="w-5 h-5 text-white animate-spin" />
                            ) : logged ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : (
                              <Circle
                                className="w-5 h-5"
                                style={{ color: habit.color }}
                              />
                            )}
                          </button>

                          {/* Title / Edit form */}
                          <div className="flex-1 min-w-0">
                            {isEditing ? (
                              <div className="space-y-2">
                                <Input
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  className="h-8 text-sm border-gray-300"
                                  autoFocus
                                />
                                <Input
                                  value={editDescription}
                                  onChange={(e) => setEditDescription(e.target.value)}
                                  placeholder="Description (optional)"
                                  className="h-8 text-sm border-gray-300"
                                />
                                <div className="flex gap-1.5 flex-wrap">
                                  {COLOR_OPTIONS.map((color) => (
                                    <button
                                      key={color}
                                      onClick={() => setEditColor(color)}
                                      className={`w-6 h-6 rounded-full transition-all ${
                                        editColor === color
                                          ? "ring-2 ring-offset-1 ring-gray-500 scale-110"
                                          : "hover:scale-105"
                                      }`}
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <>
                                <p
                                  className={`font-semibold text-gray-900 truncate ${
                                    logged ? "line-through text-green-700" : ""
                                  }`}
                                >
                                  {habit.title}
                                </p>
                                {habit.description && (
                                  <p className="text-xs text-gray-500 truncate mt-0.5">
                                    {habit.description}
                                  </p>
                                )}
                              </>
                            )}
                          </div>

                          {/* Stats (hidden while editing) */}
                          {!isEditing && (
                            <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                              <div className="text-center">
                                <div className="flex items-center gap-1">
                                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                                  <span className="text-sm font-bold text-gray-900">
                                    {currentStreak}
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-400">streak</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                                  <span className="text-sm font-bold text-gray-900">
                                    {completions}
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-400">total</p>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {isEditing ? (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-green-600 hover:bg-green-50"
                                  disabled={!editTitle.trim() || isSaving}
                                  onClick={() => confirmEdit(habit.id)}
                                >
                                  {isSaving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Check className="w-4 h-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-500 hover:bg-gray-100"
                                  onClick={() => setEditingId(null)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Link to={`/my-habits/${habit.id}/analytics`}>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50"
                                  >
                                    <BarChart2 className="w-4 h-4" />
                                  </Button>
                                </Link>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                                  onClick={() => startEdit(habit)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                  disabled={isDeleting}
                                  onClick={() => handleDelete(habit.id)}
                                >
                                  {isDeleting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default UserHabits;
