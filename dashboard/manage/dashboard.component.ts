import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IdashBoard, single, multi } from '../dashboardmodel.ts/dashboardmodel';
import { AppConfig, IUserUpdateDto, ITokenInfo } from '../../../_helpers/app.config';
import { Router } from '@angular/router';
import { DashBoardService } from '../_service/dashboardservice';
import { ActionType, AlertMessageService } from '../../../_services/AlertMessageService';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns = ['PriorityName', 'Incoming', 'Pending', 'Outgoing', 'Delivered'];
  dataSource: MatTableDataSource<IdashBoard>;
  dashBoard: IdashBoard[] = [];
  loginInfo: IUserUpdateDto;
  _roleCode: string = '';

  // single: any[];
  // multi: any[];


  // // options
  // showLegend = true;

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  // // pie
  // showLabels = true;
  // explodeSlices = false;
  // doughnut = false;
  constructor(private appConfig: AppConfig, private router: Router,private translate:TranslateService, private dashBoardService: DashBoardService, private alertMessage: AlertMessageService) {
 // Object.assign(this, {single, multi})
 
    let tokenInfo = this.appConfig.getTokenInfo() as ITokenInfo;
    if (tokenInfo) {
      this.loginInfo = (tokenInfo.tokenInfo as any).sub ? JSON.parse((tokenInfo.tokenInfo as any).sub) as IUserUpdateDto : undefined;
      console.log("loginInfo=>", this.loginInfo);
      this._roleCode = this.loginInfo.roles[0].roleCode;
//this.getDashboardUser();
    }
    else {
      this.router.navigate(['401']);
    }
    
  }

  
  getDashboardUser() {
    this.dashBoardService.getDashboardUser(this._roleCode).subscribe((result: IdashBoard[]) => {
      console.log("result=>", result);
      if (result.length > 0) {
        this.dashBoard = result;
        let delivered: number = 0;
        let incoming: number = 0;
        let outgoing: number = 0;
        let pending: number = 0;
        this.dashBoard.forEach(x => {
          delivered += x.Delivered;
          incoming += x.Incoming;
          outgoing += x.Outgoing;
          pending += x.Pending;
        });
        let dashBoardData = { Delivered: delivered, Incoming: incoming, Outgoing: outgoing, Pending: pending, PriorityName: 'Total', PriorityId: -1 } as IdashBoard
        this.dashBoard.push(dashBoardData)
        this.dataSource = new MatTableDataSource(this.dashBoard);

      } else {
        this.dashBoard = [];
        this.dataSource = new MatTableDataSource(this.dashBoard);
      }
    },
      error => {
        let message = error.error.messages as string
        let errorMessage = error.status == 404 ? this.translate.instant('ActionNames.errorResponse') : message ? message : error.message;
        console.error("E-getDashboardUser==>", JSON.stringify(error));
        this.showAlert(errorMessage, ActionType.ERROR, error.status);
        this.dashBoard = [];
        this.dataSource = new MatTableDataSource(this.dashBoard);
      });
  }
  showAlert(error: any, action: ActionType, status: number = 0) {
    if (status == 401)
      this.router.navigate(['401']);
    else setTimeout(() => this.alertMessage.showAlert(error, action));
  }
  ngOnInit() {
    // google.charts.load('current', {packages: ['corechart']});
    // google.charts.setOnLoadCallback(this.DrawPieChart);
}

title = 'Total day-wise activity';
   type = 'BarChart';
   data = [
      ["Saturday", 900, 390],
      ["Friday", 1000, 400],
      ["Thursday", 1170, 440],
      ["Wednesday", 1250, 480],
      ["Tuesday", 1530, 540],
      ["Monday", 1234, 543],
      ["Sunday", 1334, 776]
   ];
   columnNames = ['Week', 'Email','Sms'];
   options = {   
    legend: { position: 'bottom', alignment: 'center' },
      hAxis: {
         title: 'Year'
      },
      vAxis:{
         minValue:0
      }  
   };
   
   width = 550;
  height = 400;



 title1 = 'Module wise usage';
type1 = 'PieChart';
data1 = [
   ['Quick SMS', 50],
   ['SMS Campaign', 80],
   ['API Alerts', 40],
   ['DB Alerts', 60],
   ['File Alerts', 20],
   ['MO', 30]
];
columnNames1 = ['Module', 'Percentage'];
options1 = {
  legend: { position: 'left', alignment: 'center' },

  colors: ['#e0440e', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'], 
  
};
width1 = 550;
height1 = 400;



title2 = 'Countrywise Usage';
type2 = 'PieChart';
data2 = [
   ['UAE', 50],
   ['USA', 80],
   ['Dubai', 40],
   ['Kuwait', 60],
   ['India', 20],
   ['China', 30]
];
columnNames2 = ['country', 'Percentage'];
options2 = {
  legend: {alignment: 'center' },
  colors: ['#e0440e', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'], 
  
};
width2 = 550;
height2 = 400;


title3 = 'SMS campaigns';
   type3 = 'ColumnChart';
   data3 = [
      ["Campaign 1", 1000, 390, 540, 230],
      ["Campaign 2", 1000, 800, 432, 543],
      ["Campaign 3", 1770, 440, 42, 10],
      ["Campaign 4", 1850, 480, 100, 10],
   ];
   columnNames3 = ['campaigns', 'Total sent','Delivered', 'Submitted', 'Undelivered'];
   options3 = { 
     colors : ['#4285F4', '#5AA454', '#A10A28', '#C7B42C', '#757575' ] , 
      hAxis: {
        title: 'Year'
        
      },
      vAxis:{
        minValue:0
            }  
   };
   width3 = 550;
  height3 = 400;

  title4 = 'MO received';
   type4 = 'PieChart';
   data4 = [
      ['No Keyword', 7500],
      ['Stop', 200],
      ['Block', 3500],
      ['Call', 100],
      ['Card', 4000],
      ['Rewards', 2000] 
   ];
   columnNames4 = ['MO', 'Percentage'];
   options4 = { 
    colors: ['#aa66cc', '#ff4444', '#4B515D', '#00C851', '#0099CC', '#ffcdd2'], 
    legend: {alignment: 'center' },
      pieHole:0.6
   };
   width4 = 550;
   height4 = 400;


   title5 = 'Interfacecode-wise Stats';
   type5= 'ColumnChart';
   data5 = [
      ["HST-123", 1000, 390, 540, 230],
      ["HST-Fraud", 1000, 800, 432, 543],
      ["HST-Critical", 1770, 440, 42, 10],
      ["HST-HR", 1850, 480, 100, 10],
      ['HST_Sal', 3000, 374, 344, 676 ],
      ['HST-Notif',1500, 333, 555, 111 ],
      ['HST-Camp', 1600, 233, 898, 545]
   ];
   columnNames5 = ['Interfacecode', 'Total sent','Delivered', 'Submitted', 'Undelivered'];
   options5 = { 
    legend: { position: 'bottom', alignment: 'center' },
     colors : ['#4285F4', '#5AA454', '#A10A28', '#C7B42C', '#757575', '#aa66cc', '#ffcdd2'] , 
      hAxis: {
        title: 'Stats'
        
      },
      vAxis:{
        minValue:0
            }  
   };
   width5 = 850;
  height5 = 400;


  title6 = 'Priority-Wise stats';
   type6= 'ColumnChart';
   data6 = [
      ["P1", 1000, 390, 540, 60],
      ["P2", 1000, 800, 432, 543],
      ["P3", 1770, 440, 42, 10],
      ["P4", 1850, 480, 100, 10],
      ['P5', 3000, 374, 344, 676 ],
      ['P6',1500, 333, 555, 111 ],
      ['P7', 1600, 233, 898, 545]
   ];
   columnNames6 = ['Interfacecode', 'Total sent','Delivered', 'Submitted', 'Undelivered'];
   options6 = { 
    legend: { position: 'bottom', alignment: 'center' },
     colors : ['#4285F4', '#5AA454', '#A10A28', '#C7B42C', '#757575', '#aa66cc', '#ffcdd2'] , 
      hAxis: {
        title: 'Stats'
        
      },
      vAxis:{
        minValue:0
            }  
   };
   width6 = 550;
  height6 = 400;



   





  // title1 = 'Total activity';
  // type1 = 'PieChart';
  // data1 = [
  //    ['SMS'],
  //    ['Email'],
  //    ['PushNot'],
  //    ['IVR'], 
  // ];
  // columnNames1 = ['SMS', 'Email', 'PushNot', 'IVR'];
  // options1 = {   
  //   colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], 
  // };
  // width1 = 550;
  // height1 = 400;


}
