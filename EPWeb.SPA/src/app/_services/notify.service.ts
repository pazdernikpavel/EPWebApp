import { AdaptService } from './adapt.service';
import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable()
export class NotifyService {

    adaptOptions: any;

    constructor(private adaptService: AdaptService) {
        this.adaptService.adapt$.subscribe(item => {
            this.adaptOptions = this.adaptService.getOptionsForAdaptation(item);
        });
    }

    success(content: string) {
        notify({
            message: content,
            closeOnClick: true,
            position: this.adaptOptions.notifyPosition
        }, "success", 3500);
    }

    error(content: string) {
        notify({
            message: content,
            closeOnClick: true,
            position: this.adaptOptions.notifyPosition
        }, "error", 3500);
    }

    info(content: string) {
        notify({
            message: content,
            closeOnClick: true,
            position: this.adaptOptions.notifyPosition
        }, "info", 3500);
    }

    warning(content: string) {
        notify({
            message: content,
            closeOnClick: true,
            position: this.adaptOptions.notifyPosition
        }, "warning", 3500);
    }

}