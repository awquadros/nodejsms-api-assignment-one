const handlers = require('./handlers');

const router = {
    delete: {},
    get: {},
    post: {},
    put: {}
};

router.post.hello = handlers.hello

module.exports = router;