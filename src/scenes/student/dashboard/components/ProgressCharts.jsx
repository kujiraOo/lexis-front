// @flow

import React from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { Grid } from 'material-ui'
import { Text } from 'common-components'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  chartContainer: theme.mixins.gutters({
    textAlign: 'center'
  }),
  chart: theme.mixins.gutters({
    marginTop: theme.spacing.unit
  })
})

type Props = {
  classes: any
}

class ProgressCharts extends React.Component {
  props: Props

  renderLine () {
    return (
      <Line
        data={{
          labels: ['1 May', '1 May', '1 May', '1 May', '1 May'],
          datasets: [
            {
              data: [7, 5, 1, 0, 2],
              backgroundColor: [
                'rgba(88, 214, 141, 0)',
                'rgba(200, 200, 200, 0.2)'
              ],
              borderColor: [
                'rgba(88, 214, 141, 0.7)',
                'rgba(200, 200, 200, 0.2)'
              ]
            }
          ]
        }}
        options={{
          legend: {
            display: false
          }
        }}
      />
    )
  }

  renderDonut () {
    return (
      <Doughnut
        data={{
          labels: ['Complete courses', 'Incomplete courses'],
          datasets: [
            {
              data: [7, 5],
              backgroundColor: [
                'rgba(88, 214, 141, 0.7)',
                'rgba(200, 200, 200, 0.2)'
              ]
            }
          ]
        }}
        options={{
          legend: {
            display: false
          }
        }}
      />
    )
  }

  render () {
    const { classes } = this.props

    return (
      <Grid container>
        <Grid item sm={6} className={classes.chartContainer}>
          <Text>Overall progress</Text>
          <div className={classes.chart}>{this.renderDonut()}</div>
        </Grid>
        <Grid item sm={6} className={classes.chartContainer}>
          <Text>Lessons complete</Text>
          <div className={classes.chart}>{this.renderLine()}</div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ProgressCharts)
