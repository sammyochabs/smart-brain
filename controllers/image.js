const clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: 'dfdf84cc32ac44ab99446223c03872f2'
   });
const handleApiCall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
        res.json(data);
    }).catch(err => res.status(400).json('unable to work with api'));
}


const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
    .increment('enteries', 1)
    .returning('enteries')
    .then(enteries => {
        res.json(enteries);
    })
    .catch(err => res.status(400).json('unable to get enteries'));
    
}

module.exports = {
    handleImage,
    handleApiCall
}