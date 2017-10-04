// @flow

import type { Course } from 'core/types'

export type CourseListItem = {
  name: string,
  description: string,
  id: string,
  imageUrl: ?string
}

export type CourseListState = {
  selectedCourse: ?string
}

export type CourseContentsState = {
  selectedChapterIdx: ?number,
  selectedLessonIdx: ?number,
  course: ?Course
}

export type CourseConsumerState = {
  courseContents: CourseContentsState,
  courseList: CourseListState
}
