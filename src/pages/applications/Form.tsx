import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import {
  ArrowLeft,
  Save,
  Building2,
  Briefcase,
  MapPin,
  Link2,
  FileText,
  Calendar,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateApplicationDTO } from "@/lib/types/application";
import { ApplicationStatus, STATUS_CONFIG } from "@/lib/types/application";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";

export default function Form() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateApplicationDTO>({
    company: "",
    position: "",
    jobUrl: "",
    location: "",
    status: ApplicationStatus.APPLIED,
    additionalNotes: "",
    appliedAt: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const fetchApplication = async (): Promise<void> => {
      if (!isEditing || !token || !id) return;

      try {
        setLoading(true);
        const application = await api.applications.getById(token, id);
        setFormData({
          company: application.company,
          position: application.position,
          jobUrl: application.jobUrl || "",
          location: application.location || "",
          status: application.status,
          additionalNotes: application.additionalNotes || "",
          appliedAt: application.appliedAt.split("T")[0],
        });
      } catch (error) {
        console.error("Failed to fetch application:", error);
        navigate("/applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [isEditing, token, id, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!token) return;

    try {
      setSubmitting(true);

      const payload: CreateApplicationDTO = {
        company: formData.company,
        position: formData.position,
        status: formData.status,
        ...(formData.jobUrl && { jobUrl: formData.jobUrl }),
        ...(formData.location && { location: formData.location }),
        ...(formData.additionalNotes && {
          additionalNotes: formData.additionalNotes,
        }),
        ...(formData.appliedAt && {
          appliedAt: new Date(formData.appliedAt).toISOString(),
        }),
      };

      if (isEditing && id) {
        await api.applications.update(token, id, payload);
      } else {
        await api.applications.create(token, payload);
      }

      navigate("/applications");
    } catch (error) {
      console.error("Failed to save application:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <Loader2 className="size-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8">
        <Link
          to="/applications"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="size-4" />
          Back to Applications
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? "Edit Application" : "New Application"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isEditing
            ? "Update the details of your job application"
            : "Track a new job application"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Application Details</h2>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building2 className="size-4 text-gray-400" />
                  Company *
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g., Google"
                  required
                  className="h-11"
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="flex items-center gap-2">
                  <Briefcase className="size-4 text-gray-400" />
                  Position *
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g., Frontend Developer"
                  required
                  className="h-11"
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="size-4 text-gray-400" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco, CA or Remote"
                  className="h-11"
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobUrl" className="flex items-center gap-2">
                  <Link2 className="size-4 text-gray-400" />
                  Job URL
                </Label>
                <Input
                  id="jobUrl"
                  name="jobUrl"
                  type="url"
                  value={formData.jobUrl}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="h-11"
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none disabled:opacity-50"
                >
                  {Object.values(ApplicationStatus).map((status) => (
                    <option key={status} value={status}>
                      {STATUS_CONFIG[status].label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appliedAt" className="flex items-center gap-2">
                  <Calendar className="size-4 text-gray-400" />
                  Applied Date
                </Label>
                <Input
                  id="appliedAt"
                  name="appliedAt"
                  type="date"
                  value={formData.appliedAt}
                  onChange={handleInputChange}
                  className="h-11"
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="additionalNotes"
                className="flex items-center gap-2"
              >
                <FileText className="size-4 text-gray-400" />
                Additional Notes
              </Label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Add any notes about this application..."
                rows={4}
                disabled={submitting}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none resize-none disabled:opacity-50"
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/applications")}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {isEditing ? "Save Changes" : "Create Application"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
