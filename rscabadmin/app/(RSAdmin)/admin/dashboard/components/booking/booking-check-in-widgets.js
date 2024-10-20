import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// hooks
import { fNumber } from '@/app/(RSAdmin)/admin/utils/format-number';
import { useResponsive } from '@/app/(RSAdmin)/admin/hooks//use-responsive';
// components
import Chart, { useChart } from '@/app/(RSAdmin)/admin/common/chart';

// ----------------------------------------------------------------------

const CHART_SIZE = { width: 106, height: 106 };

export default function BookingCheckInWidgets({ chart, ...other }) {
  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');

  const {
    colors = [
      [theme.palette.primary.light, theme.palette.primary.main],
      [theme.palette.warning.light, theme.palette.warning.main],
    ],
    series,
    options,
  } = chart;

  const chartOptionsCheckIn = useChart({
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[0][0] },
          { offset: 100, color: colors[0][1] },
        ],
      },
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
    ...options,
  });

  const chartOptionsCheckout = {
    ...chartOptionsCheckIn,
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[1][0] },
          { offset: 100, color: colors[1][1] },
        ],
      },
    },
  };

  return (
    <Card {...other}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider
            orientation={smUp ? 'vertical' : 'horizontal'}
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />
        }
      >
        {series.map((item, index) => (
          <Stack
            key={item.label}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={3}
            sx={{ width: 1, py: 5 }}
          >
            <Chart
              type="radialBar"
              series={[item.percent]}
              options={index === 1 ? chartOptionsCheckout : chartOptionsCheckIn}
              {...CHART_SIZE}
            />

            <div>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                {fNumber(item.total)}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.72 }}>
                {item.label}
              </Typography>
            </div>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

BookingCheckInWidgets.propTypes = {
  chart: PropTypes.object,
};
