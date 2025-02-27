'use client'
import Styles from '../../css/HomePage.module.css'
import NavBar from '../NavBar/page'
import Image from 'next/image'
import Marquee from "react-fast-marquee";    
import Link from 'next/link'
 


const page = () => {
   
  return (
    <>
     <div className={Styles.container}>
    <div className={Styles.main}>
        <NavBar />
        <div className={Styles.title}>
         Premium Car Rental
          <p>Home - Booking</p>
        </div>
        <div className={Styles.image}></div>
        <div className={Styles.marquee}>
        <Link  href='/components/Rent'>
          <div className={Styles.book}>
            Rent Now
          </div>
            </Link>  
        <Marquee autoFill pauseOnHover speed={25}>
          <Image src='/images/m4.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m1.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m2.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m3.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m5.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m7.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m8.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m6.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m10.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m11.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m9.jpg' alt='logo' height={80} width={100} />
          <Image src='/images/m12.jpg' alt='logo' height={80} width={100} />
          </Marquee>
           </div>
        
    </div>
</div>

    
    </>
  )
}

export default page