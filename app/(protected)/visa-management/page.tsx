// "use client";

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, useAppDispatch } from "../../lib/redux/store";
// import { uploadDocument } from "../../lib/redux/slices/documentSlice";
// import Link from "next/link";
// import { auth } from "@/auth"; // Assuming this is an async function to get the session

// const VisaManagementPage = () => {
//   const dispatch = useAppDispatch();
//   const { documents, loading, error } = useSelector((state: RootState) => state.document);
//   const employeeId = "EMPLOYEE_ID"; // Replace with actual ID retrieval logic

//   const getDocumentStatusMessage = (docType: string) => {
//     const document = documents.find((doc) => doc.documentType === docType);
//     if (!document) return "";

//     switch (document.status) {
//       case "PENDING":
//         return `Waiting for HR to approve your ${getDisplayName(docType)}`;
//       case "APPROVED":
//         if (docType === "OPT_RECEIPT") return "Please upload a copy of your OPT EAD.";
//         if (docType === "OPT_EAD") return "Please download and fill out the I-983 form.";
//         if (docType === "I_983") return "Please send the I-983 along all necessary documents to your school and upload the new I-20.";
//         if (docType === "I_20") return "All documents have been approved.";
//         break;
//       case "REJECTED":
//         return `HR feedback: ${document.feedback}`;
//     }
//     return "";
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       const fileName = file.name;
//       const fileUrl = URL.createObjectURL(file);

//       // Dispatch the uploadDocument action with the appropriate document type
//       dispatch(uploadDocument({ employeeId, fileName, fileUrl, documentType: docType }));
//     }
//   };

//   // Helper function to check if the user can upload the next document
//   const canUploadDocument = (docType: string) => {
//     const previousDocs = ["OPT_RECEIPT", "OPT_EAD", "I_983"];
//     const index = previousDocs.indexOf(docType);
//     if (index === 0) return true; // OPT Receipt can always be uploaded first

//     const previousDocument = documents.find((doc) => doc.documentType === previousDocs[index - 1]);
//     return previousDocument && previousDocument.status === "APPROVED";
//   };

//   // Helper function to get the display name of the document type
//   const getDisplayName = (docType: string) => {
//     switch (docType) {
//       case "OPT_RECEIPT":
//         return "OPT Receipt";
//       case "OPT_EAD":
//         return "OPT EAD";
//       case "I_983":
//         return "I-983";
//       case "I_20":
//         return "I-20";
//       default:
//         return docType;
//     }
//   };

//   return (
//     <section className="main-container">
//       <h1 className="header-text text-3xl font-bold mt-4">
//         Manage Your OPT Documents
//       </h1>
//       {["OPT_RECEIPT", "OPT_EAD", "I_983", "I_20"].map((docType) => (
//         <div key={docType} className="document-section mt-4">
//           <h2 className="text-xl font-semibold">{getDisplayName(docType)}</h2>
//           <p className="mt-2 text-lg">{getDocumentStatusMessage(docType)}</p>
//           {canUploadDocument(docType) && (
//             <div className="upload-file-container mt-2">
//               <input
//                 type="file"
//                 onChange={(e) => handleFileUpload(e, docType)}
//                 disabled={loading}
//               />
//             </div>
//           )}
//         </div>
//       ))}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </section>
//   );
// };

// export default VisaManagementPage;

// "use client";

// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState, useAppDispatch } from "../../lib/redux/store";
// import { uploadDocument } from "../../lib/redux/slices/documentSlice";
// import {
//   fetchEmployeeIdByUserId,
//   fetchEmployeeById,
// } from "../../lib/redux/slices/employeeSlice";
// import Link from "next/link";
// import { Status, DocumentType } from "@prisma/client";

// const VisaManagementPage = () => {
//   const dispatch = useAppDispatch();
//   const user = useSelector((state: RootState) => state.user.user);
//   const { documents, loading: documentLoading, error: documentError } = useSelector((state: RootState) => state.document);
//   const { employeeId, status: employeeStatus, error: employeeError } = useSelector((state: RootState) => state.employee);

//   // Fetch employeeId when user is available and employeeId is not yet loaded
//   useEffect(() => {
//     if (user && user.id && !employeeId) {
//       dispatch(fetchEmployeeIdByUserId(user.id));
//     }
//   }, [dispatch, user, employeeId]);

//   // Fetch employee details if employeeId is available
//   useEffect(() => {
//     if (employeeId) {
//       dispatch(fetchEmployeeById(employeeId));
//     }
//   }, [dispatch, employeeId]);

//   const getDocumentStatusMessage = (docType: string) => {
//     const document = documents.find((doc) => doc.documentType === docType);
//     if (!document) return "";

//     switch (document.status) {
//       case "PENDING":
//         return `Waiting for HR to approve your ${getDisplayName(docType)}`;
//       case "APPROVED":
//         if (docType === "OPT_RECEIPT") return "Please upload a copy of your OPT EAD.";
//         if (docType === "OPT_EAD") return "Please download and fill out the I-983 form.";
//         if (docType === "I_983") return "Please send the I-983 along all necessary documents to your school and upload the new I-20.";
//         if (docType === "I_20") return "All documents have been approved.";
//         break;
//       case "REJECTED":
//         return `HR feedback: ${document.feedback}`;
//     }
//     return "";
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
//     if (event.target.files && event.target.files[0] && employeeId) {
//       const file = event.target.files[0];
//       const fileName = file.name;
//       const fileUrl = URL.createObjectURL(file);

//       dispatch(uploadDocument({ employeeId, fileName, fileUrl, documentType: docType }));
//     }
//   };

//   const canUploadDocument = (docType: string) => {
//     const previousDocs = ["OPT_RECEIPT", "OPT_EAD", "I_983"];
//     const index = previousDocs.indexOf(docType);
//     if (index === 0) return true; // OPT Receipt can always be uploaded first

//     const previousDocument = documents.find((doc) => doc.documentType === previousDocs[index - 1]);
//     return previousDocument && previousDocument.status === "APPROVED";
//   };

//   const getDisplayName = (docType: string) => {
//     switch (docType) {
//       case "OPT_RECEIPT":
//         return "OPT Receipt";
//       case "OPT_EAD":
//         return "OPT EAD";
//       case "I_983":
//         return "I-983";
//       case "I_20":
//         return "I-20";
//       default:
//         return docType;
//     }
//   };

//   if (employeeStatus === "loading") return <p>Loading employee information...</p>;
//   if (employeeError) return <p>Error: {employeeError}</p>;

//   return (
//     <section className="main-container">
//       <h1 className="header-text text-3xl font-bold mt-4">
//         Manage Your OPT Documents
//       </h1>
//       {["OPT_RECEIPT", "OPT_EAD", "I_983", "I_20"].map((docType) => (
//         <div key={docType} className="document-section mt-4">
//           <h2 className="text-xl font-semibold">{getDisplayName(docType)}</h2>
//           <p className="mt-2 text-lg">{getDocumentStatusMessage(docType)}</p>
//           {canUploadDocument(docType) && (
//             <div className="upload-file-container mt-2">
//               <input
//                 type="file"
//                 onChange={(e) => handleFileUpload(e, docType)}
//                 disabled={documentLoading}
//               />
//             </div>
//           )}
//         </div>
//       ))}
//       {documentError && <p className="text-red-500 mt-4">{documentError}</p>}
//     </section>
//   );
// };

// export default VisaManagementPage;

"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../lib/redux/store";
import { uploadDocument } from "../../lib/redux/slices/documentSlice";
import {
  fetchEmployeeIdByUserId,
  fetchEmployeeById,
} from "../../lib/redux/slices/employeeSlice";
import { DocumentType } from "@prisma/client";

const VisaManagementPage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const { documents, loading: documentLoading, error: documentError } = useSelector(
    (state: RootState) => state.document
  );
  const { employeeId, status: employeeStatus, error: employeeError } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    if (user && user.id && !employeeId) {
      dispatch(fetchEmployeeIdByUserId(user.id));
    }
  }, [dispatch, user, employeeId]);

  // Fetch employee details if employeeId is available
  useEffect(() => {
    if (employeeId) {
      dispatch(fetchEmployeeById(employeeId));
    }
  }, [dispatch, employeeId]);


  // Helper function to get the latest document of a type
  const getLatestDocument = (docType: DocumentType) => {
    return documents
      .filter((doc) => doc.documentType === docType)
      .sort((a, b) => new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ? 1 : -1)[0];
  };


  const getDocumentStatusMessage = (docType: DocumentType) => {
    const document = documents.find((doc) => doc.documentType === docType);
    if (!document) return "";

    switch (document.status) {
      case "PENDING":
        return `Waiting for HR to approve your ${getDisplayName(docType)}`;
      case "APPROVED":
        if (docType === "OPT_RECEIPT") return `Approved. Please upload a copy of your OPT EAD.`;
        if (docType === "OPT_EAD") return `Approved. Please upload your I-983 form.`;
        if (docType === "I_983") return `Approved. Please upload your I-20.`;
        if (docType === "I_20") return `All documents have been approved, thank you.`;
        break;
      case "REJECTED":

        return `Rejected: ${document.feedback}`;

    }
    return "";
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docType: DocumentType) => {
    if (event.target.files && event.target.files[0] && employeeId) {
      const file = event.target.files[0];
      const fileName = file.name;
      const fileUrl = URL.createObjectURL(file);

      dispatch(uploadDocument({ employeeId, fileName, fileUrl, documentType: docType }));
    }
  };

  const canUploadDocument = (docType: DocumentType) => {
    const previousDocs: DocumentType[] = ["OPT_RECEIPT", "OPT_EAD", "I_983"];
    const index = previousDocs.indexOf(docType);
    if (index === 0) return true;

    const previousDocument = getLatestDocument(previousDocs[index - 1]);
    return previousDocument && previousDocument.status === "APPROVED";
  };

  const getDisplayName = (docType: DocumentType) => {
    switch (docType) {
      case "OPT_RECEIPT":
        return "OPT Receipt";
      case "OPT_EAD":
        return "OPT EAD";
      case "I_983":
        return "I-983";
      case "I_20":
        return "I-20";
      default:
        return docType;
    }
  };

  if (employeeStatus === "loading") return <p>Loading employee information...</p>;
  if (employeeError) return <p>Error: {employeeError}</p>;

  return (
    <section className="main-container">
      <h1 className="header-text text-3xl font-bold mt-4">Manage Your OPT Documents</h1>
      {(Object.values(DocumentType) as DocumentType[]).map((docType) => (
        <div key={docType} className="document-section mt-4">
          <h2 className="text-xl font-semibold">{getDisplayName(docType)}</h2>
          <p className="mt-2 text-lg">{getDocumentStatusMessage(docType)}</p>
          {/* Display the file name in green based on status */}
          {getLatestDocument(docType)?.status && (
            <p className={`mt-2 text-sm font-bold ${
              getLatestDocument(docType)?.status === "APPROVED"
                ? "text-green-500"
                : getLatestDocument(docType)?.status === "REJECTED"
                ? "text-red-500"
                : "text-yellow-500"
            }`}>
              {getLatestDocument(docType)?.status === "APPROVED" && `Approved File: ${getLatestDocument(docType)?.fileName}`}
              {getLatestDocument(docType)?.status === "REJECTED" && `Rejected File: ${getLatestDocument(docType)?.fileName}`}
              {getLatestDocument(docType)?.status === "PENDING" && `Pending File: ${getLatestDocument(docType)?.fileName}`}
            </p>
          )}
          {/* Preview and download links if a file URL is available */}
          {getLatestDocument(docType)?.fileUrl && (
            <div className="mt-2">
              <a
                href={getLatestDocument(docType)?.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mr-4"
              >
                Preview
              </a>
              <a
                href={getLatestDocument(docType)?.fileUrl}
                download={getLatestDocument(docType)?.fileName}
                className="text-blue-500 underline"
              >
                Download
              </a>
            </div>
          )}
          {/* Show the upload input only if the document is not approved */}
          {canUploadDocument(docType) && !isUploadDisabled(docType) ? (
            <div className="upload-file-container mt-2">
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, docType)}
                disabled={isUploadDisabled(docType)}
                className={isUploadDisabled(docType) ? "bg-gray-300 cursor-not-allowed" : ""}
              />
            </div>
          ) : (
            <div className="upload-file-container mt-2">
              <button disabled className="bg-gray-300 cursor-not-allowed px-4 py-2">
                Choose File
              </button>
            </div>
          )}
        </div>
      ))}
      {documentError && <p className="text-red-500 mt-4">{documentError}</p>}
    </section>
  );
};

export default VisaManagementPage;