<?php
// block.php

function biolime_render_block_latest_post( $attributes, $content ) {
    $recent_posts = wp_get_recent_posts( array(
        'numberposts' => 1,
        'post_status' => 'publish',
    ) );
    if ( count( $recent_posts ) === 0 ) {
        return 'No posts';
    }
    $post = $recent_posts[ 0 ];
    $post_id = $post['ID'];
    $product_block = sprintf(
        'Post: <a class="wp-block-biolime-product-block" href="%1$s">%2$s</a>',
        esc_url( get_permalink( $post_id ) ),
        esc_html( get_the_title( $post_id ) )
    );
    return $product_block . get_the_post_thumbnail( $post_id );
}

register_block_type( 'biolime/block-biolime-product-block', array(
    'attributes' => array(
        'content' => array(
            'type' => 'string',
            'source' => 'html',
            'selector' => 'p',
        )
    ),
    'render_callback' => 'biolime_render_block_latest_post',
) );