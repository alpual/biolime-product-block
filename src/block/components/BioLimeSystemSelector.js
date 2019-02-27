import CustomPostSelector from './CustomPostSelector';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const thisPostType = {
	title: __( 'BioLime System' ),
	slug: __( 'bl_system' ),
	namespacedBlockDescriptor: 'biolime/block-biolime-system-block',
	name: {
		singular: __( 'System' ),
		plural: __( 'Systems' ),
	},
};

export default class BioLimeSystemSelector extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}
	render() {
		return <CustomPostSelector { ...this.props } postType={ thisPostType } />;
	}
}
