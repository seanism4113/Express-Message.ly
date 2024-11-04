const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");
const Mesage = require("../models/message");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const Message = require("../models/message");

/** GET /:id - get detail of message.
 * => {message: {id, body, sent_at, read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 * Make sure that the currently-logged-in users is either the to or from user.
 **/

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
	try {
		const message = await Message.get(req.params.id);

		const isAuthorizedUser = req.user.username === message.from_user.username || req.user.username === message.to_user.username;

		if (isAuthorizedUse) {
			return res.json({ message });
		} else {
			throw new ExpressError("Access not allowed to this page", 404);
		}
	} catch (err) {
		return next(err);
	}
});

/** POST / - post message.
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 **/

router.post("/", ensureLoggedIn, async (req, res, next) => {
	try {
		const { to_username, body } = req.body;
		const from_username = req.user.username;
		const message = Message.create(from_username, to_username, body);
		return res.status(201).json({ message });
	} catch (err) {
		return next(err);
	}
});

/** POST/:id/read - mark message as read:
 *  => {message: {id, read_at}}
 * Make sure that the only the intended recipient can mark as read.
 **/

router.post("/:id/read", ensureLoggedIn, async (req, res, next) => {
	try {
		const message = await Message.get(req.params.id);
		if (req.user.username === message.to_user.username) {
			const readMessage = await Message.markRead(req.params.id);
			return res.status(201).json({ message: readMessage });
		} else {
			throw new ExpressError("Access not allows to mark this message as read", 403);
		}
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
