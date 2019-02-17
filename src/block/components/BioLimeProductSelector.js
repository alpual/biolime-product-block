
const { InspectorControls } = wp.blocks;
const { SelectControl } = wp.components;
const { Component } = wp.element;

class BioLimeProductSelector extends Component {
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
		// Options to hold all loaded posts. For now, just the default.
		const options = [ { value: 0, label: __( 'Select a Product' ) } ];
		return [
			// If we are focused on this block, create the inspector controls.
			!! this.props.isSelected && ( <InspectorControls key="inspector">
				<SelectControl
					// Selected value.
					value={ this.props.attributes.selectedPost }
					label={ __( 'Select a Product' ) }
					options={ options } />
			</InspectorControls>
			),
			'Load Post Placeholder',
		];
	}
}
export default BioLimeProductSelector;
