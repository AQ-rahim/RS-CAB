import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// components
import Image from '@/app/(RSAdmin)/admin/common/image';
import { MotionContainer, varFade } from '@/app/(RSAdmin)/admin/common/animate';
import Carousel, {
  CarouselDots,
  CarouselArrows,
  useCarousel,
} from '@/app/(RSAdmin)/admin/common/carousel';

// ----------------------------------------------------------------------

export default function AppFeatured({ list, ...other }) {
  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    ...CarouselDots({
      sx: {
        top: 16,
        left: 16,
        position: 'absolute',
        color: 'primary.light',
      },
    }),
  });

  return (
    <Card {...other}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem
            key={app.id}
            item={app}
            active={index === carousel.currentIndex}
          />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        sx={{ top: 8, right: 8, position: 'absolute', color: 'common.white' }}
      />
    </Card>
  );
}

AppFeatured.propTypes = {
  list: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item, active }) {
  const theme = useTheme();

  const { coverUrl, title, description } = item;

  const renderImg = (
    <Image
      alt={title}
      src={coverUrl}
      overlay={`linear-gradient(to bottom, ${alpha(
        theme.palette.grey[900],
        0
      )} 0%, ${theme.palette.grey[900]} 75%)`}
      sx={{
        width: 1,
        height: {
          xs: 280,
          xl: 320,
        },
      }}
    />
  );

  return (
    <MotionContainer action animate={active} sx={{ position: 'relative' }}>
      <Stack
        spacing={1}
        sx={{
          p: 3,
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" sx={{ color: 'primary.light' }}>
            Featured App
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Link color="inherit" underline="none">
            <Typography variant="h5" noWrap>
              {title}
            </Typography>
          </Link>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </m.div>
      </Stack>

      {renderImg}
    </MotionContainer>
  );
}

CarouselItem.propTypes = {
  active: PropTypes.bool,
  item: PropTypes.object,
};
