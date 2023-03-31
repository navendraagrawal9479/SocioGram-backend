import User from "../models/user.js"

export const search = async (req, res) => {
  try {
    const key = req.params.key;
  
    const data = await User.find({
      "$or": [
        {"firstName": {$regex: key, $options: 'i'}},
        {"lastName": {$regex: key, $options: 'i'}},
        {"occupation": {$regex: key, $options: 'i'}}
      ]
    })

    res.status(200).json({
      data: data
    });
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
}