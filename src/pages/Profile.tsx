import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Edit2,
  Check,
  X,
  Share2,
  Menu,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { useMe } from "@/hooks/queries/useAuth";
import { useUpdateProfile } from "@/hooks/mutations/useAuthMutations";
import { useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [copied, setCopied] = useState(false);

  const { data: user, isLoading } = useMe();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const queryClient = useQueryClient();

  const handleEditStart = () => {
    setNameValue(user?.name ?? "");
    setEditingName(true);
  };

  const handleEditCancel = () => {
    setEditingName(false);
  };

  const handleEditSave = () => {
    if (!nameValue.trim() || nameValue === user?.name) {
      setEditingName(false);
      return;
    }
    updateProfile(
      { name: nameValue.trim() },
      {
        onSuccess: (updated) => {
          // Also update the cached auth context user
          queryClient.setQueryData(["auth", "me"], updated);
          // Update localStorage to keep context in sync
          const stored = localStorage.getItem("user");
          if (stored) {
            const parsed = JSON.parse(stored);
            localStorage.setItem("user", JSON.stringify({ ...parsed, name: updated.name }));
          }
          setEditingName(false);
        },
      }
    );
  };

  const handleShareProfile = () => {
    if (!user) return;
    const url = `${window.location.origin}/public/${user.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">My Profile</h1>
            <p className="text-gray-500">Manage your account details</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
          ) : !user ? (
            <Card className="border-2 border-red-200">
              <CardContent className="p-8 text-center text-red-500">
                Failed to load profile.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left col — avatar + share */}
              <div className="lg:col-span-1">
                <Card className="border-2 border-gray-200 h-full">
                  <CardContent className="p-8 flex flex-col items-center text-center gap-5 h-full justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-4xl font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                      <p className="text-gray-500 text-sm mt-1 break-all">{user.email}</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-2">
                      <Button
                        onClick={handleShareProfile}
                        variant="outline"
                        className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50 w-full"
                      >
                        <Share2 className="w-4 h-4" />
                        {copied ? "Copied!" : "Share Profile"}
                      </Button>
                      <Link to={`/public/${user.id}`} target="_blank">
                        <Button variant="ghost" size="sm" className="w-full text-gray-500 hover:text-gray-700">
                          View public page →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right col — details */}
              <div className="lg:col-span-2">
              <Card className="border-2 border-gray-200 h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Account Details</CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-gray-100">
                  {/* Name */}
                  <div className="flex items-center justify-between py-4 gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Name</p>
                        {editingName ? (
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              value={nameValue}
                              onChange={(e) => setNameValue(e.target.value)}
                              className="h-8 text-sm"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleEditSave();
                                if (e.key === "Escape") handleEditCancel();
                              }}
                            />
                            <Button
                              size="icon"
                              className="h-8 w-8 bg-green-500 hover:bg-green-600"
                              onClick={handleEditSave}
                              disabled={isPending}
                            >
                              {isPending ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={handleEditCancel}
                              disabled={isPending}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <p className="font-semibold text-gray-800">{user.name}</p>
                        )}
                      </div>
                    </div>
                    {!editingName && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEditStart}
                        className="text-gray-400 hover:text-gray-700 flex-shrink-0"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 py-4">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email</p>
                      <p className="font-semibold text-gray-800">{user.email}</p>
                    </div>
                  </div>

                  {/* Member since */}
                  <div className="flex items-center gap-3 py-4">
                    <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Member Since</p>
                      <p className="font-semibold text-gray-800">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
