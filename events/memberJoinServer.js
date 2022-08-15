const { addMember } = require('../databases/playerdb.js');

/**
 * Initiated when a member joins a server, it will
 * check if the member is in the database, if not
 * it will add it.
 */
module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
        /**
         * addMember() is from playerdb.js and will check for
         * the user in the database, if there is already an 
         * instance of a user in the database, it will continue.
         */
            addMember(member.user.id)   
	},
};