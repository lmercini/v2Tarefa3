import React, { ComponentType, lazy, Suspense } from 'react';
import { SysLoading } from '/imports/ui/components/sysLoading/sysLoading';

type ImportedComponent<TProps> = Promise<{ default: ComponentType<TProps> }>;
type ComponentImporter<TProps> = (() => ImportedComponent<TProps>) | ImportedComponent<TProps>;

const asyncComponent = <TProps extends object = Record<string, never>>(
	importingComponent: ComponentImporter<TProps>,
	LoadingComponent: ComponentType = () => React.createElement(SysLoading)
) => {
	const LazyComponent = lazy(typeof importingComponent === 'function' ? importingComponent : () => importingComponent);

	function AsyncComponent(props: TProps) {
		return React.createElement(
			Suspense,
			{ fallback: React.createElement(LoadingComponent) },
			React.createElement(LazyComponent, props)
		);
	}

	AsyncComponent.displayName = `Async(${LazyComponent.displayName || LazyComponent.name || 'Component'})`;

	return AsyncComponent;
};

export default asyncComponent;
