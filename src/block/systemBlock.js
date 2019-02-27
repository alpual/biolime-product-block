/* eslint-disable valid-jsdoc */
/**
 * BLOCK: biolime-product-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import BioLimeSystemSelector from './components/BioLimeSystemSelector';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Custom icon for BioLime category
 */
const iconEl = <svg
	id="Layer_1"
	data-name="Layer 1"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 18 14">
	<title>BioLime Wall System Icon</title>
	<rect width="7" height="4" />
	<rect x="4" y="5" width="7" height="4" />
	<rect x="8" y="10" width="7" height="4" />
	<rect y="10" width="2" height="4" />
	<rect x="12" y="5" width="6" height="4" />
	<rect y="10" width="7" height="4" />
	<rect y="5" width="3" height="4" />
</svg>;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'biolime/block-biolime-system-block', {

	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'BioLime System' ), // Block title.

	description: __( 'A single BioLime System of your choice.' ),

	// Customized to use BioLime Logo in gray
	icon: iconEl, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.

	// Custom Category for BioLime blocks
	category: 'biolime-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	keywords: [
		__( 'biolime-system-block' ),
		__( 'system' ),
		__( 'BioLime' ),
	],

	attributes: {
		selectedCustomPost: {
			type: 'number',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: BioLimeSystemSelector,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save() {
		// Rendering in PHP
		return null;
	},
} );
