import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import FormGroup from '@mui/material/FormGroup';
import { publicSettings } from '/imports/config/publicSettings';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { mapsFieldStyles } from './MapsFieldStyles';

class LocationComponent extends React.Component<IBaseSimpleFormComponent> {
	handleMapClick = (mapProps, map, clickEvent) => {
		const { name } = this.props;
		if (!this.props.readOnly) {
			const newPosition = {
				lat: clickEvent.latLng.lat(),
				lng: clickEvent.latLng.lng()
			};

			this.props.onChange(
				{ name, target: { name, value: { position: newPosition } } },
				{
					name,
					value: {
						position: newPosition
					}
				}
			);
		}
	};

	render() {
		return (
			<div style={mapsFieldStyles.container}>
				<FormGroup error={this.props.error} style={mapsFieldStyles.formContainer}>
					{this.props.label ? (
						<SimpleLabelView style={mapsFieldStyles.labelTitle} label={this.props.label} disabled={readOnly} />
					) : null}
					<div style={mapsFieldStyles.mapContainer}>
						<Map
							containerStyle={mapsFieldStyles.mapContainer2}
							style={mapsFieldStyles.map}
							google={this.props.google}
							initialCenter={
								this.props.value.position
									? this.props.value.position
									: {
											lat: -19.9051,
											lng: -43.9445
										}
							}
							zoom={12}
							onClick={this.handleMapClick}>
							{this.props.value.position && this.props.value.position.lat && this.props.value.position.lng ? (
								<Marker name={'Location'} position={this.props.value.position} />
							) : null}
						</Map>
					</div>
				</FormGroup>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: publicSettings.maps.api,
	libraries: ['visualization']
})(LocationComponent);
