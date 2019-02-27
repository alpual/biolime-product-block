import CustomPostSelector from './CustomPostSelector';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const thisPostType = {
	title: __( 'BioLime Solution' ),
	slug: __( 'bl_solution' ),
	namespacedBlockDescriptor: 'biolime/block-biolime-solution-block',
	name: {
		singular: __( 'Solution' ),
		plural: __( 'Solution' ),
	},
};

export default class BioLimeProductSelector extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}
	render() {
		return <CustomPostSelector { ...this.props } postType={ thisPostType } />;
	}
}
