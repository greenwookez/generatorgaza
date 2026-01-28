import * as migration_20260122_182953 from './20260122_182953';
import * as migration_20260122_195735 from './20260122_195735';
import * as migration_20260123_205123 from './20260123_205123';
import * as migration_20260123_213410 from './20260123_213410';
import * as migration_20260124_164247 from './20260124_164247';
import * as migration_20260128_205255 from './20260128_205255';

export const migrations = [
  {
    up: migration_20260122_182953.up,
    down: migration_20260122_182953.down,
    name: '20260122_182953',
  },
  {
    up: migration_20260122_195735.up,
    down: migration_20260122_195735.down,
    name: '20260122_195735',
  },
  {
    up: migration_20260123_205123.up,
    down: migration_20260123_205123.down,
    name: '20260123_205123',
  },
  {
    up: migration_20260123_213410.up,
    down: migration_20260123_213410.down,
    name: '20260123_213410',
  },
  {
    up: migration_20260124_164247.up,
    down: migration_20260124_164247.down,
    name: '20260124_164247',
  },
  {
    up: migration_20260128_205255.up,
    down: migration_20260128_205255.down,
    name: '20260128_205255'
  },
];
