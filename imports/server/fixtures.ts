import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { userprofileServerApi } from '../modules/userprofile/api/userProfileServerApi';

async function createDefautUser() {
	// if (Meteor.isDevelopment && Meteor.users.find().count() === 0) {
	if ((await Meteor.users.find({}).countAsync()) === 0) {
		const defaultAdminUsername = process.env.DEFAULT_ADMIN_USERNAME || 'Administrador';
		const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@mrb.com';
		const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin@mrb.com';

		if (!process.env.DEFAULT_ADMIN_PASSWORD) {
			console.warn(
				'DEFAULT_ADMIN_PASSWORD não foi definida. Usando a senha fallback do boilerplate para o usuário administrador.'
			);
		}

		let createdUserId = '';
		createdUserId = await Accounts.createUserAsync({
			username: defaultAdminUsername,
			email: defaultAdminEmail,
			password: defaultAdminPassword
		});

		await Meteor.users.upsertAsync(
			{ _id: createdUserId },
			{
				$set: {
					'emails.0.verified': true,
					profile: {
						name: defaultAdminUsername,
						email: defaultAdminEmail
					}
				}
			}
		);

		await userprofileServerApi.getCollectionInstance().insertAsync({
			_id: createdUserId,
			username: defaultAdminUsername,
			email: defaultAdminEmail,
			roles: ['Administrador']
		});
	}
}

// if the database is empty on server start, create some sample data.
Meteor.startup(async () => {
	console.log('fixtures Meteor.startup');
	// Add default admin account
	await createDefautUser();
});
