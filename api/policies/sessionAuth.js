/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
	if(req.isSocket) return next();
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect('/home/login');
	}
	
};
