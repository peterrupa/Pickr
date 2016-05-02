export default function (req, res, next) {

    if (typeof req.headers.referer === 'undefined') {
        res.status(401).send({PERMISSION_DENIED:'REQUEST DENIED'});
    }
    else {
        next();
    }

};  