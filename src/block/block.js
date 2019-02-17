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

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Fragment } = wp.element;
const { ServerSideRender } = wp.components;
const {
	InspectorControls,
} = wp.editor;

/**
 * Custom icon for BioLime Product
 */
const iconEl = <svg viewBox=" 0 0 20 20" xmlns="http://www.w3.org/2000/svg">
	<path d="M17.8,6.69a8.37,8.37,0,0,0-1.13-2.23,8.17,8.17,0,0,0-.81-1,7.81,7.81,0,0,0-1-.83,7.57,7.57,0,0,0-2.37-1.11,8.23,8.23,0,0,0-1.3-.23,8.44,8.44,0,0,0-1.33,0,7.55,7.55,0,0,0-1.26.22,7.5,7.5,0,0,0-1.94.38,7.23,7.23,0,0,0-1.21.52,6.69,6.69,0,0,0-1.09.73,6.78,6.78,0,0,0-1,1A7.11,7.11,0,0,0,2.11,5.4a6.76,6.76,0,0,0-.68,1.08A7.5,7.5,0,0,0,1,7.67a7,7,0,0,0-.22,1.2,6.52,6.52,0,0,0-.3,1.86A7.64,7.64,0,0,0,.55,12a7.1,7.1,0,0,0,.34,1.22,7.47,7.47,0,0,0,.54,1.1A6.74,6.74,0,0,0,2.31,16a7.13,7.13,0,0,0,.84,1,7.88,7.88,0,0,0,1,.81,7.5,7.5,0,0,0,2.41,1A6.67,6.67,0,0,0,7.9,19a5,5,0,0,0,.67,0A5.19,5.19,0,0,0,9.25,19,6.11,6.11,0,0,0,11.76,18a5.8,5.8,0,0,0,1.84-1.88,5.66,5.66,0,0,0,.79-2.46c0-.21,0-.43,0-.64a5,5,0,0,0-.08-.66,3.78,3.78,0,0,0-.19-.63,4,4,0,0,0-.28-.6,4.47,4.47,0,0,0-1.92-1.78A4.8,4.8,0,0,0,10.75,9l-.33-.18,0,0,.12.12A3.69,3.69,0,0,0,9.36,9v0a5.91,5.91,0,0,1,1.21.26l.44.19a2.52,2.52,0,0,1,.21.25,2.34,2.34,0,0,1,.25.39c0,.11,0,.22,0,.32a3.42,3.42,0,0,1,0,.46l-.17.28-.3.36-.32.13A5.19,5.19,0,0,1,9.5,12a4.63,4.63,0,0,1-2.28-.36,4,4,0,0,1-.51-.25L6.24,11l-.41-.38a5,5,0,0,1-.37-.43,4.69,4.69,0,0,1-.92-2A4.86,4.86,0,0,1,4.65,6c0-.14.1-.27.15-.41s.23-.2.35-.28A8.91,8.91,0,0,1,7.34,4.15a10.32,10.32,0,0,1,1.21-.33A10.42,10.42,0,0,1,9.8,3.66v0a8.93,8.93,0,0,0-1.27.09A7.77,7.77,0,0,0,7.28,4,8.82,8.82,0,0,0,5.07,5a4.42,4.42,0,0,1,.34-.54,9.77,9.77,0,0,1,1.38-.57,8.77,8.77,0,0,1,2.44-.4,9.43,9.43,0,0,1,2.48.27,8.15,8.15,0,0,1,1.18.39A8.94,8.94,0,0,1,14,4.69l0,0A9.06,9.06,0,0,0,12.94,4a9.31,9.31,0,0,0-1.18-.46,9.34,9.34,0,0,0-2.53-.39,9.43,9.43,0,0,0-3.15.53l.1-.1c.15-.12.3-.25.46-.36l.24-.14A8.82,8.82,0,0,1,9,2.87a9.1,9.1,0,0,1,2.43.36,8.67,8.67,0,0,1,2.24,1A8.2,8.2,0,0,1,15.51,5.8a8.57,8.57,0,0,1,.74,1,8.36,8.36,0,0,1,.58,1.06l0,0a7.87,7.87,0,0,0-.52-1.1,8.31,8.31,0,0,0-.69-1A8.72,8.72,0,0,0,13.83,4,9.29,9.29,0,0,0,9,2.4c-.25,0-.49,0-.74,0a6.82,6.82,0,0,1,1.07-.3,8.77,8.77,0,0,1,1.14.1l.59.13.59.17A8.54,8.54,0,0,1,15.6,5.22a8.3,8.3,0,0,1,1.22,2,7.92,7.92,0,0,1,.57,2.3,8,8,0,0,1,0,1.2A6.94,6.94,0,0,1,17.24,12h.05a8.06,8.06,0,0,0,.23-1.19,7.12,7.12,0,0,0,.05-1.22,7.86,7.86,0,0,0-.47-2.39,8.49,8.49,0,0,0-3-3.94,8.85,8.85,0,0,0-2-1.07,1.2,1.2,0,0,1,.2,0,6.88,6.88,0,0,1,2.18,1,6.47,6.47,0,0,1,.91.75,5.6,5.6,0,0,1,.41.43c.13.14.26.3.38.45a7.85,7.85,0,0,1,1.6,4.36,7.7,7.7,0,0,1-.24,2.34,8,8,0,0,1-1.63,3.19,8.84,8.84,0,0,1-.84.89l0,0a8,8,0,0,0,.9-.85,7.12,7.12,0,0,0,.78-1,8.55,8.55,0,0,0,1.06-2.22A8.06,8.06,0,0,0,17.8,6.69ZM3.87,5.76c0,.06,0,.12-.05.18A9.52,9.52,0,0,0,2.7,7.19l0-.13a5.7,5.7,0,0,1,.16-.55A2.56,2.56,0,0,1,3,6.27a8.3,8.3,0,0,1,1-.94C4,5.48,3.91,5.62,3.87,5.76ZM2.82,14.9a5.9,5.9,0,0,1-1-1.41A4,4,0,0,1,1.77,13a5.82,5.82,0,0,0,1.51,1.54,6.27,6.27,0,0,0,5.18.85l.64-.22a5.92,5.92,0,0,0,.62-.3,5.58,5.58,0,0,0,.56-.39,5.35,5.35,0,0,0,.5-.45,4.21,4.21,0,0,0,1.1-2.34,3.14,3.14,0,0,0,0-.53A4,4,0,0,1,12,13a3.53,3.53,0,0,1-.13.54,3.66,3.66,0,0,1-.21.51,3.26,3.26,0,0,1-.27.48c-.11.15-.22.31-.34.45a5.19,5.19,0,0,1-1.83,1.37,5.45,5.45,0,0,1-4.54,0A4.29,4.29,0,0,1,4.17,16l-.48-.32A6.53,6.53,0,0,1,2.82,14.9ZM11.2,12a4.23,4.23,0,0,1-1,1.53,3.73,3.73,0,0,1-.43.36,3,3,0,0,1-.48.31,3.38,3.38,0,0,1-.51.24,3.58,3.58,0,0,1-.55.19,5.45,5.45,0,0,1-4.47-.71,5,5,0,0,1-1.54-1.66A4,4,0,0,1,2,11.75a4.81,4.81,0,0,1-.2-.53A2.44,2.44,0,0,1,1.71,11,7.38,7.38,0,0,1,2,9.64c0,.14.08.29.13.43a5.6,5.6,0,0,0,1.43,2.17,5.9,5.9,0,0,0,2.29,1.35c.21.07.43.13.65.18a5.4,5.4,0,0,0,.69.08,5.3,5.3,0,0,0,.69,0,5.07,5.07,0,0,0,.68-.11,4.64,4.64,0,0,0,2.31-1.31A3.37,3.37,0,0,0,11.2,12ZM1.74,8.81a5.9,5.9,0,0,0-.23.67,6.29,6.29,0,0,1,.07-1.06c.07-.15.15-.29.22-.43a5.2,5.2,0,0,0,0,.68A1,1,0,0,0,1.74,8.81Zm11.4,2.71a2.91,2.91,0,0,1,.22.51,3.3,3.3,0,0,1,.13.52,3.45,3.45,0,0,1,.07.55,5,5,0,0,1,0,.55,4.72,4.72,0,0,1-.67,2.12A5,5,0,0,1,11.3,17.4a5.21,5.21,0,0,1-2.17.82,3.79,3.79,0,0,1-.58.05q-.3,0-.6,0a6.57,6.57,0,0,1-1.18-.16,6.75,6.75,0,0,1-2.18-.9c-.17-.11-.32-.25-.48-.37l.21.12a6.21,6.21,0,0,0,2.62.61A6.42,6.42,0,0,0,9.57,17a6,6,0,0,0,2.13-1.59c.14-.17.28-.35.4-.53a4.71,4.71,0,0,0,.32-.58,4.2,4.2,0,0,0,.36-1.27,4.05,4.05,0,0,0-.5-2.51,3.2,3.2,0,0,0-.3-.45A4.38,4.38,0,0,1,13.14,11.52Zm-8.36-.84c.14.18.28.34.43.5a5.47,5.47,0,0,0,.51.45,4.28,4.28,0,0,0,.57.37,4.91,4.91,0,0,0,.62.28,4.81,4.81,0,0,0,2.68.19,3.74,3.74,0,0,0,.54-.17A4.55,4.55,0,0,1,8.39,13a5.73,5.73,0,0,1-.58.07,5.42,5.42,0,0,1-.57,0A5.58,5.58,0,0,1,6.67,13a5.12,5.12,0,0,1-.56-.15,5.34,5.34,0,0,1-2-1.16A4.91,4.91,0,0,1,2.89,9.81,4.45,4.45,0,0,1,2.6,8.16a8,8,0,0,1,.79-1.23c.09-.11.2-.22.3-.33a5.22,5.22,0,0,0,0,1.72A5.47,5.47,0,0,0,4.78,10.68ZM4.32,4.52c-.21.13-.4.28-.6.42a6.88,6.88,0,0,1,.7-.82l.45-.24a5.23,5.23,0,0,0-.4.56Z"
	/>
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
registerBlockType( 'biolime/block-biolime-product-block', {

	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'BioLime Product' ), // Block title.

	description: __( 'A single BioLime Product of your choice.' ),

	// Customized to use BioLime Logo in gray
	icon: iconEl, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.

	// Custom Category for BioLime blocks
	category: 'biolime-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	keywords: [
		__( 'biolime-product-block' ),
		__( 'product' ),
		__( 'BioLime' ),
	],

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
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
	edit: function( props ) {
		return (
			<Fragment>
				<InspectorControls></InspectorControls>
				<ServerSideRender
					block="biolime/block-biolime-product-block"
					attributes={ props.attributes }
				/>
			</Fragment>
		);
	},

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
