export interface LookupItem {
  id: string;
  name: string;
  type: 'MENTOR';
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
