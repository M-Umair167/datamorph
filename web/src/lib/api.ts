const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface UploadResponse {
  id: string;
  filename: string;
  format_detected: string;
  file_size: number;
  status: string;
  created_at: string;
}

export interface ApiError {
  detail: string;
}

/**
 * Upload a file to the backend API.
 * Requires auth token — redirects to signup if not available.
 */
export async function uploadFile(
  file: File,
  token?: string,
  projectId?: string,
  onProgress?: (pct: number) => void
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  if (projectId) {
    formData.append("project_id", projectId);
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Use XMLHttpRequest for progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/api/v1/uploads/`);

    // Set auth header
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err.detail || "Upload failed"));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}

/**
 * Login to the backend API
 */
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Login failed" }));
    throw new Error(err.detail);
  }
  return res.json();
}

/**
 * Signup to the backend API
 */
export async function signup(email: string, password: string, fullName: string) {
  const res = await fetch(`${API_URL}/api/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, full_name: fullName }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Signup failed" }));
    throw new Error(err.detail);
  }
  return res.json();
}
