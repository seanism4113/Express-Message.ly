/** Server startup for Message.ly. */

const app = require("./app");
const { PORT } = require("./config");

app.listen(3000, () => {
	console.log(`Server connected on localhost: ${PORT}`);
});
