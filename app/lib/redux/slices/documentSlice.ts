import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import client from "../../apolloClient"; // Apollo Client for querying
import build from "next/dist/build";
import { DocumentType, Status } from "@prisma/client";


const UPLOAD_DOCUMENT = gql`
  mutation UploadDocument($employeeId: String, $fileName: String, $fileUrl: String, $documentType: DocumentType, $status: Status) {
    uploadDocument(employeeId: $employeeId, fileName: $fileName, fileUrl: $fileUrl, documentType: $documentType, status: $status) {
      id
      fileUrl
      fileName
      documentType
      status
      feedback
    }
  }
`;


export const uploadDocument = createAsyncThunk<
  Document,
  { employeeId: string; fileName: string; fileUrl: string; documentType: DocumentType }
>(
  "document/uploadDocument",
  async ({ employeeId, fileName, fileUrl, documentType }, thunkAPI) => {
    try {
      if (employeeId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(employeeId)) {
        throw new Error("Invalid employee ID format. Must be a 24-character hex string.");
      }

      const { data } = await client.mutate({
        mutation: UPLOAD_DOCUMENT,
        variables: {
          employeeId,
          fileName,
          fileUrl,
          documentType,
          status: "PENDING", // Set status to "PENDING"
        },
      });

      return data.uploadDocument;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
  documentType: DocumentType;
  status: Status;
  feedback?: string;
};

interface DocumentState {
  documents: Document[];
  loading: boolean;
  error: string | null;
};

const initialState: DocumentState = {
  documents: [],
  loading: false, 
  error: null
};

// const documentSlice = createSlice({
//   name: "document",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadDocument.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(uploadDocument.fulfilled, (state, action: PayloadAction<Document>) => {
//         state.loading = false;
//         // Replace existing document of the same type or add a new one
//         const index = state.documents.findIndex(doc => doc.documentType === action.payload.documentType);
//         if (index !== -1) {
//           state.documents[index] = action.payload;
//         } else {
//           state.documents.push(action.payload);
//         }
//       })
//       .addCase(uploadDocument.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action: PayloadAction<Document>) => {
        state.loading = false;
        const index = state.documents.findIndex(
          (doc) => doc.documentType === action.payload.documentType
        );
        if (index !== -1) {
          // Update the existing document
          state.documents[index] = { ...action.payload }; 
        } else {
          // Add a new document
          state.documents.push({ ...action.payload }); 
        }
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});



export default documentSlice.reducer;