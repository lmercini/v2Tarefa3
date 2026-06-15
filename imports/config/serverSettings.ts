import { Meteor } from 'meteor/meteor';
// @ts-ignore
import legacySettings from '/settings';

type OAuthGoogleSettings = {
	client_id: string;
	client_secret: string;
	validClientIds: string[];
};

type OAuthFacebookSettings = {
	appId: string;
	secret: string;
};

const privateSettings = ((Meteor.settings?.private || Meteor.settings || {}) as any) || {};
const publicSettings = ((Meteor.settings?.public || {}) as any) || {};

const splitEnvList = (value?: string) =>
	(value || '')
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean);

const googleValidClientIds = splitEnvList(process.env.GOOGLE_VALID_CLIENT_IDS);

export const serverSettings = {
	name: process.env.APP_NAME || publicSettings.name || legacySettings.name,
	short_name: process.env.APP_SHORT_NAME || publicSettings.short_name || legacySettings.short_name,
	service: process.env.APP_SERVICE_NAME || privateSettings.service || legacySettings.service,
	mail_no_reply: process.env.MAIL_NO_REPLY || privateSettings.mail_no_reply || legacySettings.mail_no_reply,
	mail_system: process.env.MAIL_SYSTEM || privateSettings.mail_system || legacySettings.mail_system,
	mail_url_smtp: process.env.MAIL_URL_SMTP || privateSettings.mail_url_smtp || legacySettings.mail_url_smtp,
	settingsGoogle: {
		client_id:
			process.env.GOOGLE_CLIENT_ID ||
			publicSettings.settingsGoogle?.client_id ||
			privateSettings.settingsGoogle?.client_id ||
			legacySettings.settingsGoogle?.client_id ||
			'',
		client_secret:
			process.env.GOOGLE_CLIENT_SECRET ||
			privateSettings.settingsGoogle?.client_secret ||
			legacySettings.settingsGoogle?.client_secret ||
			'',
		validClientIds:
			googleValidClientIds.length > 0
				? googleValidClientIds
				: privateSettings.settingsGoogle?.validClientIds || legacySettings.settingsGoogle?.validClientIds || []
	} as OAuthGoogleSettings,
	settingsFacebook: {
		appId:
			process.env.FACEBOOK_APP_ID ||
			publicSettings.settingsFacebook?.appId ||
			privateSettings.settingsFacebook?.appId ||
			legacySettings.settingsFacebook?.appId ||
			'',
		secret:
			process.env.FACEBOOK_SECRET ||
			privateSettings.settingsFacebook?.secret ||
			legacySettings.settingsFacebook?.secret ||
			''
	} as OAuthFacebookSettings
};
