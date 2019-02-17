const { __ } = wp.i18n; // Import __() from wp.i18n
const { InspectorControls } = wp.editor;
const {
	SelectControl,
	ServerSideRender,
	PanelBody,
} = wp.components;
const { Component, Fragment } = wp.element;

export default class BioLimeProductSelector extends Component {
	static getInitialState( selectedPost ) {
		return {
			posts: [],
			selectedPost: selectedPost,
			post: {},
		};
	}

	constructor( props ) {
		super( ...arguments );
		this.props = props;
		// Maybe we have a previously selected post. Try to load it.
		this.state = this.constructor.getInitialState( this.props.attributes.selectedPost );
	}

	render() {
		const { attributes, categoriesList, isSelected, setAttributes } = this.props;
		// Options to hold all loaded posts. For now, just the default.
		const options = [ { value: 0, label: __( 'Select a Product' ) } ];
		const inspectorControls = isSelected &&
			<InspectorControls key="inspector">
				This is a BioLime Product
				<SelectControl
					// Selected value.
					value={ this.props.attributes.selectedPost }
					label={ __( 'Select a Product' ) }
					options={ options } />
			</InspectorControls>
		;

		return ( [
			inspectorControls,
			<ServerSideRender key="render"
				block="biolime/block-biolime-product-block"
				attributes={ this.props.attributes }
			/>,
		] );
	}
}
