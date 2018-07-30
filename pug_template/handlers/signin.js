exports.signin = async function (req, res, next) {
    try {
        return res
            .status(200)
            .render("signin");

    } catch (err) {
        return next({
            status: 400,
            message: err
        });
    }
}