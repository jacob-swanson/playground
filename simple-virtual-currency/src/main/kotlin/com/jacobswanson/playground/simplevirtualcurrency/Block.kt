package com.jacobswanson.playground.simplevirtualcurrency

import java.security.MessageDigest

data class Block(
        val index: Long,
        val previousHash: String?,
        val timestamp: Long,
        val data: String,
        val hash: String = calculateHash(index, previousHash, timestamp, data)
) {
    companion object {
        fun calculateHash(index: Long,
                          previousHash: String?,
                          timestamp: Long,
                          data: String): String {
            val digest = MessageDigest.getInstance("SHA-256")
            val hashBytes = digest.digest("$index,$previousHash,$timestamp,$data".toByteArray())
            return hashBytes.fold("", { str, it -> str + "%02x".format(it) })
        }

        fun calculateHash(block: Block): String = calculateHash(block.index, block.previousHash, block.timestamp, block.data)
    }
}