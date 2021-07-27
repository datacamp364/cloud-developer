import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles } from '../util/util';

const router: Router = Router();

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */

//! END @TODO1

router.get("", async (req: Request, res: Response) => {


    let { image_url } = req.query;

    console.log("URL:" + image_url);

    if (!image_url) {
        return res.status(400).send({ message: "image_url is required" });
    }
    var filtered_img = "";

    try {
        filtered_img = await filterImageFromURL(image_url.toString());

        console.log("URL:" + filtered_img);

        res.download(filtered_img, async err => {
            if (err) {
                res.status(204).end();
            }

            try {
                await deleteLocalFiles([filtered_img]);
            } catch (err) {
                console.error("error in deleteTempFiles = ", err);
            }
        });
    }
    catch (err) {
        // Oups -> write it down in the log file
        console.log(err);
        res.status(500).send({ message: "error occured when processing the image - the file may not exist in the given location" });
    }

    if (!filtered_img) {
        return res.status(500).send({ message: "something went wrong" });
    }


});


export const ImageRouter: Router = router;

