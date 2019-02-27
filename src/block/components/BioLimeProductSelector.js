import CustomPostSelector from './CustomPostSelector';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const thisPostType = {
	title: __( 'BioLime Product' ),
	slug: __( 'bl_product' ),
	namespacedBlockDescriptor: 'biolime/block-biolime-product-block',
	name: {
		singular: __( 'Product' ),
		plural: __( 'Products' ),
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
