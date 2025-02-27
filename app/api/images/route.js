// import { NextResponse } from 'next/server';
// import path from 'path';
// import fs from 'fs';
// import Image from '../../db/image';  

//  const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// export const POST = async (req) => {
//   const formData = await req.formData();
//   const body = Object.fromEntries(formData);
//   const file = body.file || null;

//   if (file) {
//      const filename = file.name;

//      const filePath = '/uploads/' + filename;   

//      const buffer = Buffer.from(await file.arrayBuffer());

//      if (!fs.existsSync(UPLOAD_DIR)) {
//       fs.mkdirSync(UPLOAD_DIR, { recursive: true });
//     }

//      fs.writeFileSync(path.resolve(UPLOAD_DIR, filename), buffer);

//      try {
//       await Image.create({
//         carName:carName,
//         filename: filename,
//         path: filePath,   
//       });

//        return NextResponse.json({
//         success: true,
//         name: filename,
//       });
//     } catch (error) {
//       console.error('Error inserting into the database:', error);
//       return NextResponse.json({
//         success: false,
//         message: 'Error saving file details to database.',
//       });
//     }
//   } else {
//      return NextResponse.json({
//       success: false,
//       message: 'No file uploaded.',
//     });
//   }
// };



import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import Image from '../../db/image';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export const POST = async (req) => {
  const formData = await req.formData();
  
  const file = formData.get('file');   
  const carName = formData.get('carName');   
  
  if (!file) {
    return NextResponse.json({
      success: false,
      message: 'No file uploaded.',
    });
  }

  const filename = file.name;
  const filePath = '/uploads/' + filename;

  const buffer = Buffer.from(await file.arrayBuffer());

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  fs.writeFileSync(path.resolve(UPLOAD_DIR, filename), buffer);

  try {
    await Image.create({
      carName: carName,   
      filename: filename,
      path: filePath,
    });

    return NextResponse.json({
      success: true,
      name: filename,
    });
  } catch (error) {
    console.error('Error inserting into the database:', error);
    return NextResponse.json({
      success: false,
      message: 'Error saving file details to database.',
    });
  }
};
