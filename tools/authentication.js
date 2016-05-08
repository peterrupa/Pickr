export default function (req, res, next) {

    if (typeof req.session !== 'undefined' &&
        typeof req.session.key !== 'undefined') {
        next();
    }
    else {
        res.status(403).send({ACCESS_DENIED: 'You do not have permission to ' +
        'view this page'});
    }

}
