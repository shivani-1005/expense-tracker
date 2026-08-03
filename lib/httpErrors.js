// Thrown for bad client input so the catch block can tell "this is the
// user's fault (400)" apart from "something actually broke (500)",
// instead of every failure collapsing into a generic 500.
class ValidationError extends Error {}

const handleError = (res, error, fallbackMessage = "Something went wrong") => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ success: false, message: error.message });
  }
  console.error(error);
  return res.status(500).json({ success: false, message: fallbackMessage });
};

module.exports = { ValidationError, handleError };
