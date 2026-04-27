import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import { Family } from './models/Family';
import { Child } from './models/Child';
import { Rhythm } from './models/Rhythm';
import { RhythmBlock } from './models/RhythmBlock';
import { Activity } from './models/Activity';
import { Log } from './models/Log';
import { MediaItem } from './models/MediaItem';
import { Reflection } from './models/Reflection';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'trailhead',
  jsi: true,
  onSetUpError: (error) => {
    console.error('WatermelonDB setup error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Family, Child, Rhythm, RhythmBlock, Activity, Log, MediaItem, Reflection],
});

export { Family, Child, Rhythm, RhythmBlock, Activity, Log, MediaItem, Reflection };
