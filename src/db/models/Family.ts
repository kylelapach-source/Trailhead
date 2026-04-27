import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export class Family extends Model {
  static table = 'families';

  @field('name') name!: string;
  @field('timezone') timezone!: string;
  @field('locale') locale!: string;
  @field('settings') settingsJson!: string;
  @readonly @date('created_at') createdAt!: Date;

  get settings() {
    return JSON.parse(this.settingsJson || '{}');
  }
}
