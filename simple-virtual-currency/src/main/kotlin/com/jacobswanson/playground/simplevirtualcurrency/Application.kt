package com.jacobswanson.playground.simplevirtualcurrency

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.messaging.converter.StringMessageConverter
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.socket.client.WebSocketClient
import org.springframework.web.socket.client.standard.StandardWebSocketClient
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.messaging.WebSocketStompClient
import java.time.Instant
import javax.validation.Valid

@RestController
@EnableWebSocketMessageBroker
@SpringBootApplication
class Application {
    final val genesisBlock = Block(0, null, 1465154705, "This is the genesis block!!!")
    var blockchain = mutableListOf(genesisBlock)

    final val webSocketClient = StandardWebSocketClient()
    final val stompClient = WebSocketStompClient(webSocketClient)

    init {
        stompClient.messageConverter = StringMessageConverter()
        stompClient.taskScheduler

    }

    fun generateNextBlock(blockData: String): Block {
        val previousBlock = getLatestBlock()
        val nextIndex = previousBlock.index + 1
        val nextTimestamp = Instant.now().epochSecond
        val newBlock = Block(nextIndex, previousBlock.hash, nextTimestamp, blockData)
        addBlock(newBlock)
        broadcastLatest()
        return newBlock
    }

    fun addBlock(newBlock: Block): Boolean {
        if (isValidNewBlock(newBlock, getLatestBlock())) {
            blockchain.add(newBlock)
            return true
        }
        return false
    }

    fun getLatestBlock(): Block {
        return blockchain.last()
    }

    fun isValidNewBlock(newBlock: Block, previousBlock: Block): Boolean {
        when {
            previousBlock.index + 1 != newBlock.index -> return false
            previousBlock.hash != newBlock.previousHash -> return false
            newBlock.hash != Block.calculateHash(newBlock) -> return false
            else -> return true
        }
    }

    fun isValidChain(blockchainToValidate: List<Block>): Boolean {
        if (blockchainToValidate.isEmpty()) {
            return false
        }
        val isValidGenesis = blockchainToValidate.first() == genesisBlock
        if (!isValidGenesis) {
            return false
        }
        (1 until blockchainToValidate.size).forEach {
            if (!isValidNewBlock(blockchainToValidate[it], blockchainToValidate[it - 1])) {
                return false
            }
        }
        return true
    }

    fun replaceChain(newBlocks: List<Block>) {
        if (isValidChain(newBlocks) && newBlocks.size > blockchain.size) {
            blockchain = newBlocks.toMutableList()
            broadcastLatest()
        }
    }

    @GetMapping("/blocks")
    fun getBlocks(): List<Block> {
        return blockchain.toList()
    }

    @PostMapping("/blocks")
    fun mineBlock(@Valid @RequestBody mineRequest: MineRequest): Block {
        val newBlock = generateNextBlock(mineRequest.data)
        return newBlock
    }


    @GetMapping("/peers")
    fun getPeers() {
        TODO("not implemented")
    }

    @PostMapping("/peers")
    fun addPeer(addPeerRequest: AddPeerRequest) {
        TODO("not implemented")
    }

    @MessageMapping("/blockchain.getLatestBlock")
    @SendTo("/topic/blocks")
    fun websocketGetLatestBlock(): Block {
        return getLatestBlock()
    }

    @MessageMapping("/blockchain.getAllBlocks")
    @SendTo("/topic/blocks")
    fun websocketGetAllBlocks(): List<Block> {
        return getBlocks()
    }

    @SendTo("/topic/blocks")
    fun broadcastLatest(): Block {
        return getLatestBlock()
    }
}

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
