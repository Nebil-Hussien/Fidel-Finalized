const { defaultPageSize } = require("../constants/constants");

const successMessage = (res, message) => {
  res.send(
    JSON.stringify({
      success: true,
      message: message,
    })
  );
};

const errorMessage = (res, message) => {
  res.send(
    JSON.stringify({
      success: false,
      message: message,
    })
  );
};

const errorMessageWithStatusCode = (res, message, statusCode) => {
  res.status(statusCode).send(
    JSON.stringify({
      success: false,
      message: message,
    })
  );
};

function paginatedResults(total_number, conn, res, req, query) {
  const page = !req.query.page ? 1 : parseInt(req.query.page);
  const limit = 15;

  const paginate = {};

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  if (endIndex < total_number) {
    paginate.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    paginate.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  conn.query(
    `${query} LIMIT ? OFFSET ? `,
    [limit, startIndex],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else {
        res.send(
          JSON.stringify({
            success: true,
            total_items: total_number,
            paginate,
            results: rows,
          })
        );
      }
    }
  );
}

const resultMessageWithUserToken = (res, token, result,role) => {
  res.send(
    JSON.stringify({
      success: true,
      token: token,
      results: result,
      role: role
    })
  );
};

const socketEmit = (res, msg, data) => {
  res.io.emit(msg, data);
};

const resultMessage = (res, results, message) => {
  res.send(
    JSON.stringify({
      success: true,
      results: results,
      message,
    })
  );
};
const paginatedResultMessage = (res, results, total_items) => {
  let pageLimit;
  if (results.length > 0) {
    pageLimit = defaultPageSize;
  }
  res.send(
    JSON.stringify({
      success: true,
      pageLimit,
      total_items: total_items,
      results: results,
    })
  );
};
module.exports = {
  paginatedResultMessage,
  successMessage,
  errorMessage,
  errorMessageWithStatusCode,
  resultMessageWithUserToken,
  resultMessage,
  paginatedResults,
  socketEmit,
};
