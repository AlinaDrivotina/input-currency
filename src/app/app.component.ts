import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    onKeyUpMethod(e: any) {
        e = this.addSeparaters(this.validDigits(e, 3));
        (document.getElementById('enterSum') as HTMLInputElement).value = e;
    }

    addSeparaters(n: string){
        const rx: any =  /(\d+)(\d{3})/;
        return String(n).replace(/^\d+/, (w) => {
            while (rx.test(w)){
                w = w.replace(rx, '$1 $2');
            }
            return w;
        });
    }

    validDigits(n: string, dec: number) {
        n = n.replace(/[^\d\,]+/g, '');
        let ax1 = n.indexOf(',');
        let ax2 = -1;
        if (ax1 !== -1){
            ++ax1;
            ax2 = n.indexOf(',', ax1);
            if (ax2 > ax1) {
                n = n.substring(0, ax2);
            }
            const l = n.substring(ax1).length;
            if (l > 3) {
                let lastDigit = n.substring(ax1)[l - 1];
                let remainder = (Number(n.substring(ax1)));
                if (Number(lastDigit) < 5) {
                    while (lastDigit !== '0') {
                        remainder--;
                        n = n.substring(0, n.length - l);
                        const stringRemainder = String(remainder);
                        n += stringRemainder;
                        lastDigit = String(+lastDigit - 1);
                    }
                } else {
                    while (lastDigit !== '10') {
                        remainder++;
                        n = n.substring(0, n.length - l);
                        const stringRemainder = String(remainder);
                        n += stringRemainder;
                        lastDigit = String(+lastDigit + 1);
                    }
                }
                n = n.substring(0, ax1 + dec);
            } else if (l === 3 && n.substring(ax1)[l - 1] === '0'){
                n = n.substring(0, n.substring(0).length - 1);
            } else if (l <= 3) {
                n = n.substring(0, ax1 + dec);
            }
        }
        return n;
    }
}
