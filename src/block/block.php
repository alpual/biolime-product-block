<?php
// block.php

function biolime_render_block_custom_post( $attributes, $content ) {
    if (sizeof($attributes) > 0){
        $post_id = $attributes['selectedCustomPost'];
        $product_block = sprintf(
            'Post: <a class="wp-block-biolime-product-block" href="%1$s">%2$s</a>',
            esc_url( get_permalink( $post_id ) ),
            esc_html( get_the_title( $post_id ) )
        );
        return $product_block . get_the_post_thumbnail( $post_id );
    } else {
        return "<p>... No Products Found.</p>";
    }
}

register_block_type( 'biolime/block-biolime-product-block', array(
    'attributes' => [
        'selectedCustomPost' => [
            'type' => 'number'
        ]
    ],
    'render_callback' => 'biolime_render_block_custom_post',
) );