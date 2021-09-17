import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles } from '../util/util';

const router: Router = Router();

router.get("", async (req: Request, res: Response) => {


    let { image_url } = req.query;

    console.log("URL of the provided image: " + image_url);

    if (!image_url) {
        return res.status(400).send({ message: "image_url is required" });
    }
    let filtered_img: string = "";

    try {
        filtered_img = await filterImageFromURL(image_url.toString());

        //console.log("URL of the provided image: " + filtered_img);

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

