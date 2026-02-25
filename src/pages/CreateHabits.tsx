import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Menu,
  ArrowLeft,
  Plus,
  Loader2,
  Trash2,
  CheckCircle2,
  Target,
  AlertCircle,
} from "lucide-react";
import {
  createHabitSchema,
  type CreateHabitInput,
} from "@/schemas/habitSchema";
import { useMyChallengeProgress } from "@/hooks/queries/useChallenge";
import { useHabitsInChallenge } from "@/hooks/queries/useHabits";
import { useCreateHabit, useDeleteHabit } from "@/hooks/mutations/useHabitsMutations";

const CreateHabits = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const { data: progressData, isLoading: challengeLoading } = useMyChallengeProgress(challengeId!);
  const challenge = progressData?.challenge;
  const userChallengeId = progressData?.userChallenge?.id ?? '';
  const todayCompleted = progressData?.todayCompleted ?? false;
  const challengeCompleted = progressData?.userChallenge?.status === "completed";
  const { data: habits = [], isLoading: habitsLoading } = useHabitsInChallenge(userChallengeId);
  const createHabit = useCreateHabit();
  const deleteHabit = useDeleteHabit();

  const form = useForm<CreateHabitInput>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: { title: "" },
  });

  const onSubmit = (data: CreateHabitInput) => {
    setSuccessMessage("");
    createHabit.mutate(
      { challengeId: userChallengeId, data },
      {
        onSuccess: (created) => {
          form.reset();
          setSuccessMessage(`"${created.title}" has been added successfully!`);
          setTimeout(() => setSuccessMessage(""), 3000);
        },
      }
    );
  };

  const handleDeleteHabit = (habitId: string) => {
    if (deletingIds.has(habitId)) return;
    setDeletingIds((prev) => new Set(prev).add(habitId));
    deleteHabit.mutate(habitId, {
      onSettled: () => {
        setDeletingIds((prev) => {
          const next = new Set(prev);
          next.delete(habitId);
          return next;
        });
      },
    });
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
          <h1 className="text-xl font-bold text-gray-900">Create Habits</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 ">
          {/* Back Button */}
          <Link
            to={`/my-challenges`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Challenge
          </Link>

          {/* Header */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Habits in Challenge
            </h1>
            <p className="text-gray-600">
              Add habits to track within your challenge
            </p>
          </div>

          {/* Challenge Info */}
          <Card className="mb-6 border-2 border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">
                  {challengeLoading ? "Loading..." : challenge?.title}
                </h2>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-gray-600">{challenge?.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Duration: {challenge?.durationDays} days
              </p>
            </CardContent>
          </Card>

          {/* Today Completed Banner */}
          {todayCompleted && !challengeCompleted && (
            <div className="mb-6 flex items-start gap-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-5">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-amber-800 text-base">
                  Adding new habits is disabled after you've completed your first day.
                </p>
                <p className="text-sm text-amber-700 mt-0.5">
                  You've already completed today's session. Come back tomorrow to add more habits!
                </p>
              </div>
            </div>
          )}

          {/* Challenge Completed Banner */}
          {challengeCompleted && (
            <div className="mb-6 flex items-start gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-emerald-800 text-base">
                  Challenge completed!
                </p>
                <p className="text-sm text-emerald-700 mt-0.5">
                  This challenge is finished. You can no longer add or remove habits.
                </p>
              </div>
            </div>
          )}

          {/* Create Habit Form */}
          <Card className={`mb-6 border-2 ${todayCompleted || challengeCompleted ? "border-gray-100 opacity-60 pointer-events-none" : "border-gray-200"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-500" />
                Add New Habit
              </CardTitle>
            </CardHeader>
            <CardContent>
              {successMessage && (
                <div className="mb-4 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {successMessage}
                </div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Habit Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Read 10 pages, Drink 8 glasses of water..."
                            className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={createHabit.isPending}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200"
                    >
                      {createHabit.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Habit
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                      className="border-gray-300"
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Existing Habits List */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Habits in this Challenge</span>
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {habitsLoading ? "..." : `${habits.length} habit${habits.length !== 1 ? "s" : ""}`}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {habits.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No habits added yet.</p>
                  <p className="text-sm mt-1">
                    Create your first habit above to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {habits.map((habit, index) => (
                    <div
                      key={habit.id}
                      className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {habit.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Created{" "}
                            {new Date(habit.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteHabit(habit.id)}
                        disabled={deletingIds.has(habit.id) || todayCompleted || challengeCompleted}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                      >
                        {deletingIds.has(habit.id) ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {habits.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => navigate(`/my-challenges`)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Done - Back to My Challenges
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/my-challenges")}
                    className="border-gray-300"
                  >
                    Back to My Challenges
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateHabits;
