import { NextResponse } from 'next/server';
 import Car from '../../db/adminUpload';   
 import sequelize from '../../db/db'; 

export async function POST(req) {
  try {
     const formData = await req.json();

    const {
      carName,
      yearOfManufacture,
      mileage,
      fuelType,
      carCategory,
      emissionStandard,
      transmissionType,
      seatCapacity,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
     } = formData;

       if (
      !carName || !yearOfManufacture || !mileage || !fuelType || !carCategory ||
      !emissionStandard || !transmissionType || !seatCapacity || !pricePerDay ||
      !pricePerWeek || !pricePerMonth
    ) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
    }

     const newCar = await Car.create({
      carName,
      yearOfManufacture,
      mileage,
      fuelType,
      carCategory,
      emissionStandard,
      transmissionType,
      seatCapacity,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
    });

     return NextResponse.json({ success: true, car: newCar }, { status: 200 });

  } catch (error) {
    console.error('Error inserting car data:', error);
    return NextResponse.json({ success: false, message: 'Error uploading car data.' }, { status: 500 });
  }
}


export async function GET() {
   const query = `
    SELECT 
      a.id, a.carName, i.path, a.yearOfManufacture, a.mileage, a.fuelType, a.carCategory,
      a.emissionStandard, a.transmissionType, a.seatCapacity, a.pricePerDay, a.pricePerWeek, a.pricePerMonth
    FROM images i
    JOIN adminuploads a ON i.carName = a.carName;
  `;
   try {
     const cars = await sequelize.query(query); 
    console.log(cars,"in backend")
     return NextResponse.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json({ error: 'Error fetching cars' }, { status: 500 });
  }
}