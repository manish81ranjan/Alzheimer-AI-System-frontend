// src/features/scans/scanHooks.js
import { useCallback, useEffect, useState } from "react";
import { scanService } from "./scanService";

/**
 * Custom hooks (no Redux required)
 * - Works now with mock backend later
 * - Clean API usage across pages
 */

export function useScansList(auto = true) {
  const [loading, setLoading] = useState(Boolean(auto));
  const [error, setError] = useState("");
  const [scans, setScans] = useState([]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await scanService.list();
      setScans(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Failed to load scans");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auto) refresh();
  }, [auto, refresh]);

  return { scans, loading, error, refresh };
}

export function useScanDetails(scanId, auto = true) {
  const [loading, setLoading] = useState(Boolean(auto));
  const [error, setError] = useState("");
  const [scan, setScan] = useState(null);

  const fetchOne = useCallback(async () => {
    if (!scanId) return;
    setLoading(true);
    setError("");
    try {
      const data = await scanService.get(scanId);
      setScan(data || null);
    } catch (err) {
      setError(err?.message || "Failed to load scan");
    } finally {
      setLoading(false);
    }
  }, [scanId]);

  useEffect(() => {
    if (auto) fetchOne();
  }, [auto, fetchOne]);

  return { scan, loading, error, fetchOne };
}

export function useUploadScan() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [scanId, setScanId] = useState("");

  const upload = useCallback(async (file) => {
    if (!file) return null;
    setUploading(true);
    setProgress(0);
    setError("");
    setScanId("");

    try {
      const res = await scanService.upload(file, {
        onProgress: (p) => setProgress(p),
      });
      if (res?.scanId) setScanId(res.scanId);
      return res;
    } catch (err) {
      setError(err?.message || "Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, progress, error, scanId };
}

export function useRunInference() {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const run = useCallback(async (scanId) => {
    if (!scanId) return null;
    setRunning(true);
    setError("");
    setResult(null);

    try {
      const data = await scanService.runInference(scanId);
      setResult(data);
      return data;
    } catch (err) {
      setError(err?.message || "Inference failed");
      return null;
    } finally {
      setRunning(false);
    }
  }, []);

  return { run, running, error, result };
}
