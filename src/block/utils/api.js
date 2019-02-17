import axios from 'axios';

// eslint-disable-next-line valid-jsdoc
/**
 *  * Makes a get request to the PostTypes endpoint.
 *
 * @returns {AxiosPromise<any>}
 */
export const getPostTypes = () => axios.get( '/wp-json/wp/v2/types' );

// eslint-disable-next-line valid-jsdoc
/**
 * Makes a get request to the desired post type and builds the query string based on an object.
 *
 * @param {string|boolean} restBase - rest base for the query.
 // eslint-disable-next-line valid-jsdoc
 * @param {object} args
 * @returns {AxiosPromise<any>}
 */
export const getPosts = ( { restBase = false, ...args } ) => {
	const queryString = Object.keys( args ).map( arg => `${ arg }=${ args[ arg ] }` ).join( '&' );

	return axios.get( `/wp-json/wp/v2/${ restBase }?${ queryString }&_embed` );
};
