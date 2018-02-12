package com.jacobswanson.playground.simplevirtualcurrency

data class LatestBlockP2PMessage(
        val block: Block
) {
    val type = "latest-block"
}

data class AllBlocksP2PMessage(
        val blocks: List<Block>
) {
    val type = "all-blocks"
}