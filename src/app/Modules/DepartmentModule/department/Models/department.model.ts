import { FormArray } from "@angular/forms"

// export interface Department{
//     id: number,
//     name: string
// }

// export interface DepartmentResponse{
//     success: boolean,
//     status: number,
//     message: string,
//     data: Department[]
// }

// export interface DepartmentRequest {
//     name: string;
//   }

//   export interface DepartmentForm {
//     name: string;
//   }

//   export interface AddDepartmentResponse{
//     success: boolean,
//     message: string,
//     data: number;
//   }

//   export interface postDepartmentrequest{
//     name: string;
//   }

  //////Interface for Prince

  // Interface for individual department details
export interface Department {
  createdBy: number; // Nullable integer
  updatedBy: number | null; // Nullable integer
  createdOn: string; // Nullable date-time string
  updatedOn: string | null; // Nullable date-time string
  id: number | null; // Nullable integer
  name: string | null; // Nullable string
}

// Interface for the API response containing a list of departments
export interface DepartmentResponse {
  success: boolean; // Indicates if the request was successful
  status: number; // HTTP status code or custom status code
  message: string | null; // Optional message
  data: Department[] | null; // List of department details, nullable
}

// Interface for the API response containing a single department
export interface DepartmentApiResponseById {
  success: boolean; // Indicates if the request was successful
  status: number; // HTTP status code or custom status code
  message: string | null; // Optional message
  data: Department; // Single department detail, nullable
}

export interface AddDepartmentResponse{
      success: boolean,
      status: number,
      message: string | null,
      data: number;
 }

 export interface DepartmentRequest {
    name: string;
  }

  export interface DepartmentDeleteResponse{
    success: boolean,
    status: number,
    message: string |null,
    data: boolean
  }
