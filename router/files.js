const express = require("express"), router = express.Router(), fresh = require('fresh');

router.get("*", (req, res) => {
  if (isFresh(req, res)) {
    res.statusCode = 304;
    res.end();
    return;
  };

  /* DRAFT */
  // res.set("Cache-Control", "public, max-age=86400");
  res.status(200).sendFile(process.cwd() + "/files/cluster" + req.url.split("?")[0], (err) => {
    if (err) return res.status(404).end("content not found.");
  });
});

// Caching
function isFresh(req, res) {
  return fresh(req.headers, {
    'etag': res.getHeader('ETag'),
    'last-modified': res.getHeader('Last-Modified')
  });
};

module.exports = router;
