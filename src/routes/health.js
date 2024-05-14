const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    return res.send({ message: 'connected successfully' });
});

module.exports = router;