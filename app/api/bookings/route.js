import { NextResponse } from 'next/server';
import Bookings from '../../db/Bookings';  
 
export async function POST(req) {
  try {
     const formData = await req.json();

     const {
      carID,
      userName,
      email,
      CarName,
      path,
      pickupLocation,
      pickupArea,
      pincode,
      pickupDate,
      Rented_Days,
      Rented_Weeks,
      Rented_Months,
      TotalAmount,
    } = formData;

     if (!carID || !CarName || !pickupLocation || !pickupArea || !pincode || TotalAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "All fields are required, and TotalAmount should be greater than 0." },
        { status: 400 }
      );
    }

     const newBooking = await Bookings.create({
        CarName,
      userName,
      carID,
      email,
      path,
      pickupLocation,
      pickupArea,
      pincode,
      pickupDate,
      Rented_Days,
      Rented_Weeks,
      Rented_Months,
      TotalAmount,
      delFlag:0
    });

     return NextResponse.json(
      { success: true, booking: newBooking ,status:200},
    );
    
  } catch (error) {
    console.error("Error while creating booking:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}


 
export async function PATCH(req) {
  try {
     const { Booking_id } = await req.json();

    if (!Booking_id) {
      return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 });
    }

     const [updated] = await Bookings.update(
      { delFlag: 1 },  
      { where: { Booking_id:Booking_id} }  
    );

     if (updated === 0) {
      return NextResponse.json({ message: 'Booking not found or already canceled' }, { status: 404 });
    }

     return NextResponse.json({ message: 'Booking canceled successfully' }, { status: 200, });

  } catch (error) {
    console.error('Error canceling booking:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}



export async function GET() {
  try {
      const Logs = await Bookings.findAll();
      console.log(Logs)
 
     return NextResponse.json({ message: 'Retreived Logs',Logs:Logs }, { status: 200 });

  } catch (error) {
    console.error('Error fetching Logs:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

