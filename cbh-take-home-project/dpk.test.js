const { deterministicPartitionKey } = require('./dpk');
const crypto = require('crypto');
describe('deterministicPartitionKey', () => {
  it('should return trivial partition key when no event is passed', () => {
    expect(deterministicPartitionKey(null)).toEqual('0');
  });
  it('should return event partition key if it exists', () => {
    const event = { partitionKey: 'some-key' };
    expect(deterministicPartitionKey(event)).toEqual('some-key');
  });
  it('should generate a hash for the event if partition key is not provided', () => {
    const event = { some: 'data' };
    const hash = crypto
      .createHash('sha3-512')
      .update(JSON.stringify(event))
      .digest('hex');
    expect(deterministicPartitionKey(event)).toEqual(hash);
  });
  it('should stringify non-string partition key candidates', () => {
    const event = { partitionKey: 123 };
    expect(deterministicPartitionKey(event)).toEqual(
      JSON.stringify(event.partitionKey)
    );
  });
  it('should hash partition key candidates that are too long', () => {
    const longKey = 'a'.repeat(300);
    const hash = crypto.createHash('sha3-512').update(longKey).digest('hex');
    const event = { partitionKey: longKey };
    expect(deterministicPartitionKey(event)).toEqual(hash);
  });
  it('should not hash partition key candidates that are within length limit', () => {
    const shortKey = 'a'.repeat(50);
    const event = { partitionKey: shortKey };
    expect(deterministicPartitionKey(event)).toEqual(shortKey);
  });
});
