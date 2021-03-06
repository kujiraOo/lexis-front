// @flow

import YouTube from 'react-youtube'
import type { Activity } from 'core/types'
import * as React from 'react'
import Text from './Text'
import { List, ListItemText, ListItem, Divider } from 'material-ui'

type ActivityContentProps = {
  activity: Activity
}

const ActivityContent = ({ activity }: ActivityContentProps) => {
  if (activity === null) {
    return null
  }

  switch (activity.type) {
    case 'video':
      return activity.url ? (
        <div style={{ padding: '15px 6% 15px 6%' }}>
          <YouTube videoId={activity.url} />
        </div>
      ) : null

    case 'audio':
      return null

    case 'text':
      return (
        <Text>
          {activity.content.split('\n').map((p, i) => (
            <span key={i}>
              {p}
              <br />
            </span>
          ))}
        </Text>
      )

    case 'skype':
      return (
        <div>
          <img
            width='50%'
            src='https://secure.skypeassets.com/i/common/images/icons/skype-logo-open-graph.png'
          />
          <List style={{ display: 'inline', width: '50%', float: 'right' }}>
            <ListItem>
              <ListItemText
                primary='Session topic'
                secondary={activity.topic}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary='Duration'
                secondary={getReadableDuration(activity.duration)}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  activity.group
                    ? 'It is a group session'
                    : 'It is an individual session'
                }
              />
            </ListItem>
          </List>
        </div>
      )
    case 'header':
      return <Text fontSize={'1.5rem'}>{activity.text}</Text>
    default:
      return null
  }
}

function getReadableDuration (duration: number): string {
  switch (duration) {
    case 0:
      return 'No duration limit'

    case 30 * 60:
      return '30 minutes'

    case 45 * 60:
      return '45 minutes'

    case 1 * 60 * 60:
      return '1 hour'

    case 1.5 * 60 * 60:
      return '1.5 hour'

    case 2 * 60 * 60:
      return '2 hours'

    case 2.5 * 60 * 60:
      return '2.5 hours'

    case 3 * 60 * 60:
      return '3 hours'

    default:
      return 'No duration limit'
  }
}

export default ActivityContent
