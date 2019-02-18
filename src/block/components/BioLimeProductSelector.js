const { __ } = wp.i18n; // Import __() from wp.i18n
const { InspectorControls } = wp.editor;
const {
	SelectControl,
	ServerSideRender,
	PanelBody,
} = wp.components;
const { Component } = wp.element;

export default class BioLimeProductSelector extends Component {
	static getInitialState( selectedProduct ) {
		return {
			posts: [],
			selectedProduct: selectedProduct,
			post: {},
			title: '',
			link: '',
			content: '',
		};
	}

	constructor( props ) {
		super( ...arguments );
		this.props = props;
		// Maybe we have a previously selected post. Try to load it.
		this.state = this.constructor.getInitialState( this.props.attributes.selectedProduct );
		this.getOptions = this.getOptions.bind( this );
		this.getOptions();
		this.onChangeSelectProduct = this.onChangeSelectProduct.bind( this );
	}

	getOptions() {
		return ( new wp.api.collections.Posts() )
			.fetch()
			.then( ( posts ) => {
				if ( posts && 0 !== this.state.selectedProduct ) {
					// If we have a selected Post, find that post and add it.
					const post = posts.find( ( item ) => {
						return item.id === this.state.selectedProduct;
					} );
					this.setState( { post, posts } );
				} else {
					this.setState( { posts } );
				}
			} );
	}

	onChangeSelectProduct( value ) {
		// Find the post in our list of options
		const post = this.state.posts.find( ( item ) => {
			return item.id === parseInt( value );
		} );
		// Set the state
		this.setState( { selectedProduct: parseInt( value ), post } );
		// Set the attributes
		this.props.setAttributes( {
			selectedProduct: parseInt( value ),
		} );
	}

	render() {
		const { attributes, categoriesList, isSelected, setAttributes } = this.props;
		// Options to hold all loaded posts. For now, just the default.
		const options = [ { value: 0, label: __( 'Select a Product' ) } ];

		const inspectorControls = !! isSelected &&
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'BioLime Product Settings' ) }>
					<SelectControl
						// Selected value.
						value={ this.props.attributes.selectedProduct }
						label={ __( 'Select a Product' ) }
						options={ options }
						onChange={ this.onChangeSelectProduct }
					/>
				</PanelBody>
			</InspectorControls>
		;

		const serverRenderPost = <ServerSideRender key="render"
			block="biolime/block-biolime-product-block"
			attributes={ this.props.attributes }
		/>;

		let output = __( 'Loading Products' );
		if ( this.state.posts.length > 0 ) {
			const loading = __( 'We have %d products. Choose one.' );
			output = loading.replace( '%d', this.state.posts.length );
			this.state.posts.forEach( ( post ) => {
				options.push( { value: post.id, label: post.title.rendered } );
			} );
		} else {
			output = __( 'Loading Product List...' );
		}

		const shouldRender = !! this.state.selectedProduct ? serverRenderPost :
			output;
		return ( [
			inspectorControls,
			shouldRender,
		] );
	}
}
