export interface LookupItem {
  id: string;
  name: string;
  email: string;
  isExistingStaff: boolean;
  type: 'MENTOR';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ClassRecord {
  id: string;
  section: string;
  roomNo: string;
  coordinator: string;
  mentorOne: LookupItem | null;
  mentorTwo: LookupItem | null;
  mentorThree: LookupItem | null;
  classStartedAt: Date | string;
  classEndsAt: Date | string;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  registerNo: string;
  department: string;
  classId: string;
}

export interface AttendanceRecord {
  id: string;
  classId: string;
  date: Date | string;
  time: Date | string;
  records: {
    studentId: string;
    status: 'Present' | 'Absent' | 'Leave';
  }[];
}
