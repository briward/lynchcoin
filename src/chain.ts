import * as sha256 from 'crypto-js/sha256';

import Block from './block';

class Chain {
  private blocks: Block[];

  constructor() {
    this.blocks = [];
  }
  
  /**
   * Get all blocks that exist in the chain.
   *
   * @returns {Block[]} The blocks within this chain.
   */
  public getBlocks() : Block[] {
    return this.blocks;
  }

  /**
   * Get the latest block in the chain.
   *
   * @returns {Block} The latest block in the chain.
   */
  public getLatestBlock() : Block {
    return this.blocks[this.blocks.length - 1];
  }

  /**
   * Calculate a block's hash.
   *
   * @param {number} index The index of the block.
   * @param {string} previousHash The previous hash of the block.
   * @param {number} timestamp The timestamp of the block.
   * @param {string} data The data stored within the block.
   *
   * @returns {string} The calculated hash of the block.
   */
  public calculateBlockHash(index: number, previousHash: string, timestamp: number, data: string) : string {
    return sha256(index + previousHash + timestamp + data).toString();
  }

  /**
   * Add the very first (Genesis) block to the chain.
   *
   * @param {Block} block The genesis block of the chain.
   */
  public addGenesisBlock(block: Block) {
    this.blocks.push(block);
  }

  /**
   * Add a new block to the chain.
   *
   * @param {Block} block The block to add to the chain.
   *
   * @returns {void}
   */
  public addBlockToChain(block: Block) {
    if (!this.isBlockValid(block)) {
      throw new Error('This block is not valid in the chain.');
    }
  
    this.blocks.push(block);
  }

  /**
   * Check if a block is valid in the chain.
   *
   * @param {Block} block The block to validate in the chain.
   *
   * @returns {boolean} A boolean indicating the validation. 
   */
  public isBlockValid(block: Block): boolean {
    if (!block.isValidStructure()) {
      return false;
    }
  
    if (this.getLatestBlock().index + 1 !== block.index) {
      return false;
    }
  
    if (this.getLatestBlock().hash !== block.previousHash) {
      return false;
    }

    const calculatedHash = this.calculateBlockHash(
      block.index,
      block.previousHash,
      block.timestamp,
      block.data,
    );

    if (block.hash !== calculatedHash) {
      return false;
    }

    return true;
  }

  /**
   * Get the next index in the chain.
   *
   * @returns {number} The next index in the chain.
   */
  public getNextIndex(): number {
    return this.getLatestBlock().index + 1;
  }

  /**
   * Generate a new block in the chain.
   *
   * @param {string} data The data to store in the block.
   *
   * @returns {Block} The generated next block in the chain.
   */
  public generateNextBlock(data: string): Block {
    const index = this.getNextIndex();
    const previousHash = this.getLatestBlock().hash;
    const timestamp = new Date().getTime() / 1000;

    const hash = this.calculateBlockHash(
      index,
      previousHash,
      timestamp,
      data,
    );

    return new Block(
      index,
      hash,
      previousHash,
      timestamp,
      data,
    );
  }

  public replaceChain(blocks: Block[]) {
    
  }
}

export default Chain;
