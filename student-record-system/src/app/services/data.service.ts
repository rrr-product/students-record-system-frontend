import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LookupItem, ClassRecord, StudentRecord, AttendanceRecord } from '../models/app.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api';

  private mentorsSubject = new BehaviorSubject<LookupItem[]>([]);
  private classesSubject = new BehaviorSubject<ClassRecord[]>([]);
  private studentsSubject = new BehaviorSubject<StudentRecord[]>([]);
  private attendanceSubject = new BehaviorSubject<AttendanceRecord[]>([]);

  mentors$ = this.mentorsSubject.asObservable();
  classes$ = this.classesSubject.asObservable();
  students$ = this.studentsSubject.asObservable();
  attendance$ = this.attendanceSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchMentors();
    this.fetchClasses();
    this.fetchStudents();
    this.fetchAttendance();
  }

  fetchMentors() {
    this.http.get<LookupItem[]>(`${this.apiUrl}/mentors`).subscribe(data => {
      this.mentorsSubject.next(data);
    });
  }

  fetchClasses() {
    this.http.get<ClassRecord[]>(`${this.apiUrl}/classes`).subscribe(data => {
      this.classesSubject.next(data);
    });
  }

  fetchStudents() {
    this.http.get<StudentRecord[]>(`${this.apiUrl}/students`).subscribe(data => {
      this.studentsSubject.next(data);
    });
  }

  fetchAttendance() {
    this.http.get<AttendanceRecord[]>(`${this.apiUrl}/attendance`).subscribe(data => {
      this.attendanceSubject.next(data);
    });
  }

  getMentors(): LookupItem[] {
    return this.mentorsSubject.value;
  }

  addMentor(mentor: Omit<LookupItem, 'id'>) {
    this.http.post<LookupItem>(`${this.apiUrl}/mentors`, mentor).subscribe(() => {
      this.fetchMentors();
    });
  }

  addBulkMentors(mentors: Omit<LookupItem, 'id'>[]) {
    this.http.post<LookupItem[]>(`${this.apiUrl}/mentors`, mentors).subscribe(() => {
      this.fetchMentors();
    });
  }

  deleteMentor(id: string) {
    this.http.delete(`${this.apiUrl}/mentors/${id}`).subscribe(() => {
      this.fetchMentors();
    });
  }

  getMentorById(id: string): LookupItem | undefined {
    return this.getMentors().find(m => m.id === id);
  }

  updateMentor(id: string, mentor: Partial<LookupItem>) {
    this.http.put<LookupItem>(`${this.apiUrl}/mentors/${id}`, mentor).subscribe(() => {
      this.fetchMentors();
    });
  }

  getClasses(): ClassRecord[] {
    return this.classesSubject.value;
  }

  addClass(cls: Omit<ClassRecord, 'id'>) {
    this.http.post<ClassRecord>(`${this.apiUrl}/classes`, cls).subscribe(() => {
      this.fetchClasses();
    });
  }

  updateClass(id: string, cls: Partial<ClassRecord>) {
    this.http.put<ClassRecord>(`${this.apiUrl}/classes/${id}`, cls).subscribe(() => {
      this.fetchClasses();
    });
  }

  deleteClass(id: string) {
    this.http.delete(`${this.apiUrl}/classes/${id}`).subscribe(() => {
      this.fetchClasses();
    });
  }

  getClassById(id: string): ClassRecord | undefined {
    return this.getClasses().find(c => c.id === id);
  }

  getStudents(): StudentRecord[] {
    return this.studentsSubject.value;
  }

  addStudent(student: Omit<StudentRecord, 'id'>) {
    this.http.post<StudentRecord>(`${this.apiUrl}/students`, student).subscribe(() => {
      this.fetchStudents();
    });
  }

  updateStudent(id: string, student: Partial<StudentRecord>) {
    this.http.put<StudentRecord>(`${this.apiUrl}/students/${id}`, student).subscribe(() => {
      this.fetchStudents();
    });
  }

  deleteStudent(id: string) {
    this.http.delete(`${this.apiUrl}/students/${id}`).subscribe(() => {
      this.fetchStudents();
    });
  }

  getStudentById(id: string): StudentRecord | undefined {
    return this.getStudents().find(s => s.id === id);
  }

  getAttendance(): AttendanceRecord[] {
    return this.attendanceSubject.value;
  }

  addAttendance(record: Omit<AttendanceRecord, 'id'>) {
    this.http.post<AttendanceRecord>(`${this.apiUrl}/attendance`, record).subscribe(() => {
      this.fetchAttendance();
    });
  }

  getAttendanceByClassId(classId: string): AttendanceRecord[] {
    return this.getAttendance().filter(a => a.classId === classId);
  }
}