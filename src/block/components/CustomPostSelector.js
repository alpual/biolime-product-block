const { __ } = wp.i18n; // Import __() from wp.i18n
const { InspectorControls } = wp.editor;
const {
	SelectControl,
	ServerSideRender,
	PanelBody,
} = wp.components;
const { Component } = wp.element;

export default class CustomPostSelector extends Component {
	static getInitialState( existingSelectedCustomPost ) {
		return {
			posts: [],
			selectedCustomPost: existingSelectedCustomPost,
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
		this.state = this.constructor.getInitialState( this.props.attributes.selectedCustomPost );
		this.getOptions = this.getOptions.bind( this );
		this.getOptions();
		this.onChangeSelectCustomPost = this.onChangeSelectCustomPost.bind( this );
	}

	getOptions() {
		const CustomPost = wp.api.models.Post.extend( {
			urlRoot: wpApiSettings.root + 'wp/v2/' + this.props.postType.slug,
			defaults: {
				type: this.props.postType.slug,
			},
		} );
		const CustomPosts = wp.api.collections.Posts.extend( {
			url: wpApiSettings.root + 'wp/v2/' + this.props.postType.slug,
			model: CustomPost,
		} );
		const someCustomPosts = new CustomPosts;
		someCustomPosts
			.fetch()
			.then( ( posts ) => {
				if ( posts && ( 0 !== this.state.selectedCustomPost ) ) {
					// If we have a selected Post, find that post and add it.
					const post = posts.find( ( item ) => {
						return item.id === this.state.selectedCustomPost;
					} );
					this.setState( { post, posts } );
				} else {
					this.setState( { posts } );
				}
			} );
	}

	onChangeSelectCustomPost( value ) {
		// Find the post in our list of options
		const post = this.state.posts.find( ( item ) => {
			return item.id === parseInt( value );
		} );
		// Set the state
		this.setState( { selectedCustomPost: parseInt( value ), post } );
		// Set the attributes
		this.props.setAttributes( {
			selectedCustomPost: parseInt( value ),
		} );
	}

	render() {
		const { isSelected } = this.props;
		// Options to hold all loaded posts. For now, just the default.
		const options = [ { value: 0, label: __( 'Select a ' + this.props.postType.name.singular ) } ];

		const inspectorControls = !! isSelected &&
			<InspectorControls key="inspector">
				<PanelBody title={ __( this.props.postType.title + ' Settings' ) }>
					<SelectControl
						// Selected value.
						value={ this.props.attributes.selectedCustomPost }
						label={ __( 'Select a ' + this.props.postType.name.singular ) }
						options={ options }
						onChange={ this.onChangeSelectCustomPost }
					/>
				</PanelBody>
			</InspectorControls>
			;

		const serverRenderPost = <ServerSideRender key="render"
			block={ this.props.postType.namespacedBlockDescriptor }
			attributes={ this.props.attributes }
		/>;

		let output = __( 'Loading ' + this.props.postType.name.singular );
		if ( this.state.posts.length > 0 ) {
			const postDescription = ( this.state.posts.length === 1 ? this.props.postType.name.singular : this.props.postType.name.plural );
			const loading = __( 'We have %d ' + postDescription + '. Choose one from the block settings to the right.' );
			output = loading.replace( '%d', this.state.posts.length );
			this.state.posts.forEach( ( post ) => {
				options.push( { value: post.id, label: post.title.rendered } );
			} );
		} else {
			output = __( 'Loading ' + this.props.postType.name.singular + ' List...' );
		}
		const shouldRender = !! this.state.selectedCustomPost ? serverRenderPost :
			output;
		return ( [
			inspectorControls,
			shouldRender,
		] );
	}
}
