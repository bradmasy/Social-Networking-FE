import React, { useEffect, useState } from 'react';

//   const [bookingData, setBookingData] = useState(null);
//   const [bookingDataLoaded, setBookingDataLoaded] = useState(false);
//   const [message, setMessage] = useState('');
//   const [notification, setNotification] = useState(false);
//   const [success, setSuccess] = useState(true);



 export const BookingConfirmation: React.FC = () => {
    
    return(
        <>
        </>
    )
//     console.log(bookingData);
//     // const locationName = bookingData.location;
//     axios.post('/api/bookings', bookingData) // Adjust the API endpoint as needed
//       .then(response => {
//         setNotification(true);
//         setMessage('BOOKING SUCCESSFUL');
//         setSuccess(true);

//         setTimeout(() => {
//           setNotification(false);
//           setTimeout(() => {
//             history.push('/my-bookings');
//           }, 1000);
//         }, 3000);
//       })
//       .catch(error => {
//         console.error(error);
//         // Handle the error
//       });
//   };

//   if (!bookingDataLoaded) {
//     return null;
//   }

//   return (
//     <main className="ss-booking-confirmation__container">
//       <LogoScript />
//       <Notification
//         message={message}
//         notification={notification}
//         success={success}
//       />
//       <div className="ss-booking-confirmation__container__title">
//         BOOKING CONFIRMATION
//       </div>
//       {/* <div className="ss-booking-confirmation__container__confirmation-form-container">
//         <div className="ss-booking-confirmation__container__confirmation-form-container__start-time">
//           <div>LOCATION</div>
//           <div>{bookingData.location}</div>
//         </div>
//         <div className="ss-booking-confirmation__container__confirmation-form-container__start-time">
//           <div>DATE</div>
//           <div>{bookingData.date}</div>
//         </div>
//         <div className="ss-booking-confirmation__container__confirmation-form-container__start-time">
//           <div>SPACE</div>
//           <div>{bookingData.space}</div>
//         </div>
//         <div className="ss-booking-confirmation__container__confirmation-form-container__start-time">
//           <div>START TIME</div>
//           <div>
//             {bookingData['start-time-hour'] <= 12
//               ? bookingData['start-time-hour']
//               : bookingData['start-time-hour'] - 12
//             }:{bookingData['start-time-minutes'] === '0'
//               ? '00'
//               : bookingData['start-time-minutes']
//             }{bookingData['start-time-hour'] < 12 ? 'AM' : 'PM'}
//           </div>
//         </div>
//         <div className="ss-booking-confirmation__container__confirmation-form-container__start-time">
//           <div>END TIME</div>
//           <div>
//             {bookingData['end-time-hour'] <= 12
//               ? bookingData['end-time-hour']
//               : bookingData['end-time-hour'] - 12
//             }:{bookingData['end-time-minutes'] === '0'
//               ? '00'
//               : bookingData['end-time-minutes']
//             }{bookingData['end-time-hour'] < 12 ? 'AM' : 'PM'}
//           </div>
//         </div>
//         <div className="ss-booking-confirmation__container__confirmation-form-container__button">
//           <Button
//             text="CONFIRM BOOKING"
//             styles={{ width: '275px' }}
//             onClick={confirmBooking}
//           />
//         </div>
//       </div> */}
//     </main>
//   );
};

