const asyncHandler = require("express-async-handler")
const { Newsletter } = require("../models/Newsletter");
const { validateNewSubscriber } = require("../validation/newsletterValidation");
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

/**
 *  @desc    subscribe user to newsletter
 *  @route   /api/newsletter/subscribe
 *  @method  POST
 *  @access  public
 */
module.exports.subscribe = asyncHandler(async (req, res) => {

    const { error } = validateNewSubscriber(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    const { email } = req.body;

    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
        return res.status(400).json({ error: 'This email is already subscribed' });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(200).json({ message: 'Successfully subscribed to the newsletter!' });

})

/**
 *  @desc    get all subscriber
 *  @route   /api/newsletter/subscribers
 *  @method  GET
 *  @access  private (only admin)
 */
module.exports.getAllSubscribers = asyncHandler(async (req, res) => {
    const subscribers = await Newsletter.find({});

    res.status(200).json({
        success: true,
        data: subscribers
    });
})

/**
 *  @desc    export subscriber details into excel file
 *  @route   /api/newsletter/export-as-excel
 *  @method  GET
 *  @access  private (only admin)
 */
module.exports.exportAllSubscribersAsExcles = asyncHandler(async (req, res) => {

    const subscribers = await Newsletter.find().select('_id email subscribedAt');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Subscribers');

    worksheet.columns = [
        { header: 'ID', key: 'id', width: 50 },
        { header: 'Email', key: 'email', width: 50 },
        { header: 'Subscribed At', key: 'subscribedAt', width: 50 }
    ];

    subscribers.forEach(subscriber => {
        worksheet.addRow({
            id: subscriber._id.toString(),
            email: subscriber.email,
            subscribedAt: subscriber.subscribedAt.toISOString() 
        });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.xlsx');

    await workbook.xlsx.write(res);

    res.end();
})

/**
 *  @desc    export subscriber details into pdf file
 *  @route   /api/newsletter/export-as-pdf
 *  @method  GET
 *  @access  private (only admin)
 */
module.exports.exportAllSubscribersAsPdf = asyncHandler(async (req, res) => {
    const subscribers = await Newsletter.find().select('_id email subscribedAt');

    const doc = new PDFDocument({ margin: 30 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.pdf');

    doc.pipe(res);

    doc.fontSize(18).text('Newsletter Subscribers', { align: 'center' });

    const tableTop = 100;
    const col1X = 50;
    const col2X = 200;
    const col3X = 400;

    doc.fontSize(12)
        .text('ID', col1X, tableTop)
        .text('Email', col2X, tableTop)
        .text('Subscribed At', col3X, tableTop);

    doc.moveTo(50, tableTop + 20)
        .lineTo(550, tableTop + 20)
        .stroke();

    let rowTop = tableTop + 30;

    subscribers.forEach((subscriber, index) => {

        if (rowTop > 750) {
            doc.addPage();
            rowTop = 50;

            doc.fontSize(12)
                .text('ID', col1X, rowTop)
                .text('Email', col2X, rowTop)
                .text('Subscribed At', col3X, rowTop);

            doc.moveTo(50, rowTop + 20)
                .lineTo(550, rowTop + 20)
                .stroke();

            rowTop += 30;
        }

        drawRow(doc, rowTop, subscriber, col1X, col2X, col3X);

        rowTop += 30;
    });

    doc.end();
})

const drawRow = (doc, y, subscriber, col1X, col2X, col3X) => {
    doc.fontSize(10)
        .text(subscriber._id.toString(), col1X, y)
        .text(subscriber.email, col2X, y)
        .text(new Date(subscriber.subscribedAt).toLocaleDateString(), col3X, y);


    doc.moveTo(col1X, y + 15)
        .lineTo(550, y + 15)
        .stroke();
};

