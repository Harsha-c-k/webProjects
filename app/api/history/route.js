import { NextResponse } from 'next/server';
 import sequelize from '../../db/db'; 

export async function POST(req) {

    const data = await req.json();

    const {username,Email}=data;
      const query = `
    select * from bookings where (userName,email)=('${username}','${Email}') and delFlag=0;  
     `;
      try {
        const BookingHistory = await sequelize.query(query); 
         return NextResponse.json(BookingHistory);
     } catch (error) {
       console.error('Error fetching Booking History:', error);
       return NextResponse.json({ error: 'Error fetching Booking History' }, { status: 500 });
     }
   }




// import { NextResponse } from 'next/server';
// import sequelize from '../../db/db';

// export async function POST(req) {
//     const data = await req.json();
//     const { username, Email } = data;

//     const query = `
//         SELECT * FROM bookings
//         WHERE userName = ? AND email = ? AND delFlag = 0;
//     `;
    
//     try {
//         const [results] = await sequelize.query(query, {
//             replacements: [username, Email],
//             type: sequelize.QueryTypes.SELECT
//         });

//         // Send the results directly as a response
//         return NextResponse.json(results);  // Directly return the array of bookings
//     } catch (error) {
//         console.error('Error fetching Booking History:', error);
//         return NextResponse.json({ error: 'Error fetching Booking History' }, { status: 500 });
//     }
// }
