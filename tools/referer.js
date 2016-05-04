export default function (req, res, next) {

    if (typeof req.headers.referer === 'undefined') {
        res.status(401).send({ACCESS_DENIED:'You do not have permission to access this page'});
    }
    else {
        next();
    }

}