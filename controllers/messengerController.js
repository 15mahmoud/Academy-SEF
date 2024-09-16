const asyncHandler = require("express-async-handler");
const { Messenger } = require("../models/Messenger");
const { validateNewMessenger } = require("../validation/messengerValidation");

/**
 *  @desc    add new messenger
 *  @route   /api/messengers
 *  @method  POST
 *  @access  public
 */
module.exports.addNewMessenger = asyncHandler(async (req, res) => {

    const { error } = validateNewMessenger(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    const newMessenger = new Messenger(req.body);
    await newMessenger.save();
    res.status(200).json({
        success: true,
        message: 'Thank you for getting in touch!'
    });
})
/**
 *  @desc    get all messages
 *  @route   /api/messengers
 *  @method  GET
 *  @access  private (only admin)
 */

module.exports.getAllMessages = asyncHandler(async (req, res) => {
    const messages = await Messenger.find({ isArchived: false });
    res.status(200).json(messages);
})

/**
 *  @desc    get all messages
 *  @route   /api/messengers
 *  @method  GET
 *  @access  private (only admin)
 */
module.exports.getArchivedMessages = asyncHandler(async (req, res) => {
    const messages = await Messenger.find({ isArchived: true });
    res.status(200).json(messages);
})

/**
 *  @desc    add message to archive
 *  @route   /api/messengers/:id
 *  @method  PUT
 *  @access  private (only admin)
 */
module.exports.addToArchive = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const updatedMessage = await Messenger.findByIdAndUpdate(
        id,
        { isArchived: true },
        { new: true }
    );

    if (!updatedMessage) {
        return res.status(404).json({
            success: false,
            error: 'Message not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Message archived successfully'
    });

});
