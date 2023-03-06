import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
import event from 'API/Event';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';

function SlideShow() {
  const { promotedEvents, promotedEventsLoading } = useSelector((state) => state.event);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full text-center text-lg text-white">
        {promotedEvents.map((oneEvent) => {
          return (
            <SwiperSlide key={oneEvent.id}>
              <div
                style={{
                  backgroundImage: 'url(' + event.eventPicture + oneEvent.id + ')',
                  width: '100%',
                  height: '400px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}>
                <Typography variant="h3">{oneEvent.title}</Typography>
                <Button>yes</Button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default SlideShow;
