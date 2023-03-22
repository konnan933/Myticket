import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
import event from 'API/Event';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import EventButton from './EventButton';

function SlideShow() {
  const { promotedEvents } = useSelector((state) => state.event);

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
        className="w-full h-420 text-center text-lg text-white">
        {promotedEvents.map((oneEvent) => {
          return (
            <SwiperSlide key={oneEvent.id}>
              <div
                style={{
                  backgroundImage: 'url(' + event.eventPicture + oneEvent.id + ')',
                  width: '100%',
                  height: '380px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}
                className="flex flex-col justify-between">
                <Typography variant="h3">{oneEvent.title}</Typography>
                <EventButton id={oneEvent.id} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default SlideShow;
