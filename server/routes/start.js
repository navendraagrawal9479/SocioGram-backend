import express from 'express'

const router = express.Router();

router.get('', (req, res) => {
  res.json({
    message: 'Server Started.'
  })
})
import express from 'express'
export default router;