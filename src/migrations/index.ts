import * as migration_20260122_182953 from './20260122_182953';
import * as migration_20260122_195735 from './20260122_195735';

export const migrations = [
  {
    up: migration_20260122_182953.up,
    down: migration_20260122_182953.down,
    name: '20260122_182953',
  },
  {
    up: migration_20260122_195735.up,
    down: migration_20260122_195735.down,
    name: '20260122_195735'
  },
];
