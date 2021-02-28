import { Subscription } from 'rxjs';

export class SubCollection {

  private subs = new Subscription();

  set add(subscription: Subscription) {
    this.subs.add(subscription);
  }

  unsubscribe(): void {
    this.subs.unsubscribe();
  }

}
