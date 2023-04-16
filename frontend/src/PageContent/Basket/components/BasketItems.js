import event from '../../../API/Event';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TicketCounter from './TicketCounter';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DeleteBasketButton from './DeleteBasketButton';

function BasketItems({ payCurrency }) {
  const { t } = useTranslation('basket');
  const { basketWithDetails } = useSelector((state) => state.basket);

  return (
    <div className="w-10/12 max-md:w-4/5 max-h-[450px]  overflow-y-auto  border-2 p-2 rounded-lg max-md:justify-center border-bc-yellow-theme ">
      {basketWithDetails.map((basket) => (
        <div key={basket.id}>
          <div className="flex flex-row max-md:flex-col items-center">
            <div className="flex justify-center items-center p-4">
              <LazyLoadImage
                alt="Esemeny kep"
                src={`${event.eventPicture}${basket.eventId}`}
                effect="blur"
                width={'300'}
                className="rounded-xl"
              />
            </div>
            <div className="w-full flex justify-evenly max-md:flex-col max-md:justify-center  items-center max-md:text-center">
              <div className="w-4/5 max-md:w-4/5">
                <Typography color="text.primary">{`${basket.title}`}</Typography>
                <Typography color="text.primary">{`${t('EVENT_START_DATE')}: ${
                  basket.startDate
                }`}</Typography>
                <div className="w-4/5 max-md:w-full flex flex-row justify-between  max-md:flex-col ">
                  <Typography color="text.primary">{`${basket.ticketType}`}</Typography>
                  <Typography variant="h6" color="text.primary">{`${
                    basket.currencies === 'HUF'
                      ? Math.round(basket.price, 0)
                      : parseFloat(basket.price).toFixed(2)
                  } ${basket.currencies}`}</Typography>
                </div>
              </div>
              <div className="flex max-md:w-4/5 w-1/5 max-md:justify-evenly">
                <TicketCounter basket={basket} payCurrency={payCurrency} />
                <DeleteBasketButton basket={basket} />
              </div>
            </div>
          </div>
          <div className="w-full border border-black my-4" />
        </div>
      ))}
    </div>
  );
}

export default BasketItems;
