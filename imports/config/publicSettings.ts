import { Meteor } from 'meteor/meteor';

type PublicSettings = {
	name: string;
	maps: {
		api: string;
	};
};

const meteorPublicSettings = (Meteor.settings?.public || {}) as Partial<PublicSettings>;

export const publicSettings: PublicSettings = {
	name: meteorPublicSettings.name || 'MeteorReactBase-MUI',
	maps: {
		api: meteorPublicSettings.maps?.api || ''
	}
};
