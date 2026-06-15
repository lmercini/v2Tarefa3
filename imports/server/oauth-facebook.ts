// server/imports/oauth-facebook.js

import { ServiceConfiguration } from 'meteor/service-configuration';
import { Accounts } from 'meteor/accounts-base';
import { OAuth } from 'meteor/oauth';
import { HTTP } from 'meteor/http';
import crypto from 'crypto';
import _ from 'lodash';
import { serverSettings as settings } from '/imports/config/serverSettings';

const whitelistedFields = ['id', 'email', 'name', 'first_name', 'last_name', 'link', 'gender', 'locale', 'age_range'];

// Taken from Meteor 1.5.1 facebook-oauth
const getIdentity = async (accessToken, fields) => {
	const config = await ServiceConfiguration.configurations.findOneAsync({
		service: 'facebook'
	});

	if (!config) {
		throw new ServiceConfiguration.ConfigError();
	}

	const hmac = crypto.createHmac('sha256', OAuth.openSecret(config.secret));
	hmac.update(accessToken);

	try {
		return HTTP.get('https://graph.facebook.com/v2.8/me', {
			params: {
				access_token: accessToken,
				appsecret_proof: hmac.digest('hex'),
				fields: fields.join(',')
			}
		}).data;
	} catch (err) {
		throw Object.assign(new Error(`Failed to fetch identity from Facebook. ${err.message}`), {
			response: err.response
		});
	}
};

// Taken from Meteor 1.5.1 facebook-oauth
const handleAuthFromAccessToken = async (accessToken, expiresAt) => {
	const identity = await getIdentity(accessToken, whitelistedFields);

	const serviceData = {
		accessToken,
		expiresAt
	};

	const fields = _.pick(identity, whitelistedFields);
	Object.assign(serviceData, fields);

	return {
		serviceData,
		options: { profile: { name: identity.name, email: serviceData.email } }
	};
};

const registerFacebookMobileLoginHandler = () => {
	Accounts.registerLoginHandler('facebookMobileLogin', async (params) => {
		const data = params.facebookMobileLogin;

		console.log('>>>Data:', data);

		if (!data) {
			return undefined;
		}

		const identity = await handleAuthFromAccessToken(data.accessToken, +new Date() + 1000 * data.expirationTime);

		console.log('>>>identity:', identity);

		const facebookUser = Accounts.updateOrCreateUserFromExternalService(
			'facebook',
			{
				...identity.serviceData
			},
			identity.options
		);
		const user = { ...facebookUser };

		user.username = identity.serviceData.name;
		user.emails = [{ address: identity.serviceData.email }];
		user.email = identity.serviceData.email;
		user._id = user.userId;
		user.roles = ['Usuario'];
		user.profile = {
			name: identity.serviceData.name,
			email: identity.serviceData.email
		};
		return facebookUser;
	});
};

const init = async () => {
	if (!settings || !settings.settingsFacebook?.appId || !settings.settingsFacebook?.secret) return;

	await ServiceConfiguration.configurations.upsertAsync(
		{ service: 'facebook' },
		{
			$set: {
				appId: settings.settingsFacebook.appId,
				secret: settings.settingsFacebook.secret
			}
		}
	);

	registerFacebookMobileLoginHandler();
};

export default init;
