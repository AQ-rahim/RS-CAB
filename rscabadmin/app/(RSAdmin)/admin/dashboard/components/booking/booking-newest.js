import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fDateTime } from '@/app/(RSAdmin)/admin/utils/format-time';
// components
import Label from '@/app/(RSAdmin)/admin/common/label';
import Image from '@/app/(RSAdmin)/admin/common/image';
import Iconify from '@/app/(RSAdmin)/admin/common/iconify';
import Carousel, { CarouselArrows, useCarousel } from '@/app/(RSAdmin)/admin/common/carousel';

// ----------------------------------------------------------------------

export default function BookingNewest({
  title,
  subheader,
  list,
  sx,
  ...other
}) {
  const theme = useTheme();

  const carousel = useCarousel({
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  return (
    <Box sx={{ py: 2, ...sx }} {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CarouselArrows onNext={carousel.onNext} onPrev={carousel.onPrev} />
        }
        sx={{
          p: 0,
          mb: 3,
        }}
      />

      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {list.map((item) => (
          <BookingItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Box>
  );
}

BookingNewest.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function BookingItem({ item }) {
  const {
    avatarUrl,
    name,
    duration,
    bookedAt,
    guests,
    coverUrl,
    price,
    isHot,
  } = item;

  return (
    <Paper
      sx={{
        mr: 3,
        borderRadius: 2,
        position: 'relative',
        bgcolor: 'background.neutral',
      }}
    >
      <Stack
        spacing={2}
        sx={{
          px: 2,
          pb: 1,
          pt: 2.5,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <ListItemText
            primary={name}
            secondary={fDateTime(bookedAt)}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Stack>

        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          sx={{ color: 'text.secondary', typography: 'caption' }}
        >
          <Stack direction="row" alignItems="center">
            <Iconify
              icon="solar:calendar-date-bold"
              width={16}
              sx={{ mr: 0.5 }}
            />
            {duration}
          </Stack>

          <Stack direction="row" alignItems="center">
            <Iconify
              icon="solar:users-group-rounded-bold"
              width={16}
              sx={{ mr: 0.5 }}
            />
            {guests} Guests
          </Stack>
        </Stack>
      </Stack>

      <Label
        variant="filled"
        sx={{
          right: 16,
          zIndex: 9,
          bottom: 16,
          position: 'absolute',
        }}
      >
        {isHot && '🔥'} ${price}
      </Label>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Image
          alt={coverUrl}
          src={coverUrl}
          ratio="1/1"
          sx={{ borderRadius: 1.5 }}
        />
      </Box>
    </Paper>
  );
}

BookingItem.propTypes = {
  item: PropTypes.object,
};
