/**
 * In heaven, everything is fine.
 */

import Block from './src/block';
import Chain from './src/chain';

const chain = new Chain();

const genesis: Block = new Block(
  0,
  '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
  '',
  1465154705,
  'The Genesis Block'
);

chain.addGenesisBlock(genesis);

const block = chain.generateNextBlock('Test');

chain.addBlockToChain(block);

console.log(chain);
