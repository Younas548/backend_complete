import {v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs  from "fs"





    // Configuration
    cloudinary.config({ 
        cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
        api_key: 'process.env.CLOUDINARY_API_KEY', 
        api_secret: 'process.env.CLOUDINARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
    });


      const uploadCloudinary = async (localfilepath) => {
        try {
            if(!localfilepath)return null
            //upload the file on cloudinary 
            cloudinary.uploader.upload(localfilepath, {
                resource_type: "auto"
            })

            //file has been successfuly uploaded
            console.log("file has been successfuly uploaded", response.url);
            
        } catch (error) {
            fs.unlinkSync(localfilepath)// remove the locally save temporary file as the uploaded operation got failed
            return null;
        }
      }




    cloudinary.v2.uploader.upload("https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
        {
            public_id: "DOG_FLAG"
        },
        function(error,result){console.log(result);
        }
    );