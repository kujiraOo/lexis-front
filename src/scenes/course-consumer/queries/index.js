// @flow

import { gql } from 'react-apollo'

const courseListQuery = gql`
  query courseConsumerCourseList {
    coursesByStudentEmail(email: "test@test.test") {
      name
      description
      id
      imageUrl
    }
  }
`

const courseContentsQuery = gql`
  query CourseConsumerCourseContents($id: String!) {
    course(id: $id) {
      id
      creatorEmail
      name
      levels {
        name
        description
        lessons
      }
      description
      difficulty
      imageUrl
    }
  }
`

export { courseListQuery, courseContentsQuery }
