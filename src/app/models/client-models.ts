export interface LectureType {
  id: string;
  value: string;
}


export interface CoursesFilter {
  orderBy: number;
  authorId: string;
  learningPathId: string;
  statusId: number;
  page: number;
  pageSize: number;
}

export interface LearnerCoursesFilter {
  orderBy: number;
  authorId: string;
  page: number;
  pageSize: number;
}
