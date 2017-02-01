import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboard'
})
export class DashboardPipe implements PipeTransform {

 transform(value: any, args?: any[]): any[] {
        // create instance vars to store keys and final output
        let keyArr: any[] = Object.keys(value),
            dataArr = [];
        // loop through the object,
        // pushing values to the return array
        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });
        // return the resulting array
        return dataArr;
    }

}
