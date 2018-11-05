import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  @Inject(PLATFORM_ID) private platformId: Object;
  constructor( ) { }

  isMobile(): boolean {
    let check = false;
    if (isPlatformBrowser(this.platformId)) {
      (function(a) {
        // tslint:disable-next-line:max-line-length
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {check = true; }
      })(navigator.userAgent || navigator.vendor);
      return check;
    } else {
      return check;
    }
  }

  openSnackBar(snackbarref: MatSnackBar, message: any, duration?: number) {
    duration = duration ? duration : 2000;
    snackbarref.open(message, 'close', {duration: duration});
  }

  errorMessageParser(errors: any) {
    let msg = '';
    if (typeof(errors) === 'object') {
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          let err = '';
          if (errors[key] instanceof Array) {
            console.log(errors[key]);
            err = `${ key }: ${ errors[key].join() }`;
          } else {
            err = `${ key }: ${ errors[key].toString()}`;
          }
          msg = msg.length > 0 ? msg + ',' + err : err;
        }
      }
    } else {
      msg = errors;
    }
    return msg;

  }

  replaceAll(strObj: string, search: string, replacement: string) {
    return strObj.replace(new RegExp(search, 'g'), replacement);
  }

  pad(num, size) {
    let s = String(num);
    while (s.length < (size || 2)) {s = '0' + s; }
    return s;
  }

  make_bg_color(id, status = false) {
    // red = 11;
    // green = 115;
    // blue = 197;
    let carray = [11, 115, 197];
    const tarr = this.pad(id, 3).split('').map((u) => parseInt(u, 10));
    if (id % 3 === 0 && !(id % 5 === 0)) {
      carray = [((tarr[0] * 10) + 200) % 255 + 35, tarr[1] + 100, tarr[2] + 10];
      if (status) {
        carray = [((tarr[0] * 10) + 200) % 255, tarr[1] + 80, tarr[2] + 8];
      }
    } else if (id % 5 === 0 && !(id % 3 === 0)) {
      carray = [tarr[0] + 10, (tarr[1] * 10) + 100, tarr[2] + 100];
      if (status) {
        carray = [tarr[0] + 8, (tarr[1] * 10) + 80, tarr[2] + 80];
      }
    } else if (id % 5 === 0 && id % 3 === 0) {
      carray = [150 + tarr[0], 30 + tarr[1], 170 + tarr[2] ];
      if (status) {
      carray = [130 + tarr[0], 10 + tarr[1], 150 + tarr[2] ];
      }
    } else {
      if (id % 2 === 0) {
        carray = [tarr[0] + 10, tarr[1] + 100, (tarr[2] * 10) + 100];
        if (status) {
          carray = [tarr[0] + 8, tarr[1] + 80, (tarr[2] * 10) + 80];
        }
      } else {
        carray = [tarr[0] + 229, tarr[1] + 133, tarr[2]];
        if (status) {
          carray = [tarr[0] + 209, tarr[1] + 113, ((tarr[2] * 10) - 2) % 1];
        }
      }
    }
    if (status) {
      // tslint:disable-next-line:max-line-length
      return '#' + ('000' + Number(carray[0]).toString(16)).slice(-2) + ('000' + Number(carray[1]).toString(16)).slice(-2) + ('000' + Number(carray[2]).toString(16)).slice(-2);
    } else {
      return 'rgb(' + carray[0] + ', ' + carray[1] + ', ' + carray[2] + ')';
    }
  }
}
