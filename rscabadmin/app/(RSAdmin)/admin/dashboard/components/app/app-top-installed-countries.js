import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// utils
import { fShortenNumber } from '@/app/(RSAdmin)/admin/utils/format-number';
// components
import Iconify from '@/app/(RSAdmin)/admin/common/iconify';
import Scrollbar from '@/app/(RSAdmin)/admin/common/scrollbar';

// ----------------------------------------------------------------------

export default function AppTopInstalledCountries({
  title,
  subheader,
  list,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {list.map((country) => (
            <CountryItem key={country.id} country={country} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

AppTopInstalledCountries.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function CountryItem({ country }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Stack
        direction="row"
        alignItems="center"
        flexGrow={1}
        sx={{ minWidth: 120 }}
      >
        <Iconify
          icon={country.flag}
          sx={{ borderRadius: 0.65, width: 28, mr: 1 }}
        />

        <Typography variant="subtitle2" noWrap>
          {country.name}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" sx={{ minWidth: 80 }}>
        <Iconify
          width={14}
          icon="ant-design:android-filled"
          sx={{ mr: 0.5, color: 'text.disabled' }}
        />
        <Typography variant="body2">
          {fShortenNumber(country.android)}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" sx={{ minWidth: 80 }}>
        <Iconify
          icon="mingcute:windows-fill"
          width={14}
          sx={{ mr: 0.5, color: 'text.disabled' }}
        />
        <Typography variant="body2">
          {fShortenNumber(country.windows)}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" sx={{ minWidth: 80 }}>
        <Iconify
          icon="mingcute:apple-fill"
          width={14}
          sx={{ mr: 0.5, color: 'text.disabled' }}
        />
        <Typography variant="body2">
          {fShortenNumber(country.windows)}
        </Typography>
      </Stack>
    </Stack>
  );
}

CountryItem.propTypes = {
  country: PropTypes.object,
};
