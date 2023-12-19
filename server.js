const { notFound, errorHandler, handleErrorCode1000 } = require("./middlewares/errorHandler");
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoute");
const projectRouter = require("./routes/projectRoute");
const blogRouter = require("./routes/blogRoute");
const teamRouter = require("./routes/teamRoute");
const Service = require("./routes/serviceRoute");
const PartnerRouter = require("./routes/partnerRoute");
const Hireing = require("./routes/hireingRoute");
const FaQ = require("./routes/faqRoute");
const Gallery = require("./routes/galleryRoute");
const Head_bodyscript = require("./routes/head_bodyRoute");
const Testimonial = require("./routes/testimonialRoute");
const Websitelogo = require("./routes/websitelogoRoute");
const Header = require("./routes/headerRoute");
const Newslettersub = require("./routes/newsletterRoute");
const ContactUs = require("./routes/contactRoute");
const Footerlist = require("./routes/footerRoute");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express();
dbConnect();


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.use("/header", Header);
app.use("/script", Head_bodyscript);
app.use("/weblogo", Websitelogo);
app.use("/user", authRouter);
app.use("/project", projectRouter);
app.use("/blog", blogRouter);
app.use("/team", teamRouter);
app.use("/partner", PartnerRouter);
app.use("/hiring", Hireing);
app.use("/service", Service);
app.use("/testimonial", Testimonial);
app.use("/gallery", Gallery);
app.use("/newsletters", Newslettersub);
app.use("/contactus", ContactUs);
app.use("/faq", FaQ);
app.use("/footerlist", Footerlist);

app.get("/", (req, res) => {
    res.send(`<h1>Hello,Wellcomeback Boss!</h1>`)
})
app.use(notFound);
app.use(errorHandler);
app.use(handleErrorCode1000);

app.listen(PORT, () => {
    console.log(`Your Server is running at PORT ${PORT}`);
});