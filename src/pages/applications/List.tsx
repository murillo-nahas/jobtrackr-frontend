import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Plus,
  Search,
  MapPin,
  ExternalLink,
  Calendar,
  MoreVertical,
  Pencil,
  Trash2,
  Building2,
  Briefcase,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Application } from "@/lib/types/application";
import { ApplicationStatus, STATUS_CONFIG } from "@/lib/types/application";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";

export default function List() {
  const { token } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<Application | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    const fetchApplications = async (): Promise<void> => {
      if (!token) return;

      try {
        setLoading(true);
        const response = await api.applications.list(token);
        setApplications(response.data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.position.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteClick = (app: Application): void => {
    setApplicationToDelete(app);
    setDeleteDialogOpen(true);
    setOpenMenuId(null);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!applicationToDelete || !token) return;

    try {
      setDeleting(true);
      await api.applications.delete(token, applicationToDelete.id);
      setApplications((prev) =>
        prev.filter((app) => app.id !== applicationToDelete.id)
      );
      setDeleteDialogOpen(false);
      setApplicationToDelete(null);
    } catch (error) {
      console.error("Failed to delete application:", error);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusCounts = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <Loader2 className="size-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500 mt-1">
            Track and manage your job applications
          </p>
        </div>
        <Button asChild>
          <Link to="/applications/new">
            <Plus className="size-4" />
            New Application
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {Object.values(ApplicationStatus).map((status) => {
          const config = STATUS_CONFIG[status];
          const count = statusCounts[status] || 0;
          return (
            <button
              key={status}
              onClick={() =>
                setStatusFilter(statusFilter === status ? "ALL" : status)
              }
              className={`p-3 rounded-xl border text-left transition-all ${statusFilter === status
                ? `${config.bgColor} ring-2 ring-offset-1 ring-gray-300`
                : "bg-white border-gray-200 hover:border-gray-300"
                }`}
            >
              <p className={`text-2xl font-bold ${config.color}`}>{count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{config.label}</p>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search by company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        {statusFilter !== "ALL" && (
          <Button variant="outline" onClick={() => setStatusFilter("ALL")}>
            Clear filter
          </Button>
        )}
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Briefcase className="size-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No applications found
          </h3>
          <p className="text-gray-500 mt-1 mb-6">
            {search || statusFilter !== "ALL"
              ? "Try adjusting your filters"
              : "Start tracking your job applications"}
          </p>
          {!search && statusFilter === "ALL" && (
            <Button asChild>
              <Link to="/applications/new">
                <Plus className="size-4" />
                Add your first application
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredApplications.map((app) => {
            const statusConfig = STATUS_CONFIG[app.status];
            return (
              <div
                key={app.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="size-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Building2 className="size-6 text-gray-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {app.position}
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.color}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-0.5">{app.company}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 flex-wrap">
                        {app.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="size-3.5" />
                            {app.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="size-3.5" />
                          Applied {formatDate(app.appliedAt)}
                        </span>
                        {app.jobUrl && (
                          <a
                            href={app.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700"
                          >
                            <ExternalLink className="size-3.5" />
                            View Job
                          </a>
                        )}
                      </div>
                      {app.additionalNotes && (
                        <p className="text-sm text-gray-500 mt-2 line-clamp-1">
                          {app.additionalNotes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setOpenMenuId(openMenuId === app.id ? null : app.id)
                      }
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                    {openMenuId === app.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg border border-gray-200 shadow-lg z-20 py-1">
                          <Link
                            to={`/applications/${app.id}/edit`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setOpenMenuId(null)}
                          >
                            <Pencil className="size-4" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(app)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your application to{" "}
              <span className="font-medium text-gray-900">
                {applicationToDelete?.company}
              </span>{" "}
              for the position of{" "}
              <span className="font-medium text-gray-900">
                {applicationToDelete?.position}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleting}
            >
              {deleting && <Loader2 className="size-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
