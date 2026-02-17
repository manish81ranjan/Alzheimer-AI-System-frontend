// // frontend/src/pages/UploadScan.jsx
// import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";

// /**
//  * UploadScan
//  * - Protected page
//  * - Drag & drop + file picker
//  * - Preview image
//  * - Progress UI (mock now)
//  * - Ready to connect to Flask:
//  *    POST /api/scans/upload  (multipart/form-data)
//  *    POST /api/infer/<scan_id>
//  */

// export default function UploadScan() {
//   const inputRef = useRef(null);

//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [status, setStatus] = useState("idle"); // idle | uploading | uploaded | error
//   const [progress, setProgress] = useState(0);
//   const [uploadedScanId, setUploadedScanId] = useState("");

//   function onPickFile(e) {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     loadFile(f);
//   }

//   function loadFile(f) {
//     // Accept common image formats (MRI slices often exported as png/jpg for demo)
//     const okTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
//     if (!okTypes.includes(f.type)) {
//       setStatus("error");
//       setFile(null);
//       setPreviewUrl("");
//       setUploadedScanId("");
//       return;
//     }

//     setStatus("idle");
//     setFile(f);
//     setUploadedScanId("");
//     const url = URL.createObjectURL(f);
//     setPreviewUrl(url);
//   }

//   function onDrop(e) {
//     e.preventDefault();
//     const f = e.dataTransfer.files?.[0];
//     if (!f) return;
//     loadFile(f);
//   }

//   function onDragOver(e) {
//     e.preventDefault();
//   }

//   async function uploadNow() {
//     if (!file) return;

//     // Mock progress (replace with real axios upload)
//     setStatus("uploading");
//     setProgress(0);
//     setUploadedScanId("");

//     let p = 0;
//     const timer = setInterval(() => {
//       p += Math.floor(Math.random() * 12) + 7;
//       if (p >= 100) {
//         p = 100;
//         clearInterval(timer);
//         setProgress(100);
//         setStatus("uploaded");

//         // Mock scan id from backend
//         setUploadedScanId("scan_" + Math.floor(Math.random() * 9000 + 1000));
//       } else {
//         setProgress(p);
//       }
//     }, 180);
//   }

//   async function runPrediction() {
//     if (!uploadedScanId) return;

//     // TODO (later): call backend inference endpoint:
//     // POST /api/infer/<scan_id>
//     // Then navigate to scan details page with results.
//     alert(
//       `Prediction triggered for ${uploadedScanId} ✅\n\nNext step: connect Flask endpoint and navigate to /scans/${uploadedScanId}`
//     );
//   }

//   function resetAll() {
//     setFile(null);
//     setPreviewUrl("");
//     setStatus("idle");
//     setProgress(0);
//     setUploadedScanId("");
//     if (inputRef.current) inputRef.current.value = "";
//   }

//   const isUploading = status === "uploading";
//   const isUploaded = status === "uploaded";
//   const isError = status === "error";

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
//         <div>
//           <div className="text-sm text-slate-400">Upload</div>
//           <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
//             Upload MRI Scan
//           </h1>
//           <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
//             Upload a single MRI image (PNG/JPG). The backend will preprocess to{" "}
//             <span className="text-slate-100">128×128 grayscale</span>, run
//             DEMNET-Lite prediction, optionally generate Grad-CAM, and create a
//             report.
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <Link
//             to="/dashboard"
//             className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//           >
//             Back to Dashboard
//           </Link>
//         </div>
//       </div>

//       {/* Main grid */}
//       <div className="mt-8 grid gap-4 lg:grid-cols-3">
//         {/* Dropzone */}
//         <div className="lg:col-span-2">
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//             <div className="text-base font-semibold text-white">
//               Select Scan
//             </div>
//             <div className="mt-1 text-xs text-slate-400">
//               Drag & drop or choose a file
//             </div>

//             <div
//               onDrop={onDrop}
//               onDragOver={onDragOver}
//               className="mt-4 grid place-items-center rounded-2xl border border-dashed border-white/15 bg-black/25 p-8 text-center transition hover:bg-black/35"
//             >
//               <div className="max-w-md">
//                 <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
//                   <span className="text-xl">⬆</span>
//                 </div>
//                 <div className="mt-3 text-sm font-semibold text-white">
//                   Drop MRI image here
//                 </div>
//                 <div className="mt-1 text-sm text-slate-400">
//                   Supports PNG, JPG, WEBP
//                 </div>

//                 <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
//                   <button
//                     onClick={() => inputRef.current?.click()}
//                     className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200 sm:w-auto"
//                   >
//                     Choose File
//                   </button>
//                   <button
//                     onClick={resetAll}
//                     className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10 sm:w-auto"
//                   >
//                     Reset
//                   </button>
//                 </div>

//                 <input
//                   ref={inputRef}
//                   type="file"
//                   accept="image/png,image/jpeg,image/jpg,image/webp"
//                   onChange={onPickFile}
//                   className="hidden"
//                 />

//                 {isError ? (
//                   <div className="mt-4 rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
//                     Invalid file type. Please upload PNG/JPG/WEBP image.
//                   </div>
//                 ) : null}
//               </div>
//             </div>

//             {/* Preview */}
//             <div className="mt-5">
//               <div className="text-xs text-slate-400">Preview</div>
//               <div className="mt-2 rounded-2xl border border-white/10 bg-black/25 p-3">
//                 {previewUrl ? (
//                   <img
//                     src={previewUrl}
//                     alt="MRI Preview"
//                     className="max-h-[360px] w-full rounded-xl object-contain"
//                   />
//                 ) : (
//                   <div className="grid h-[220px] place-items-center rounded-xl border border-white/10 bg-black/20 text-sm text-slate-400">
//                     No file selected
//                   </div>
//                 )}
//               </div>

//               {file ? (
//                 <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
//                   <div className="text-slate-300">
//                     <span className="text-slate-400">File:</span>{" "}
//                     <span className="font-semibold text-slate-100">
//                       {file.name}
//                     </span>
//                     <span className="text-slate-500">
//                       {" "}
//                       • {(file.size / (1024 * 1024)).toFixed(2)} MB
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Pill label="128×128 preprocess" />
//                     <Pill label="DEMNET-Lite" />
//                     <Pill label="Report" />
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>

//         {/* Right panel actions */}
//         <div className="space-y-4">
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//             <div className="text-base font-semibold text-white">Actions</div>
//             <div className="mt-1 text-xs text-slate-400">
//               Upload first, then run prediction
//             </div>

//             <div className="mt-4 grid gap-3">
//               <button
//                 onClick={uploadNow}
//                 disabled={!file || isUploading}
//                 className={[
//                   "rounded-xl px-4 py-3 text-sm font-medium transition",
//                   !file || isUploading
//                     ? "cursor-not-allowed bg-white/20 text-white/60"
//                     : "bg-white text-slate-950 hover:bg-slate-200",
//                 ].join(" ")}
//               >
//                 {isUploading ? "Uploading..." : "Upload Scan"}
//               </button>

//               <button
//                 onClick={runPrediction}
//                 disabled={!isUploaded || !uploadedScanId}
//                 className={[
//                   "rounded-xl px-4 py-3 text-sm font-semibold transition",
//                   !isUploaded || !uploadedScanId
//                     ? "cursor-not-allowed bg-emerald-400/20 text-emerald-100/60"
//                     : "bg-emerald-400 text-slate-950 hover:bg-emerald-300",
//                 ].join(" ")}
//               >
//                 Run Prediction
//               </button>

//               <Link
//                 to="/reports"
//                 className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-slate-100 transition hover:bg-white/10"
//               >
//                 View Reports
//               </Link>
//             </div>

//             {/* Progress */}
//             <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
//               <div className="flex items-center justify-between text-xs text-slate-400">
//                 <span>Status</span>
//                 <span className="text-slate-200">
//                   {statusLabel(status, uploadedScanId)}
//                 </span>
//               </div>

//               <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
//                 <div
//                   className="h-full bg-white transition-all"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>

//               <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
//                 <span>Progress</span>
//                 <span className="text-slate-200">{progress}%</span>
//               </div>

//               {uploadedScanId ? (
//                 <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
//                   Scan ID: <span className="font-semibold">{uploadedScanId}</span>
//                 </div>
//               ) : null}
//             </div>
//           </div>

//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//             <div className="text-base font-semibold text-white">
//               Backend Connection (Next)
//             </div>
//             <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
//               <li>
//                 Replace mock upload with{" "}
//                 <span className="text-slate-100">POST /api/scans/upload</span>
//               </li>
//               <li>
//                 Save returned <span className="text-slate-100">scanId</span>
//               </li>
//               <li>
//                 Trigger inference:{" "}
//                 <span className="text-slate-100">POST /api/infer/&lt;scanId&gt;</span>
//               </li>
//               <li>
//                 Navigate to{" "}
//                 <span className="text-slate-100">/scans/&lt;scanId&gt;</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------- helpers -------------------- */

// function Pill({ label }) {
//   return (
//     <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
//       {label}
//     </span>
//   );
// }

// function statusLabel(status, scanId) {
//   if (status === "idle") return "Ready";
//   if (status === "uploading") return "Uploading";
//   if (status === "uploaded") return scanId ? "Uploaded" : "Uploaded";
//   if (status === "error") return "Error";
//   return "—";
// }


// frontend/src/pages/UploadScan.jsx
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUploadScan, useRunInference } from "../features/scans/scanHooks";

/**
 * UploadScan (API-ready)
 * - Uses scanHooks:
 *   - upload(file) -> POST /api/scans/upload (multipart)
 *   - run(scanId)  -> POST /api/infer/:scanId
 *
 * After inference, navigates to /scans/:scanId
 */

export default function UploadScan() {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const { upload, uploading, progress, error, scanId } = useUploadScan();
  const {
    run: runInfer,
    running,
    error: inferError,
  } = useRunInference();

  function onPickFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    loadFile(f);
  }

  function loadFile(f) {
    const okTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!okTypes.includes(f.type)) {
      setFile(null);
      setPreviewUrl("");
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }

  function onDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    loadFile(f);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  async function uploadNow() {
    if (!file) return;
    await upload(file);
  }

  async function runPrediction() {
    if (!scanId) return;
    const res = await runInfer(scanId);
    if (res) {
      navigate(`/scans/${scanId}`);
    }
  }

  function resetAll() {
    setFile(null);
    setPreviewUrl("");
    if (inputRef.current) inputRef.current.value = "";
  }

  const canUpload = Boolean(file) && !uploading;
  const canPredict = Boolean(scanId) && !running;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm text-slate-400">Upload</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            Upload MRI Scan
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
            Upload a single MRI image (PNG/JPG/WEBP). Backend will preprocess
            and run prediction (ND/VMD/MID/MOD).
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* Dropzone */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-base font-semibold text-white">
              Select Scan
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Drag & drop or choose a file
            </div>

            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="mt-4 grid place-items-center rounded-2xl border border-dashed border-white/15 bg-black/25 p-8 text-center transition hover:bg-black/35"
            >
              <div className="max-w-md">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <span className="text-xl">⬆</span>
                </div>
                <div className="mt-3 text-sm font-semibold text-white">
                  Drop MRI image here
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  Supports PNG, JPG, WEBP
                </div>

                <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200 sm:w-auto"
                  >
                    Choose File
                  </button>
                  <button
                    onClick={resetAll}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10 sm:w-auto"
                  >
                    Reset
                  </button>
                </div>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={onPickFile}
                  className="hidden"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="mt-5">
              <div className="text-xs text-slate-400">Preview</div>
              <div className="mt-2 rounded-2xl border border-white/10 bg-black/25 p-3">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="MRI Preview"
                    className="max-h-[360px] w-full rounded-xl object-contain"
                  />
                ) : (
                  <div className="grid h-[220px] place-items-center rounded-xl border border-white/10 bg-black/20 text-sm text-slate-400">
                    No file selected
                  </div>
                )}
              </div>

              {file ? (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <div className="text-slate-300">
                    <span className="text-slate-400">File:</span>{" "}
                    <span className="font-semibold text-slate-100">
                      {file.name}
                    </span>
                    <span className="text-slate-500">
                      {" "}
                      • {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill label="Preprocess 128×128" />
                    <Pill label="Predict 4 stages" />
                    <Pill label="Report ready" />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right panel actions */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-base font-semibold text-white">Actions</div>
            <div className="mt-1 text-xs text-slate-400">
              Upload first, then run prediction
            </div>

            <div className="mt-4 grid gap-3">
              <button
                onClick={uploadNow}
                disabled={!canUpload}
                className={[
                  "rounded-xl px-4 py-3 text-sm font-medium transition",
                  !canUpload
                    ? "cursor-not-allowed bg-white/20 text-white/60"
                    : "bg-white text-slate-950 hover:bg-slate-200",
                ].join(" ")}
              >
                {uploading ? "Uploading..." : "Upload Scan"}
              </button>

              <button
                onClick={runPrediction}
                disabled={!canPredict}
                className={[
                  "rounded-xl px-4 py-3 text-sm font-semibold transition",
                  !canPredict
                    ? "cursor-not-allowed bg-emerald-400/20 text-emerald-100/60"
                    : "bg-emerald-400 text-slate-950 hover:bg-emerald-300",
                ].join(" ")}
              >
                {running ? "Running..." : "Run Prediction"}
              </button>

              <Link
                to="/reports"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-slate-100 transition hover:bg-white/10"
              >
                View Reports
              </Link>
            </div>

            {/* Progress + status */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Upload Progress</span>
                <span className="text-slate-200">{progress}%</span>
              </div>

              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {scanId ? (
                <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
                  Scan ID: <span className="font-semibold">{scanId}</span>
                </div>
              ) : null}

              {error ? (
                <div className="mt-3 rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              ) : null}

              {inferError ? (
                <div className="mt-3 rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {inferError}
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-base font-semibold text-white">
              Backend Note
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
              <li>
                Upload endpoint:{" "}
                <span className="text-slate-100">POST /api/scans/upload</span>
              </li>
              <li>
                Inference endpoint:{" "}
                <span className="text-slate-100">POST /api/infer/:scanId</span>
              </li>
              <li>
                Return scanId + prediction JSON for UI
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- helpers -------------------- */

function Pill({ label }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
      {label}
    </span>
  );
}
