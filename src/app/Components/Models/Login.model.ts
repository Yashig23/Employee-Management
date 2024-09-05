
export enum Role {
    Employee = 1,
    Admin = 2,
    SuperAdmin = 3
  }
  
  // Define the EmployeeDto interface
  export interface EmployeeDto {
    createdBy?: number | null;
    updatedBy?: number | null;
    createdOn?: string | null;
    updatedOn?: string | null;
    id?: number | null;
    name?: string | null;
    departmentName?: string | null;
    managerName?: string | null;
    role?: Role[];
    salary?: number;
    departmentID?: number | null;
    managerID?: number | null;
  }
  
  // Define the LoginUserDto interface
  export interface LoginUserDto {
    employee: EmployeeDto1;
    token?: string | null;
  }

  export interface EmployeeDto1{
    id: number;
    name: string;
    role: Role;
    isManager: boolean;
  }
  
  // Define the ApiResponse interface for login response
  export interface ApiResponse {
    success: boolean;
    status: number; // integer($int32)
    message?: string | null; // Nullable string
    data?: LoginUserDto | null; // Nullable LoginUserDto
  }  
  
  export interface LoginRequest {
    username: string;
    password: string;
  }
  