import { useState } from "react";
import { Pencil, Save, X, User, Calendar, Hash, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

const mockUser: UserData = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: null,
  createdAt: "2024-01-15T10:30:00.000Z",
  updatedAt: "2024-06-20T14:45:00.000Z",
};

export default function Settings() {
  const [user, setUser] = useState<UserData>(mockUser);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; email: string }>({
    name: user.name,
    email: user.email,
  });

  const handleEdit = (): void => {
    setFormData({ name: user.name, email: user.email });
    setIsEditing(true);
  };

  const handleCancel = (): void => {
    setFormData({ name: user.name, email: user.email });
    setIsEditing(false);
  };

  const handleSave = (): void => {
    console.log("Saving user data:", formData);
    setUser((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      updatedAt: new Date().toISOString(),
    }));
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
            <div className="size-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto ring-4 ring-white shadow-lg">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="size-32 rounded-full object-cover"
                />
              ) : (
                <User className="size-16 text-gray-400" />
              )}
            </div>
            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              {user.name}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Hash className="size-4 text-gray-400" />
                <span className="font-mono">{user.id.slice(0, 8)}...</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="size-4 text-gray-400" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="size-4 text-gray-400" />
                <span>Updated {formatDate(user.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Profile Information
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Update your personal details here
                </p>
              </div>
              {!isEditing ? (
                <Button variant="outline" onClick={handleEdit}>
                  <Pencil className="size-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="size-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="size-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            <div className="p-6 space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-gray-700">
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="h-11"
                  />
                ) : (
                  <div className="h-11 px-3 flex items-center bg-gray-50 rounded-md text-gray-900">
                    {user.name}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="h-11"
                  />
                ) : (
                  <div className="h-11 px-3 flex items-center bg-gray-50 rounded-md text-gray-900">
                    {user.email}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 mt-6">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Danger Zone
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Irreversible and destructive actions
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Delete Account</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
