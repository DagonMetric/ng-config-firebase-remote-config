import { SchedulerAction, SchedulerLike, Subscription, queueScheduler } from 'rxjs';

export class ZoneScheduler implements SchedulerLike {
    constructor(private zone: any, private delegate: any = queueScheduler) {}

    now() {
        return this.delegate.now();
    }

    schedule(work: (this: SchedulerAction<any>, state?: any) => void, delay?: number, state?: any): Subscription {
        const targetZone = this.zone;

        const workInZone = function (this: SchedulerAction<any>, stateLocal: any) {
            targetZone.runGuarded(() => {
                work.apply(this, [stateLocal]);
            });
        };

        return this.delegate.schedule(workInZone, delay, state);
    }
}
