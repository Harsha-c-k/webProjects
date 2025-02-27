'use client'
import Styles from '../../css/Rent.module.css'
import NavBar from '../NavBar/page'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
 
const page = () => {
  const [cars, setCars] = useState([]);

   const getCars = async () => {
    try {
      const response = await axios.get('/api/upload');  
       const allCars = [].concat(...response.data);  
        const uniqueCars = Array.from(
        new Map(allCars.map(car => [car.id, car])).values()
      );

      setCars(uniqueCars); 
      console.log(uniqueCars); 
    } catch (error) {
      console.log('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <>
     <div className={Styles.container}>
     <div className={Styles.main}>
    <NavBar />
    <div className={Styles.title}>
    Ride in Style
         </div>
    <div className={Styles.image}></div>
    <div className={Styles.status}>
      
      <div className={Styles.circle}>
        <div className={Styles.c}>1</div><p>Explore</p>
        </div>
      <div className={Styles.circle}>
        <div className={Styles.c}>2</div><p>Choose Vehicle</p>
        </div>
      <div className={Styles.circle}>
        <div className={Styles.c}>3</div><p>Enter Booking Details</p>
        </div>
      <div className={Styles.circle}>
        <div className={Styles.c}>4</div><p>Book Car</p>
        </div>
       
       
    </div>

    <div className={Styles.Booking}>
      <div className={Styles.TermsConditions}>
        <h3>Terms & Conditions</h3>
        <p>Welcome to our Car Rental System! By booking, you agree to the terms.</p>
 <p>Rentals are available to drivers 21+ with a valid license and ID.</p>
       <p>Return the car in the same condition; damages may incur extra charges.</p>
       <p>By renting, you consent to our data collection as per the Privacy Policy.</p>
       <p>No smoking or pets are allowed in our vehicles.</p>
      </div>

    <div className={Styles.carsDiv}>
   
         {cars.length > 0 && (
          cars.map((car) => (
            <div key={car.id} className={Styles.cars}>
              <div className={Styles.carImage}>
                <Image 
                  src={car.path || '/images/placeholder.jpg'}  
                  height={200}
                  width={200}
                  alt={car.carName}
                />
              </div>
              <div className={Styles.carDetails}>
                <div style={{ display: 'grid', gap: '7dvh' }}>
                  <div className={Styles.carTitle}>{car.carName}</div>
                  <div className={Styles.CarPrice}>${car.pricePerDay || 'N/A'}</div>
                </div>
                <div className={Styles.moreInfo}>
                   <Link href={{ pathname: `/components/Rent/${car.id}`, query: { car: JSON.stringify(car) } }}>
            <Image src='/svg/more.svg' width={17} height={17} alt='more' />
            &nbsp;<span>More Info</span>
          </Link>
                </div>
              </div>
              <div className={Styles.select}>
                <div className={Styles.button}>
                <Link href={{ pathname: `/components/Rent/${car.id}`, query: { car: JSON.stringify(car) } }} style={{textDecoration:"none",color:"black"}}>Select</Link></div>
                <div className={Styles.seater}>
                  {car.seatCapacity} &nbsp;
                  <Image src='/svg/person.svg' height={20} width={20} alt='person'/>
                </div>
              </div>
            </div>
          ))
        ) }
       
 
    </div>
     

    </div>
   


     </div>
     </div>
    
    </>
  )
}

export default page