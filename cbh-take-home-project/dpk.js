const crypto = require('crypto');
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;
  const candidate =
    event?.partitionKey ??
    (event && typeof event === 'object'
      ? crypto
          .createHash('sha3-512')
          .update(JSON.stringify(event))
          .digest('hex')
      : undefined);
  const partitionKey =
    typeof candidate !== 'string' ? JSON.stringify(candidate) : candidate;
  return partitionKey && partitionKey.length > MAX_PARTITION_KEY_LENGTH
    ? crypto.createHash('sha3-512').update(partitionKey).digest('hex')
    : partitionKey || TRIVIAL_PARTITION_KEY;
};
