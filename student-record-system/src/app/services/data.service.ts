import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LookupItem, ClassRecord, StudentRecord } from '../models/app.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private mentorsKey = 'srs_mentors';
  private classesKey = 'srs_classes';
  private studentsKey = 'srs_students';

  private mentorsSubject = new BehaviorSubject<LookupItem[]>(this.loadData(this.mentorsKey));
  private classesSubject = new BehaviorSubject<ClassRecord[]>(this.loadData(this.classesKey));
  private studentsSubject = new BehaviorSubject<StudentRecord[]>(this.loadData(this.studentsKey));

  mentors$ = this.mentorsSubject.asObservable();
  classes$ = this.classesSubject.asObservable();
  students$ = this.studentsSubject.asObservable();

  constructor() {}

  private loadData(key: string): any[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private saveData(key: string, data: any[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- Mentors ---
  getMentors(): LookupItem[] {
    return this.mentorsSubject.value;
  }

  addMentor(mentor: Omit<LookupItem, 'id'>) {
    const newMentor = { ...mentor, id: crypto.randomUUID() } as LookupItem;
    const current = this.getMentors();
    const updated = [...current, newMentor];
    this.saveData(this.mentorsKey, updated);
    this.mentorsSubject.next(updated);
  }

  deleteMentor(id: string) {
    const updated = this.getMentors().filter(m => m.id !== id);
    this.saveData(this.mentorsKey, updated);
    this.mentorsSubject.next(updated);
  }

  // --- Classes ---
  getClasses(): ClassRecord[] {
    return this.classesSubject.value;
  }

  addClass(cls: Omit<ClassRecord, 'id'>) {
    const newClass = { ...cls, id: crypto.randomUUID() } as ClassRecord;
    const current = this.getClasses();
    const updated = [...current, newClass];
    this.saveData(this.classesKey, updated);
    this.classesSubject.next(updated);
  }

  updateClass(id: string, cls: Partial<ClassRecord>) {
    const current = this.getClasses();
    const updated = current.map(c => c.id === id ? { ...c, ...cls } : c);
    this.saveData(this.classesKey, updated);
    this.classesSubject.next(updated);
  }

  deleteClass(id: string) {
    const updated = this.getClasses().filter(c => c.id !== id);
    this.saveData(this.classesKey, updated);
    this.classesSubject.next(updated);
  }

  // --- Students ---
  getStudents(): StudentRecord[] {
    return this.studentsSubject.value;
  }

  addStudent(student: Omit<StudentRecord, 'id'>) {
    const newStudent = { ...student, id: crypto.randomUUID() } as StudentRecord;
    const current = this.getStudents();
    const updated = [...current, newStudent];
    this.saveData(this.studentsKey, updated);
    this.studentsSubject.next(updated);
  }

  updateStudent(id: string, student: Partial<StudentRecord>) {
    const current = this.getStudents();
    const updated = current.map(s => s.id === id ? { ...s, ...student } : s);
    this.saveData(this.studentsKey, updated);
    this.studentsSubject.next(updated);
  }

  deleteStudent(id: string) {
    const updated = this.getStudents().filter(s => s.id !== id);
    this.saveData(this.studentsKey, updated);
    this.studentsSubject.next(updated);
  }
}
