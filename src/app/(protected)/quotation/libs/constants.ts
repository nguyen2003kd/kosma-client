export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const FILE_TYPE_EXTENSIONS: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
};

export const SERVICE_OPTIONS = [
  { value: "science-tech", label: "Dịch vụ khoa học & công nghệ" },
  { value: "inspection", label: "Đăng ký kiểm định, thử nghiệm, hiệu chuẩn" },
  { value: "research", label: "Nghiên cứu khoa học" },
  { value: "training", label: "Đào tạo và phát triển" },
  { value: "consulting", label: "Tư vấn doanh nghiệp" },
  { value: "other", label: "Dịch vụ khác" },
];
