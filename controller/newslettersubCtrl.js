// const Newslettersub = require("../models/newslettterModel");
// const asyncHandler = require("express-async-handler");

// //-------------Createing New subcriber -----------//
// const createnewsub = asyncHandler(async (req, res) => {
//     try {
//         const NewSub = await Newslettersub.create(req.body);
//         res.status(201).json({
//             message: 'Thank you for subscribing to our newsletter!'
//         });
//     } catch (error) {
//         res.status(500).json({ error: `An error occurred: ${error.message}` });
//     }
// });

// //---------Updateing A E-mail of newslettersub-----//

// const Updatenewslettersub = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     try {
//         const updatednewsletterSub = await Newslettersub.findByIdAndUpdate(id, req.body, { new: true });
//         res.status(201).json(updatednewsletterSub);
//     } catch (error) {
//         res.status(500).json({ error: `An error occurred: ${error.message}` });
//     }
// });

// //-------Deleteing a E-mail of newslettersub-------//
// const Deletenewslettersub = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletenewsletterSub = await Newslettersub.findByIdAndDelete(id, req.body, { new: true });
//         res.status(201).json(deletenewsletterSub)
//     } catch (error) {
//         res.status(500).json({ error: `An error occurred: ${error.message}` });
//     }
// });

// //----------Getall E-mail of Newslettersub--------//
// const getallsub = asyncHandler(async (req, res) => {
//     try {
//         const GetallSub = await Newslettersub.find()
//         res.status(201).json(GetallSub);
//     } catch (error) {
//         res.status(500).json({ error: `An error occurred: ${error.message}` });
//     }
// });

// module.exports = { createnewsub, Updatenewslettersub, Deletenewslettersub, getallsub }

const Newslettersub = require("../models/newsletterModel");
const asyncHandler = require("express-async-handler");

const createnewsub = asyncHandler(async (req, res) => {
    try {
        const NewSub = await Newslettersub.create(req.body);
        res.status(201).json({
            message: 'Thank you for subscribing to our newsletter!'
        });
    } catch (error) {
        // Check for duplicate key error and handle it explicitly
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email address is already subscribed.' });
        } else {
            res.status(500).json({ error: `An error occurred: ${error.message}` });
        }
    }
});

const Updatenewslettersub = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatednewsletterSub = await Newslettersub.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatednewsletterSub);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

const Deletenewslettersub = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletenewsletterSub = await Newslettersub.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

const getallsub = asyncHandler(async (req, res) => {
    try {
        const GetallSub = await Newslettersub.find();
        res.status(200).json(GetallSub);
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});

module.exports = { createnewsub, Updatenewslettersub, Deletenewslettersub, getallsub };
