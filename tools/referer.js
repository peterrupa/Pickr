export default function (req, res, next) {

    if (typeof req.headers.referer === 'undefined' ||
        req.headers.referer.substring(0,21) !== 'http://localhost:3000') {
        res.status(401).send({ACCESS_DENIED: 'You do not have permission to' +
        'view this page'});
    }
    else {
        next();
    }

}
