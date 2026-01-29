export const ApplicationStatus = {
  APPLIED: "APPLIED",
  INTERVIEW: "INTERVIEW",
  OFFER: "OFFER",
  REJECTED: "REJECTED",
  WITHDRAWN: "WITHDRAWN",
  GHOSTED: "GHOSTED",
} as const;

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export type Application = {
  id: string;
  userId: string;
  company: string;
  position: string;
  jobUrl: string | null;
  location: string | null;
  status: ApplicationStatus;
  additionalNotes: string | null;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type CreateApplicationDTO = {
  company: string;
  position: string;
  jobUrl?: string;
  location?: string;
  status?: ApplicationStatus;
  additionalNotes?: string;
  appliedAt?: string;
};

export type UpdateApplicationDTO = Partial<CreateApplicationDTO>;

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; color: string; bgColor: string }
> = {
  [ApplicationStatus.APPLIED]: {
    label: "Applied",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
  },
  [ApplicationStatus.INTERVIEW]: {
    label: "Interview",
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
  },
  [ApplicationStatus.OFFER]: {
    label: "Offer",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
  },
  [ApplicationStatus.REJECTED]: {
    label: "Rejected",
    color: "text-red-700",
    bgColor: "bg-red-50 border-red-200",
  },
  [ApplicationStatus.WITHDRAWN]: {
    label: "Withdrawn",
    color: "text-gray-700",
    bgColor: "bg-gray-50 border-gray-200",
  },
  [ApplicationStatus.GHOSTED]: {
    label: "Ghosted",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200",
  },
};
