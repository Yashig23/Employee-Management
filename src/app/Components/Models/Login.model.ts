
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
    departmentId?: number | null;
    managerId?: number | null;
  }
  
  // Define the LoginUserDto interface
  export interface LoginUserDto {
    employee: EmployeeDto;
    token?: string | null;
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
  